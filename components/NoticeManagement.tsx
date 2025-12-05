"use client"

import { Plus, FilePen, Trash2, Eye, MoreVertical, Filter, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const notices = [
  {
    id: 1,
    title: "Office closed on Friday for maintenance.",
    type: "General / Company-wide",
    target: "All Department",
    date: "15-Jun-2025",
    status: "published",
  },
  {
    id: 2,
    title: "Eid al-Fitr holiday schedule.",
    type: "Holiday & Event",
    target: "Finance",
    date: "15-Jun-2025",
    status: "published",
  },
  {
    id: 3,
    title: "Updated code of conduct policy",
    type: "HR & Policy Update",
    target: "Sales Team",
    date: "15-Jun-2025",
    status: "published",
  },
  {
    id: 4,
    title: "Payroll for October will be processed on 28th",
    type: "Finance & Payroll",
    target: "Web Team",
    date: "15-Jun-2025",
    status: "published",
  },
  {
    id: 5,
    title: "Unauthorized absence recorded on 18 Oct 2025",
    type: "Warning / Disciplinary",
    target: "Individual",
    date: "15-Jun-2025",
    status: "unpublished",
  },
  {
    id: 6,
    title: "Office closed today due to severe weather",
    type: "Emergency / Urgent",
    target: "HR",
    date: "15-Jun-2025",
    status: "draft",
  },
]

export default function NoticeManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between ">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notice Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Active Notices: <span className="font-medium text-foreground">8</span> | Draft Notice:{" "}
            <span className="font-medium text-foreground">04</span>
          </p>
        </div>

        <div className="flex gap-3">
          <Button className="bg-orange-600 hover:bg-rose-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Notice
          </Button>
          <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
            All Draft Notice
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Label className="text-sm font-medium whitespace-nowrap">Filter by:</Label>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Departments or Individuals" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
            </SelectContent>
          </Select>

          <Input placeholder="Employee Id or Name" className="w-64" />

          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="unpublished">Unpublished</SelectItem>
            </SelectContent>
          </Select>

          <ToggleGroup type="single" defaultValue="date">
            <ToggleGroupItem value="date" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Published on
            </ToggleGroupItem>
          </ToggleGroup>

          <Button variant="outline" className="border-blue-500 text-blue-500" size="sm">
            Reset Filters
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Notice Type</TableHead>
              <TableHead>Departments/Individual</TableHead>
              <TableHead>Published On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notices.map((notice) => (
              <TableRow key={notice.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium max-w-md">
                  <p className="truncate">{notice.title}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {notice.type.includes("Warning") && "bg-red-100 text-red-700"}
                    {notice.type.includes("Emergency") && "bg-orange-100 text-orange-700"}
                    {notice.type.includes("Holiday") && "bg-blue-100 text-blue-700"} 
                    {notice.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "text-sm",
                    notice.target === "Individual" && "text-rose-600 font-medium"
                  )}>
                    {notice.target}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{notice.date}</TableCell>
                <TableCell>
                  {notice.status === "published" && (
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                      Published
                    </Badge>
                  )}
                  {notice.status === "unpublished" && (
                    <Badge variant="secondary">Unpublished</Badge>
                  )}
                  {notice.status === "draft" && (
                    <Badge variant="outline" className="border-orange-300 text-orange-600">
                      Draft
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>View</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <FilePen className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit</TooltipContent>
                    </Tooltip>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
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

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 1 to 10 of 42 results
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "outline"}
              size="sm"
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}