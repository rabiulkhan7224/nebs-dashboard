"use client";

import * as React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Check, Upload, X } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
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
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils"; // make sure you have this utility
import { FileUpload } from "./FileUpload";
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

const schema = z.object({
  target: z.enum(["Individual", "Department", "All"]),
  title: z.string().min(3, "Title must be at least 3 characters"),
  employeeId: z.string().optional(),
  employeeName: z.string().optional(),
  position: z.string().optional(),
  noticeType: z
    .array(z.enum(noticeTypeOptions))
    .min(1, "Select at least one notice type"),
  publishDate: z.string().min(1, "Publish date is required"),
  body: z.string().min(10, "Notice body must be at least 10 characters"),
  attachments: z.any().optional(),
});

type FormData = z.infer<typeof schema>;

export default function NoticeForm() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      target: "Individual",
      noticeType: [],
      publishDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const target = watch("target");

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setOpenSuccess(true);
    // toast({
    //   title: "Notice Published",
    //   description: `"${data.title}" has been successfully published.`,
    // });
    reset();
    setUploadedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setValue("attachments", file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setValue("attachments", undefined);
  };

  return (
    <>
      <Card className="border-0 shadow-none">
        <div className="space-y-8 p-6">
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold">Create a Notice</h2>
            <p className="text-sm text-muted-foreground">
              Please fill in the details below
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Target & Title */}
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <Label htmlFor="target">
                  Target Department(s) or Individual
                </Label>
                <Select
                  defaultValue="Individual"
                  onValueChange={(v) => setValue("target", v as any)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Individual">Individual</SelectItem>
                    <SelectItem value="Department">Department</SelectItem>
                    <SelectItem value="All">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="title">
                  Notice Title <span className="text-rose-500">*</span>
                </Label>
                <Input
                  {...register("title")}
                  placeholder="Write the Title of Notice"
                  className="mt-2"
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>

            {/* Employee Details - Only show if Individual */}
            {target === "Individual" && (
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <Label>
                    Employee ID <span className="text-rose-500">*</span>
                  </Label>
                  <Select onValueChange={(v) => setValue("employeeId", v)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select employee designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EMP001">EMP001 - John Doe</SelectItem>
                      <SelectItem value="EMP002">
                        EMP002 - Jane Smith
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Employee Name</Label>
                  <Input
                    {...register("employeeName")}
                    placeholder="Enter employee full name"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Position / Department</Label>
                  <Select onValueChange={(v) => setValue("position", v)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select employee department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Notice Type & Publish Date */}
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <Label>
                  Notice Type <span className="text-rose-500">*</span>
                </Label>

                <Controller
                  name="noticeType"
                  control={control}
                  render={({ field }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between mt-2 h-auto py-3"
                        >
                          <span className="flex flex-wrap gap-1.5">
                            {field.value.length > 0 ? (
                              field.value.map((type) => (
                                <Badge
                                  key={type}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {type}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-muted-foreground">
                                Select Notice Type
                              </span>
                            )}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search notice type..." />
                          <CommandList>
                            <CommandEmpty>No type found.</CommandEmpty>
                            <CommandGroup>
                              {noticeTypeOptions.map((type) => (
                                <CommandItem
                                  key={type}
                                  onSelect={() => {
                                    const updated = field.value.includes(type)
                                      ? field.value.filter((v) => v !== type)
                                      : [...field.value, type];
                                    field.onChange(updated);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value.includes(type)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
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

                {errors.noticeType && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.noticeType.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="publishDate">
                  Publish Date <span className="text-rose-500">*</span>
                </Label>
                <Input
                  {...register("publishDate")}
                  type="date"
                  className="mt-2"
                />
                {errors.publishDate && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.publishDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Notice Type - Multi Select Dropdown with Checked Items */}

            {/* Notice Body */}
            <div>
              <Label htmlFor="body">
                Notice Body <span className="text-rose-500">*</span>
              </Label>
              <Textarea
                {...register("body")}
                placeholder="Write the details about notice"
                className="mt-2 min-h-32 resize-none"
              />
              {errors.body && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.body.message}
                </p>
              )}
            </div>

            {/* File Upload */}
            {/* <div>
              <Label>Upload Attachments (optional)</Label>
              <div className="mt-3">
                {!uploadedFile ? (
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-6 py-10 text-center">
                    <div className="space-y-1">
                      <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">
                        <label
                          htmlFor="file"
                          className="cursor-pointer font-medium text-rose-600 hover:text-rose-500"
                        >
                          Upload nominee profile image or drag and drop
                          <input
                            id="file"
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="text-xs">
                          Accepted File Type: jpg, png, pdf
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-lg border bg-muted/40 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded bg-background p-2">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {uploadedFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={removeFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div> */}

            <FileUpload value={attachment} onChange={setAttachment} />
            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t pt-6">
              <Button
                className="rounded-full"
                type="button"
                variant="outline"
                onClick={() => reset()}
              >
                Cancel
              </Button>
              <Button
                className="rounded-full"
                type="button"
                variant="secondary"
              >
                Save as Draft
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#F95524] hover:bg-rose-700 rounded-full"
              >
                {isSubmitting ? "Publishing..." : "Publish Notice"}
              </Button>
            </div>
          </form>
        </div>
      </Card>

      {/* Success Dialog */}
      <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <Check className="h-10 w-10 text-emerald-600" />
            </div>
            <DialogHeader className="mt-6">
              <DialogTitle className="text-2xl">
                Notice Published Successfully
              </DialogTitle>
            </DialogHeader>
            <p className="mt-2 text-muted-foreground">
              Your notice has been published and is now visible to all selected
              departments.
            </p>

            <div className="mt-8 flex w-full gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setOpenSuccess(false)}
              >
                View Notice
              </Button>
              <Button
                variant="default"
                className="flex-1"
                onClick={() => setOpenSuccess(false)}
              >
                Create Another
              </Button>
              <Button variant="ghost" onClick={() => setOpenSuccess(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
