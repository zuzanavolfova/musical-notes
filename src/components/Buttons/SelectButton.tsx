import { styled } from "styled-components";

const Button = styled.button`
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
`;

export default function SelectButton({ answerText }: { answerText: string }) {
  return (
    <Button aria-label={`click to answer - ${answerText}`}>{answerText}</Button>
  );
}
