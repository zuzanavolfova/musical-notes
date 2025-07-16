import { styled } from "styled-components";
import type { SelectButtonProps } from "../../types";
import { useTranslation } from "react-i18next";

const Button = styled.button<{ $resetFocus?: boolean; $isCorrect?: boolean }>`
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font-decoration);
  font-size: 20px;
  box-shadow: 1px 2px 6px rgba(124, 124, 124, 0.5);
  background-color: white;
  width: 50px;
  border: 2px solid transparent;
  color: black;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: var(--secondary-color);
    color: white;
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
  &:hover {
    background-color: var(--secondary-color);
    color: white;
  }
  ${({ $isCorrect }) =>
    $isCorrect &&
    `
      background-color: var(--secondary-color) !important;
      color: white !important;
      border: 2px solid var(--secondary-color) !important;
      font-weight: bold;
    `}
  ${({ $resetFocus }) =>
    !$resetFocus &&
    `
      &:focus {
        background-color: transparent;
        box-shadow: none;
        border: 2px solid var(--secondary-color);
        font-weight: bold;
        color: var(--secondary-color);
      }
      &:active {
        font-weight: bold;
        color: var(--secondary-color);
      }
    `}
`;

export default function SelectButton({
  answerText,
  checkAnswer,
  type = "button",
  resetFocus = false,
  disabled = false,
  isCorrect = false,
  ...props
}: SelectButtonProps) {
  const { t } = useTranslation();
  return (
    <Button
      onClick={() => checkAnswer(answerText)}
      type={type}
      aria-label={`click to answer - ${answerText}`}
      aria-pressed={isCorrect}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      $resetFocus={resetFocus}
      disabled={disabled}
      $isCorrect={isCorrect}
      {...props}
    >
      {t(answerText)}
    </Button>
  );
}
