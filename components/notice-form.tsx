"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowLeft, Check, ChevronsUpDown, } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn, uploadToCloudinary } from "@/lib/utils";
import { FileUpload } from "./FileUpload";
import Image from "next/image";
import Link from "next/link";

const noticeTypeOptions = [
  "Warning / Disciplinary",
  "Performance Improvement",
  "Appreciation / Recognition",
  "Attendance / Leave Issue",
  "Payroll / Compensation",
  "Contract / Role Update",
  "Advisory / Personal Reminder",
] as const;

type NoticeType = (typeof noticeTypeOptions)[number];

// Updated schema with department field
const schema = z.object({
  target: z.enum(["individual", "department", "all"]),
  title: z.string().min(3, "Title must be at least 3 characters"),
  employeeId: z.string().optional(),
  employeeName: z.string().optional(),
  department: z.string().optional(),
  noticeType: z.array(z.enum(noticeTypeOptions)).min(1, "Select at least one notice type"),
  publishDate: z.string().min(1, "Publish date is required"),
  body: z.string().min(10, "Notice body must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function NoticeForm() {
  const [openSuccess, setOpenSuccess] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const [employees, setEmployees] = useState<any[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      target: "individual",
      noticeType: [],
      publishDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const target = watch("target");

  // Fetch employees for Individual
  useEffect(() => {
    if (target === "individual") {
      const fetchEmployees = async () => {
        setLoadingEmployees(true);
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            "https://nebs-backend.vercel.app/v1/api/notice/employees",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setEmployees(res.data.data || []);
        } catch (error) {
          toast.error("Failed to load employees");
        } finally {
          setLoadingEmployees(false);
        }
      };
      fetchEmployees();
    } else {
      setEmployees([]);
      setValue("employeeId", undefined);
      setValue("employeeName", undefined);
    }
  }, [target, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      let attachmentUrl = "";
      if (attachment) {
        attachmentUrl = await uploadToCloudinary(attachment);
        
      }

      const payload: any = {
        title: data.title,
        body: data.body,
        noticeType: data.noticeType,
        target: data.target === "all" ? "all" : data.target,
        publishDate: data.publishDate,
        attachment: attachmentUrl || undefined,
        status: "published",
      };

      // Add conditional fields
      if (data.target === "individual") {
        payload.employee = data.employeeId;
      }
      if (data.target === "department") {
        payload.department = data.department; // ← Now sent correctly
      }

      await axios.post(
        "https://nebs-backend.vercel.app/v1/api/notice",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Notice published successfully!");
      setOpenSuccess(true);
      reset();
      setAttachment(null);
    } catch (error: any) {
      toast.error(error.response?.data?.error?.[0]?.message || "Failed to publish notice");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card className="border-0 shadow-none">
        <div className="space-y-8 p-6">
          <div className="border-b pb-4">
            <div className="">
              {/* back dashboard */}
              <Button variant="ghost" size="sm" className="px-0 mb-2" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                <h2 className="text-lg font-semibold">Create a Notice</h2>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Please fill in the details below
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Target & Title */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-3 border  p-8 rounded-lg bg-gray-50">
                <Label><span className="text-rose-500">*</span>Target Department(s) or Individual</Label>
                <Select defaultValue="individual" onValueChange={(v) => setValue("target", v as any)}>
                  <SelectTrigger className="mt-2 text-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="department">Department</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-3">
                <Label><span className="text-rose-500">*</span>Notice Title </Label>
                <Input {...register("title")} placeholder="Write the Title of Notice" className="mt-2" />
                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
              </div>
            </div>

            {/* Individual */}
            {target === "individual" && (
              <div className="grid gap-6 md:grid-cols-2 border p-6 rounded-lg bg-gray-50">
                <div>
                  <Label><span className="text-rose-500">*</span>Employee </Label>
                  <Select
                    disabled={loadingEmployees}
                    onValueChange={(value) => {
                      setValue("employeeId", value);
                      const selected = employees.find((e) => e._id === value);
                      if (selected) {
                        setValue("employeeName", `${selected.firstName || ""} ${selected.lastName || ""}`.trim());
                      }
                    }}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={loadingEmployees ? "Loading..." : "Select employee"} />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((emp) => {
                        const name = `${emp.firstName || ""} ${emp.lastName || ""}`.trim();
                        return (
                          <SelectItem key={emp._id} value={emp._id}>
                            <div className="flex items-center gap-3">
                              {/* {emp.profilePicture ? (
                                <img src={emp.profilePicture} alt="" className="w-8 h-8 rounded-full" />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-rose-500 flex-center text-white">
                                  {name[0]?.toUpperCase()}
                                </div>
                              )} */}
                              <div>
                                <div className="font-medium">{name}</div>
                                {emp.employeeId && (
                                  <div className="text-xs text-muted">{emp.employeeId}</div>
                                )}
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Employee Name</Label>
                  <Input value={watch("employeeName") || ""} disabled className="mt-2 bg-muted" />
                </div>
              </div>
            )}

            {/* Department */}
            {target === "department" && (
              <div className="md:col-span-2 border p-6 rounded-lg bg-gray-50">
                <Label> <span className="text-rose-500">*</span> Department </Label>
                <Select onValueChange={(v) => setValue("department", v)}>
                  <SelectTrigger className="mt-2 text-black">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
                {errors.department && <p className="mt-1 text-xs text-red-500">{errors.department.message}</p>}
              </div>
            )}

            {/* Notice Type & Date */}
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <Label> <span className="text-rose-500">*</span> Notice Type </Label>
                <Controller
                  name="noticeType"
                  control={control}
                  render={({ field }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between mt-2">
                          {field.value.length > 0 ? (
                            field.value.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)
                          ) : (
                            <span className="text-black">Select type</span>
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search..." />
                          <CommandList>
                            <CommandEmpty>No results</CommandEmpty>
                            <CommandGroup>
                              {noticeTypeOptions.map((type) => (
                                <CommandItem
                                  key={type}
                                  onSelect={() => {
                                    field.onChange(
                                      field.value.includes(type)
                                        ? field.value.filter((v) => v !== type)
                                        : [...field.value, type]
                                    );
                                  }}
                                >
                                  <Check className={cn("mr-2 h-4 w-4", field.value.includes(type) ? "opacity-100" : "opacity-0")} />
                                  {type}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.noticeType && <p className="mt-1 text-xs text-red-500">{errors.noticeType.message}</p>}
              </div>

              <div className="md:col-span-2">
                <Label> <span className="text-rose-500">*</span>Publish Date </Label>
                <Input {...register("publishDate")} type="date" className="mt-2" />
                {errors.publishDate && <p className="mt-1 text-xs text-red-500">{errors.publishDate.message}</p>}
              </div>
            </div>

            {/* Body */}
            <div>
              <Label>Notice Body <span className="text-rose-500">*</span></Label>
              <Textarea {...register("body")} placeholder="Write details..." className="min-h-32 mt-2" />
              {errors.body && <p className="mt-1 text-xs text-red-500">{errors.body.message}</p>}
            </div>

            <FileUpload value={attachment} onChange={setAttachment} />

            <div className="flex justify-end gap-3 border-t pt-6">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Cancel
              </Button>
              <Button type="button" variant="secondary">
                Save as Draft
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
                {isSubmitting ? "Publishing..." : "Publish Notice"}
              </Button>
            </div>
          </form>
        </div>
      </Card>

 <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
  <DialogContent className="max-w-sm">
    <div className="text-center py-8 px-4">

      {/* Success Icon */}
      <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
        <Image src="/sucessfull.png" width={40} height={40} alt="Success" className="w-10 h-10" />
      </div>

      {/* Title */}
      <DialogTitle className="mt-6 text-2xl font-semibold">
        Published!
      </DialogTitle>

      {/* Subtitle */}
      <p className="mt-2 text-muted-foreground">
        Your notice is now live.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <Button variant="outline" className="" >
          <Link href="/dashboard">
          View Notices
          </Link>
        </Button>

        <Button className="bg-orange-500" variant={"default"}   onClick={() => {
          setOpenSuccess(false);
          reset();
          
        }}>
          Create Another
        </Button>

        <Button variant="ghost" className="" onClick={() => setOpenSuccess(false)}>
          Close
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

    </>
  );
}