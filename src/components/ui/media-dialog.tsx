"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Close } from "@/components/ui/icons";

type MediaDialogProps = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  panelClassName?: string;
};

export function MediaDialog({ open, onClose, label, children, panelClassName }: MediaDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const onCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", onCancel);

    return () => dialog.removeEventListener("cancel", onCancel);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="media-dialog"
      aria-label={label}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed right-5 top-5 z-20 inline-flex size-11 items-center justify-center rounded-full border border-bone/25 bg-ink/55 text-bone backdrop-blur-md transition hover:border-bone hover:bg-bone hover:text-ink md:right-8 md:top-8"
      >
        <Close />
      </button>
      <div className={panelClassName ?? "w-full max-w-6xl px-4 md:px-8"}>{children}</div>
    </dialog>
  );
}
