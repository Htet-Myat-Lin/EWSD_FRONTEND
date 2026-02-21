"use client";

import { Card, CardBody } from "@heroui/react";
import { useCallback, useState } from "react";
import { HiUpload } from "react-icons/hi";
import { LuFileText, LuImage, LuX } from "react-icons/lu";

export function UploadForm({ contributionType, files, onFilesChange }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const accept =
    contributionType === "article"
      ? ".doc,.docx,.pdf"
      : ".jpg,.jpeg,.png,.tiff,.raw";

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      onFilesChange(droppedFiles.length > 0 ? [droppedFiles[0]] : []);
    },
    [onFilesChange],
  );

  const handleFileInput = useCallback(
    (e) => {
      if (e.target.files) {
        const selected = Array.from(e.target.files);
        onFilesChange(selected.length > 0 ? [selected[0]] : []);
      }
    },
    [onFilesChange],
  );

  const removeFile = useCallback(
    (index) => {
      onFilesChange(files.filter((_, i) => i !== index));
    },
    [files, onFilesChange],
  );

  return (
    <Card shadow="none" className="border border-[#e2e8f0]" radius="lg">
      <CardBody className="p-4 sm:p-6">
        <h2 className="mb-4 sm:mb-5 text-lg sm:text-xl font-bold text-[#1a1a2e]">
          Upload {contributionType === "article" ? "Document" : "Images"}
        </h2>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 sm:p-10 transition-colors ${
            isDragOver
              ? "border-[#3b82f6] bg-[#f0f5ff]"
              : "border-[#cbd5e1] bg-[#f8f9fb]"
          }`}
        >
          <HiUpload className="mb-3 h-8 w-8 sm:h-10 sm:w-10 text-[#94a3b8]" />
          <p className="mb-1 text-xs sm:text-sm font-medium text-[#1a1a2e] text-center">
            Drag and drop your files here
          </p>
          <p className="mb-4 text-xs text-[#94a3b8] text-center">
            or click to browse files
          </p>
          <label className="cursor-pointer rounded-lg bg-[#1e3a5f] px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-[#ffffff] transition-colors hover:bg-[#162d4d]">
            Browse Files
            <input
              type="file"
              accept={accept}
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
          <p className="mt-3 text-xs text-[#94a3b8] text-center">
            {contributionType === "article"
              ? "Accepted formats: .doc, .docx (Max 5MB)"
              : "Accepted formats: .jpg, , .jpeg, .png (Max 5MB each)"}
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-4 sm:mt-5 flex flex-col gap-2 sm:gap-3">
            <h3 className="text-sm font-medium text-[#1a1a2e]">
              Uploaded Files
            </h3>
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-[#e2e8f0] bg-[#ffffff] p-2.5 sm:p-3"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  {contributionType === "article" ? (
                    <LuFileText className="h-4 w-4 sm:h-5 sm:w-5 text-[#3b82f6] flex-shrink-0" />
                  ) : (
                    <LuImage className="h-4 w-4 sm:h-5 sm:w-5 text-[#3b82f6] flex-shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-[#1a1a2e] truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-[#94a3b8]">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-2 rounded-full p-1 text-[#94a3b8] transition-colors hover:bg-[#f0f3f8] hover:text-[#ef4444] flex-shrink-0"
                  aria-label={`Remove ${file.name}`}
                >
                  <LuX className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
