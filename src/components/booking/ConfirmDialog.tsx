"use client";

import Dialog from "./Dialog";

/** SHA confirm dialog, e.g. "Start your booking over?". */
export default function ConfirmDialog({
  open,
  title,
  text,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  text: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onClose={onCancel} role="alertdialog" labelledBy="bk-confirm-title" describedBy="bk-confirm-text">
      <div className="bk-dialog__body">
        <h3 id="bk-confirm-title">{title}</h3>
        <p id="bk-confirm-text">{text}</p>
        <div className="bk-confirm__actions">
          {/* the safe choice gets focus */}
          <button type="button" className="bk-btn bk-btn--outline" data-autofocus onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="bk-btn bk-btn--primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
