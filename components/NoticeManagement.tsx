"use client";

import useSWR, { mutate } from "swr";
import { format } from "date-fns";
import {
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup,  ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Link from "next/link";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => res.json());

type Notice = {
  _id: string;
  title: string;
  body: string;
  noticeType: string[];
  target: string;
  department?: string;
  employeeUser?: { firstName: string; lastName: string };
  publishedAt: string;
  status: "draft" | "published" | "archived";
  attachment?: string;
  createdByUser: { firstName: string; lastName: string; role: string };
};

export default function NoticeManagement() {
  const { data, error, isLoading } = useSWR(
    "https://nebs-backend.vercel.app/v1/api/notice",
    fetcher,
    { revalidateOnFocus: false }
  );

  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const notices: Notice[] = data?.data || [];
  const pagination = data?.pagination || { current: 1, total: 0 };

  const updateStatus = async (id: string, newStatus: "draft" | "published" | "archived") => {
    try {
      await fetch(`https://nebs-backend.vercel.app/v1/api/notice/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      mutate("https://nebs-backend.vercel.app/v1/api/notice"); // refresh list
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const deleteNotice = async (id: string) => {
    if (!confirm("Delete this notice?")) return;
    try {
      await fetch(`https://nebs-backend.vercel.app/v1/api/notice/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      mutate("https://nebs-backend.vercel.app/v1/api/notice");
      toast.success("Notice deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const getTargetDisplay = (notice: Notice) => {
    if (notice.target === "all") return "All Departments";
    if (notice.target === "department") return notice.department || "Dept";
    if (notice.target === "individual" && notice.employeeUser)
      return `${notice.employeeUser.firstName} ${notice.employeeUser.lastName}`;
    return notice.target;
  };

  if (isLoading)
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <Card className="p-6"><Skeleton className="h-32" /></Card>
        <Card><Table><TableBody>{[...Array(4)].map((_, i) => <TableRow key={i}><TableCell colSpan={7}><Skeleton className="h-12" /></TableCell></TableRow>)}</TableBody></Table></Card>
      </div>
    );

  if (error) return <div className="text-center py-20 text-red-500">Failed to load notices</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Notice Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Total Notices: <span className="font-medium">{pagination.total}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-orange-600 hover:bg-orange-700" asChild>
            <Link href={'/dashboard/notice'}>
            
            <Plus className="mr-2 h-4 w-4" /> Create Notice
            </Link>
          </Button>
          <Button variant={'outline'} className=" ">
            all Draft notice
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"><Checkbox /></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Notice Type</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Published On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notices.map((notice) => (
              <TableRow key={notice._id}>
                <TableCell><Checkbox /></TableCell>
                <TableCell className="font-medium max-w-xs">
                  <p className="truncate">{notice.title}</p>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {notice.noticeType.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{getTargetDisplay(notice)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {notice.publishedAt ? format(new Date(notice.publishedAt), "dd MMM yyyy") : "-"}
                </TableCell>
                <TableCell>
                  <Select
                    value={notice.status}
                    onValueChange={(v) => updateStatus(notice._id, v as any)}
                  >
                    <SelectTrigger className="w-32 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">
                        <Badge className="bg-emerald-100 text-emerald-700">Published</Badge>
                      </SelectItem>
                      <SelectItem value="draft">
                        <Badge variant="outline" className="border-orange-400 text-orange-600">Draft</Badge>
                      </SelectItem>
                      <SelectItem value="archived">
                        <Badge variant="secondary">Archived</Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedNotice(notice)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => deleteNotice(notice._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* View Modal */}
      <Dialog open={!!selectedNotice} onOpenChange={() => setSelectedNotice(null)}>
        <DialogContent className="max-w-4xl">
          {selectedNotice && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedNotice.title}</DialogTitle>
                <DialogDescription>
                  By {selectedNotice.createdByUser.firstName} {selectedNotice.createdByUser.lastName} 
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap">{selectedNotice.body}</p>
                </div>

                {selectedNotice.attachment && (
                  <div className="mt-6">
                    <Label>Attachment</Label>
                    <div className="mt-2">
                      {selectedNotice.attachment.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                        <img
                          src={selectedNotice.attachment}
                          alt="Attachment"
                          className="max-w-full rounded-lg border"
                        />
                      ) : selectedNotice.attachment.endsWith(".pdf") ? (
                        <iframe
                          src={selectedNotice.attachment}
                          className="w-full h-96 border rounded-lg"
                          title="PDF Preview"
                        />
                      ) : (
                        <a
                          href={selectedNotice.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Open Attachment
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}