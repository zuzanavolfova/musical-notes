import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { createPortal } from "react-dom";

import { handleClickOutside } from "../../scripts/handleClickOutside";

import type { DialogProps } from "../../types/interfaces";

const StyledDialog = styled.div<{ $size?: "S" | "M" | "L" }>`
  position: fixed;
  z-index: 100;
  background-color: white;
  top: 26%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid var(--bkg-medium);
  box-shadow: 1px 2px 6px rgba(124, 124, 124, 0.5);
  animation: fadeout 0.2s;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  ${({ $size }) =>
    $size === "S" &&
    `
    width: 300px;
    min-height: 180px`};
  ${({ $size }) =>
    $size === "M" &&
    `
    width: 400px;
     min-height: 180px`};
  ${({ $size }) =>
    $size === "L" &&
    `
    width: 600px;
    min-height: 180px`};
  .dialog {
    &__header {
      margin: 0;
      padding: 8px;
      text-align: center;
      color: var(--text-dark-grey);
      background-color: var(--bkg-gold);
      border-bottom: 1px solid var(--bkg-medium);
    }
    &__content {
      padding: 8px 12px;
    }
  }
`;

export default function Dialog({
  size = "M",
  dialogTitle,
  handleClose,
  children,
  showHeader = true,
}: DialogProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      handleClickOutside(event, ref, handleClose);
    }
    document.addEventListener("mousedown", onDocumentClick);
    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
    };
  }, [handleClose]);

  return createPortal(
    <StyledDialog
      ref={ref}
      $size={size}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      tabIndex={-1}
    >
      {showHeader && (
        <h4 id="dialog-title" className="dialog__header">
          {dialogTitle}{" "}
          <button
            type="button"
            aria-label="Close dialog"
            onClick={handleClose}
            style={{
              position: "absolute",
              right: 4,
              top: 4,
              background: "none",
              border: "none",
              fontSize: 28,
              fontWeight: "normal",
              cursor: "pointer",
              color: "inherit",
            }}
          >
            ×
          </button>
        </h4>
      )}
      <div className="dialog__content">{children}</div>
    </StyledDialog>,
    document.getElementById("dialog") || document.body
  );
}
