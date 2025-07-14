import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";
import { createPortal } from "react-dom";

import type { LoadingProps } from "../../types/interfaces";

const LoadingDialogStyled = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #57575749;
  backdrop-filter: blur(2px);
  pointer-events: auto;
  user-select: none;
  cursor: default;
  z-index: 101;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  min-width: 160px;
  max-width: 260px;
  margin: auto;
  padding: 24px;
  position: fixed;
  top: 26%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: default;

  box-shadow: 1px 2px 6px rgba(124, 124, 124, 0.5);
  cursor: default;
  .loading__text {
    margin-bottom: 20px;
    text-align: center;
  }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--primary-color-hover);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export default function LoadingDialog({ message = "loading" }: LoadingProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
      }

      if (e.key === "Escape") {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const dialogElement = document.querySelector(
      '[data-loading="true"] [role="dialog"]'
    ) as HTMLElement;
    if (dialogElement) {
      dialogElement.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (previouslyFocused) {
        previouslyFocused.focus();
      }
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return createPortal(
    <LoadingDialogStyled
      data-loading="true"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <LoadingContent
        onClick={handleContentClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="loading-message"
        aria-describedby="loading-description"
        tabIndex={-1}
      >
        <span id="loading-message" className="loading__text">
          {t(message)}
        </span>

        <Spinner role="status" aria-label={t("loading")} />

        <ScreenReaderOnly
          id="loading-description"
          aria-live="polite"
          aria-atomic="true"
        >
          {t("pleaseWaitLoadingLongText")}
        </ScreenReaderOnly>

        <ScreenReaderOnly aria-live="assertive">
          {t("loading")}
        </ScreenReaderOnly>
      </LoadingContent>
    </LoadingDialogStyled>,
    document.getElementById("loading") || document.body
  );
}
