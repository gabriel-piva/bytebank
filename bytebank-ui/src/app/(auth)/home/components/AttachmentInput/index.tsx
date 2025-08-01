"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FileIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface AttachmentInputProps {
  value?: File;
  onChange: (file?: File) => void;
  existingAttachment?: string;
  onRemoveExisting?: () => void;
}
export default function AttachmentInput({
  value,
  onChange,
  existingAttachment,
}: AttachmentInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [showExistingAttachment, setShowExistingAttachment] =
    useState(!!existingAttachment);

  useEffect(() => {
    setShowExistingAttachment(!!existingAttachment);
  }, [existingAttachment]);
  useEffect(() => {
    if (fileInputRef.current && value === undefined) {
      fileInputRef.current.value = "";
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };
  const validateAndSetFile = (file: File | undefined) => {
    if (file) {
      if (file.size > 100 * 1024) {
        toast.warning("O arquivo deve ter no máximo 100KB");
        return;
      }
      onChange(file);
    }
  };

  const handleRemove = () => {
    onChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setShowExistingAttachment(false);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        validateAndSetFile(files[0]);
      }
    },
    [validateAndSetFile]
  );

  return (
    <div className="space-y-2">
      <Label className="text-sm text-[var(--color-text-secondary)]">
        Comprovante
      </Label>

      <div
        className={cn(
          "rounded-lg border-1 border-dashed border-[var(--outline)] bg-[var(--surface)] p-4 text-center transition-colors",
          (value || showExistingAttachment) && "border-[var(--color-secondary)]"
        )}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="transaction-attachment"
          onChange={handleFileChange}
          accept="image/*,.pdf"
          className="hidden"
          ref={fileInputRef}
          disabled={!!showExistingAttachment}
        />

        {!value && !showExistingAttachment && (
          <label
            htmlFor="transaction-attachment"
            className="flex cursor-pointer flex-col items-center gap-2"
          >
            <UploadIcon className="h-6 w-6 text-[var(--color-tertiary)]" />
            <p className="text-sm text-[var(--color-tertiary)]">
              Arraste ou clique para enviar comprovante
            </p>
          </label>
        )}

        {(value || showExistingAttachment) && (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {showExistingAttachment ? (
                existingAttachment!.startsWith("data:image") ? (
                  <ImageIcon className="h-5 w-5 text-[var(--color-secondary)]" />
                ) : (
                  <FileIcon className="h-5 w-5 text-[var(--color-secondary)]" />
                )
              ) : value?.type.startsWith("image/") ? (
                <ImageIcon className="h-5 w-5 text-[var(--color-secondary)]" />
              ) : (
                <FileIcon className="h-5 w-5 text-[var(--color-secondary)]" />
              )}
              <span className="max-w-[180px] truncate text-sm">
                {showExistingAttachment
                  ? existingAttachment!.startsWith("data:image")
                    ? "Imagem anexada"
                    : "PDF anexado"
                  : value?.name}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleRemove}
            >
              <XIcon className="h-4 w-4 text-[var(--color-error)]" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
