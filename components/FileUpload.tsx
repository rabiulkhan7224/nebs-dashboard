import { useState } from "react"
import { Upload, X, FileIcon, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  value?: File | null
  onChange: (file: File | null) => void
}

export function FileUpload({ value, onChange }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true)
    } else if (e.type === "dragleave") {
      setIsDragging(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (isFileAllowed(file)) {
        handleFile(file)
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (isFileAllowed(file)) {
        handleFile(file)
      }
    }
  }

  const isFileAllowed = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]
    return allowedTypes.includes(file.type)
  }

  const handleFile = (file: File) => {
    onChange(file)
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  const removeFile = () => {
    onChange(null)
    setPreviewUrl(null)
  }

  const isImage = value?.type.startsWith("image/")
  const isPdf = value?.type === "application/pdf"

  return (
    <div>
      <Label>Upload Attachments (optional)</Label>

      {!value ? (
        <div
          className={cn(
            "relative mt-3 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-green-500 px-6 py-10 text-center transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-green-500 hover:border-muted-foreground/50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mt-4 text-sm text-muted-foreground">
            <label
              htmlFor="file-upload"
              className="cursor-pointer font-medium text-green-500 hover:text-rose-500"
            >
          <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
              Upload a file or drag and drop
              <input
                id="file-upload"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                className="sr-only"
                onChange={handleFileInput}
              />
            </label>
            <p className="mt-1 text-xs">JPG, PNG, PDF up to 10MB</p>
          </div>
        </div>
      ) : (
        <div className="mt-3 space-y-4">
          {/* Image Preview */}
          {isImage && previewUrl && (
            <div className="relative rounded-lg border bg-muted/40 p-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="mx-auto max-h-64 rounded-md object-contain"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2"
                onClick={removeFile}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* File Card (PDF or Image without preview) */}
          <div className="flex items-center justify-between rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted p-3">
                {isImage ? (
                  <ImageIcon className="h-6 w-6 text-blue-600" />
                ) : isPdf ? (
                  <FileIcon className="h-6 w-6 text-red-600" />
                ) : (
                  <FileIcon className="h-6 w-6 text-gray-600" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{value.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(value.size / 1024 / 1024).toFixed(2)} MB • {value.type.split("/")[1]?.toUpperCase()}
                </p>
              </div>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={removeFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}