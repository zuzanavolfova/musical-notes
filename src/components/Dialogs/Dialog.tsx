import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { createPortal } from "react-dom";

import { handleClickOutside } from "../../scripts/handleClickOutside";

import type { DialogProps } from "../../types/interfaces";
import { useEscapeKey } from "../../hooks/useEscape";

const StyledDialog = styled.div<{ $size?: "S" | "M" | "L" }>`
  position: fixed;
  z-index: 100;
  background-color: white;
  top: 26%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid var(--bkg-medium);
  box-shadow: 1px 2px 6px rgba(124, 124, 124, 0.5);
  animation: fadeIn 0.2s;

  @media (prefers-color-scheme: dark) {
    background-color: var(--bkg-medium);
    color: var(--text-dark-grey);
    border: 1px solid var(--bkg-dark);
    box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.5);
  }
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
    min-height: 180px;
  `};
  ${({ $size }) =>
    $size === "M" &&
    `
    width: 400px;
    min-height: 180px;
  `};
  ${({ $size }) =>
    $size === "L" &&
    `
    width: 600px;
    min-height: 180px;
  `};
  .dialog {
    &__header {
      margin: 0;
      padding: 8px;
      text-align: center;
      color: var(--text-dark-grey);
      background-color: var(--bkg-gold);
      border-bottom: 1px solid var(--bkg-medium);
      position: relative;
    }
    &__content {
      padding: 8px 12px;
    }
  }
`;

function isLoading(): boolean {
  return !!document.querySelector("[data-loading='true']");
}

export default function Dialog({
  size = "M",
  dialogTitle,
  handleClose,
  children,
  showHeader = true,
  disableOutsideClick = false,
  disableEsc = false,
}: DialogProps & {
  disableOutsideClick?: boolean;
  disableEsc?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEscapeKey(handleClose, disableEsc);

  useEffect(() => {
    if (disableOutsideClick || !handleClose) return;

    function handleOutsideClickEvent(event: MouseEvent) {
      if (isLoading()) return;

      handleClickOutside(event, ref, handleClose);
    }

    document.addEventListener("mousedown", handleOutsideClickEvent);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClickEvent);
    };
  }, [handleClose, disableOutsideClick]);

  function onCloseClick() {
    if (isLoading()) return;
    if (handleClose) handleClose();
  }

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
          {dialogTitle}
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onCloseClick}
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
