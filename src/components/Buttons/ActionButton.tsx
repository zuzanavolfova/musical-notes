import { styled } from "styled-components";
import { useTranslation } from "react-i18next";

import type { ActionButtonProps } from "../../types";

const StyledActionButton = styled.button`
  width: auto;
  min-width: 80px;
  padding: 10px 42px;
  padding: 10px 42px;
  margin: 10px;
  border-radius: 60px;
  background-color: var(--primary-color);
  color: white;
  font-size: 24px;
  font-size: 24px;
  border: 2px solid white;
  box-shadow: 1px 2px 6px rgba(124, 124, 124, 0.5);
  cursor: pointer;
  &:hover {
    background-color: var(--primary-color-hover);
    border: var(--primary-color-hover);
  }
  &:active {
    background-color: white;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
  }
  &:disabled {
    background-color: #eee;
    color: #aaa;
    cursor: default;
    border: 2px solid #ddd;
    box-shadow: none;
    &:hover {
      background-color: #eee;
      color: #aaa;
      cursor: default;
      border: 2px solid #ddd;
      box-shadow: none;
    }
  }
`;

export default function ActionButton({
  buttonTitle,
  onButtonClick,
  type = "button",
  disabled = false,
  ariaLabel,
  ...props
}: ActionButtonProps) {
  const { t } = useTranslation();
  return (
    <StyledActionButton
      onClick={onButtonClick}
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel || buttonTitle}
      {...props}
    >
      {t(buttonTitle)}
    </StyledActionButton>
  );
}
