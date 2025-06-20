import { styled } from "styled-components";

const Button = styled.button<{ $resetFocus?: boolean }>`
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

  &:hover {
    background-color: var(--secondary-color);
    color: white;
  }
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

interface SelectButtonProps {
  answerText: string;
  checkAnswer: (answerText: string) => void;
  resetFocus?: boolean;
}

export default function SelectButton({
  answerText,
  checkAnswer,
  resetFocus = false,
}: SelectButtonProps) {
  function onAnswerClick(answerText: string) {
    checkAnswer(answerText);
  }

  return (
    <Button
      onClick={() => onAnswerClick(answerText)}
      aria-label={`click to answer - ${answerText}`}
      $resetFocus={resetFocus}
    >
      {answerText}
    </Button>
  );
}
