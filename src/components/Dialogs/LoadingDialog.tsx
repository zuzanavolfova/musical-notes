import { useTranslation } from "react-i18next";
import { styled } from "styled-components";

import Dialog from "./Dialog";
import type { LoadingProps } from "../../types/interfaces";

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .loading__text {
    margin: 20px;
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

  return (
    <Dialog size="S" showHeader={false} disableOutsideClick disableEsc>
      <LoadingContent>
        <span className="loading__text">{t(message)}</span>
        <Spinner />
      </LoadingContent>
    </Dialog>
  );
}
