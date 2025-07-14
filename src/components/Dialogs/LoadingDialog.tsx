import { useTranslation } from "react-i18next";
import { styled } from "styled-components";
import { createPortal } from "react-dom";

// import Dialog frosm "./Dialog";
import type { LoadingProps } from "../../types/interfaces";

const LoadingDialogStyled = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #57575749;
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
  margin: 100px auto;
  padding: 24px;
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

export default function LoadingDialog({ message = "loading" }: LoadingProps) {
  const { t } = useTranslation();

  return createPortal(
    <LoadingDialogStyled data-loading="true">
      <LoadingContent>
        <span className="loading__text">{t(message)}</span>
        <Spinner />
      </LoadingContent>
    </LoadingDialogStyled>,
    document.getElementById("loading") || document.body
  );
}
