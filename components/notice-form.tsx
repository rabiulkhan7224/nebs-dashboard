"use client"

import * as React from "react"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type NoticeTypeOption =
  | "Warning / Disciplinary"
  | "Performance Improvement"
  | "Appreciation / Recognition"
  | "Attendance / Leave Issue"
  | "Payroll / Compensation"
  | "Contract / Role Update"
  | "Advisory / Personal Reminder"

const noticeTypeOptions: NoticeTypeOption[] = [
  "Warning / Disciplinary",
  "Performance Improvement",
  "Appreciation / Recognition",
  "Attendance / Leave Issue",
  "Payroll / Compensation",
  "Contract / Role Update",
  "Advisory / Personal Reminder",
]

const schema = z.object({
  target: z.enum(["Individual", "Department", "All"]).default("Individual"),
  title: z.string().min(3, "Title is required"),
  employeeId: z.string().optional(),
  employeeName: z.string().optional(),
  position: z.string().optional(),
  noticeType: z.array(z.enum(noticeTypeOptions as [NoticeTypeOption, ...NoticeTypeOption[]])).min(1, "Select at least one notice type"),
  publishDate: z.string().refine((v) => !!v, "Publish date is required"),
  body: z.string().min(5, "Write the details about notice"),
  attachments: z.any().optional(),
})

type FormValues = z.infer<typeof schema>

export function NoticeForm() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [uploadName, setUploadName] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      target: "Individual",
      noticeType: [],
      publishDate: new Date().toISOString().slice(0, 10),
    },
  })

  async function onSubmit(values: FormValues) {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 700))

    // Capture attachment name for UI
    if ((values as any).attachments && (values as any).attachments.length > 0) {
      setUploadName((values as any).attachments[0].name)
    } else {
      setUploadName(null)
    }

    setShowSuccess(true)
    reset()
  }

  return (
    <div className="space-y-6 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <label className="flex flex-col text-sm">
            <span className="mb-2 text-xs font-medium">Target Department(s) or Individual</span>
            <select {...register("target")} className="rounded-md border px-3 py-2 text-sm">
              <option>Individual</option>
              <option>Department</option>
              <option>All</option>
            </select>
          </label>

          <label className="flex flex-col text-sm md:col-span-2">
            <span className="mb-2 text-xs font-medium">Notice Title</span>
            <Input {...register("title")} placeholder="Write the Title of Notice" />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
          </label>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <label className="flex flex-col text-sm">
            <span className="mb-2 text-xs font-medium">Select Employee ID</span>
            <select {...register("employeeId")} className="rounded-md border px-3 py-2 text-sm">
              <option value="">Select employee designation</option>
              <option value="EMP001">EMP001</option>
              <option value="EMP002">EMP002</option>
            </select>
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-2 text-xs font-medium">Employee Name</span>
            <Input {...register("employeeName")} placeholder="Enter employee full name" />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-2 text-xs font-medium">Position</span>
            <select {...register("position")} className="rounded-md border px-3 py-2 text-sm">
              <option value="">Select employee department</option>
              <option>HR</option>
              <option>Engineering</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div>
            <label className="text-xs font-medium">Notice Type</label>
            <Controller
              control={control}
              name="noticeType"
              render={({ field }) => (
                <div className="mt-2 space-y-1">
                  {noticeTypeOptions.map((opt) => {
                    const checked = field.value?.includes(opt) ?? false
                    return (
                      <label key={opt} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...(field.value || []), opt])
                            } else {
                              field.onChange((field.value || []).filter((v: any) => v !== opt))
                            }
                          }}
                        />
                        <span>{opt}</span>
                      </label>
                    )
                  })}
                </div>
              )}
            />
            {errors.noticeType && <p className="mt-1 text-xs text-red-500">{(errors.noticeType as any).message}</p>}
          </div>

          <label className="flex flex-col text-sm md:col-span-2">
            <span className="mb-2 text-xs font-medium">Publish Date</span>
            <Input {...register("publishDate")} type="date" />
            {errors.publishDate && <p className="mt-1 text-xs text-red-500">{errors.publishDate.message}</p>}
          </label>
        </div>

        <div>
          <label className="flex flex-col text-sm">
            <span className="mb-2 text-xs font-medium">Notice Body</span>
            <textarea
              {...register("body")}
              className="min-h-[120px] w-full rounded-md border p-3 text-sm"
              placeholder="Write the details about notice"
            />
            {errors.body && <p className="mt-1 text-xs text-red-500">{errors.body.message}</p>}
          </label>
        </div>

        <div>
          <label className="text-sm font-medium">Upload Attachments (optional)</label>
          <Controller
            control={control}
            name="attachments"
            render={({ field }) => (
              <div className="mt-2">
                <input
                  type="file"
                  accept=".jpg,.png,.pdf"
                  onChange={(e) => {
                    field.onChange(e.target.files)
                  }}
                />
                {uploadName && <p className="mt-1 text-sm text-muted-foreground">{uploadName}</p>}
              </div>
            )}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={() => reset()} type="button">
            Cancel
          </Button>
          <Button type="button" onClick={() => { handleSubmit(onSubmit)(); }} disabled={isSubmitting}>
            Save as Draft
          </Button>
          <Button type="submit" className="bg-rose-500">
            Publish Notice
          </Button>
        </div>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[560px] rounded-lg bg-white p-8 text-center shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <svg className="h-8 w-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Notice Published Successfully</h3>
            <p className="mb-6 text-sm text-muted-foreground">Your notice has been published and is now visible to selected departments.</p>

            <div className="flex items-center justify-center gap-3">
              <Button variant="outline" onClick={() => setShowSuccess(false)}>
                View Notice
              </Button>
              <Button variant="ghost" onClick={() => { setShowSuccess(false); }}>
                Create Another
              </Button>
              <Button variant="link" onClick={() => setShowSuccess(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoticeForm
