"use client";

import { useEffect, useId, useRef } from "react";

type ConfirmationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "default" | "destructive";
  disabled?: boolean;
};

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "default",
  disabled = false,
}: ConfirmationDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    cancelRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !disabled) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [disabled, isOpen, onClose]);

  if (!isOpen) return null;

  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 px-6" onMouseDown={(event) => { if (event.target === event.currentTarget && !disabled) onClose(); }}>
    <section role="alertdialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
      <h2 id={titleId} className="text-xl font-bold text-brand-navy">{title}</h2>
      <p id={descriptionId} className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button ref={cancelRef} type="button" disabled={disabled} onClick={onClose} className="rounded-full border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 disabled:opacity-60">{cancelText}</button>
        <button type="button" disabled={disabled} onClick={onConfirm} className={`rounded-full px-5 py-2.5 font-semibold text-white disabled:opacity-60 ${confirmVariant === "destructive" ? "bg-red-600 hover:bg-red-700" : "bg-brand-navy hover:opacity-90"}`}>{confirmText}</button>
      </div>
    </section>
  </div>;
}
