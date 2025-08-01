"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileIcon, ImageIcon, UploadIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm text-[var(--color-text-secondary)]">
        Comprovante
      </Label>

      <input
        type="file"
        id="transaction-attachment"
        onChange={handleFileChange}
        accept="image/*,.pdf"
        className="hidden"
        ref={fileInputRef}
      />

      {!value && !showExistingAttachment ? (
        <Button
          type="button"
          variant="outline"
          onClick={triggerFileInput}
          className="w-full py-6"
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          Selecionar Arquivo
        </Button>
      ) : (
        <div className="flex items-center justify-between gap-2 rounded-md border border-[var(--outline)] bg-[var(--surface)] p-3">
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
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={triggerFileInput}
            >
              Alterar
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
            >
              Remover
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
