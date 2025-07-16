import { styled } from "styled-components";
import type { PianoProps } from "../types";

const PianoStyled = styled.div`
  position: relative;
  margin: 0 auto;
  width: calc(8 * var(--piano-key-width));
  height: 180px;
`;

const WhiteKey = styled.button<{ $isCorrect?: boolean }>`
  width: 44px;
  height: 180px;
  background-color: white;
  border: 1px solid rgba(124, 124, 124, 0.5);
  border-radius: 0 0 6px 6px;
  box-shadow: 1px 2px 6px rgba(124, 124, 124, 0.5);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: rgb(212, 212, 212);
  }
  &:focus {
    box-shadow: inset 1px 2px 6px rgba(124, 124, 124, 0.5);
  }
  &:disabled {
    cursor: default;
    &:hover {
      background-color: white;
    }
  }
  ${({ $isCorrect }) =>
    $isCorrect &&
    `
      background-color: var(--secondary-color) !important;
      color: white;
            box-shadow: inset 0 0 8px 2px rgba(0, 0, 0, 0.22);

      font-weight: bold;
    `}
`;

const BlackKey = styled.button<{ $isCorrect?: boolean; $index: number }>`
  width: 32px;
  height: 120px;
  background-color: black;
  border-radius: 0 0 6px 6px;
  border: none;
  box-shadow: 1px 2px 6px rgba(124, 124, 124, 0.5);
  position: absolute;
  top: 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  z-index: 2;
  &:hover {
    background-color: rgb(93, 92, 92);
  }
  &:focus {
    background-color: var(--secondary-color);
  }
  &:disabled {
    cursor: default;
    &:hover {
      background-color: black;
    }
  }
  ${({ $isCorrect }) =>
    $isCorrect &&
    `
      background-color: var(--secondary-color) !important;
    `}
  ${({ $index }) => {
    const positions: { [key: number]: number } = {
      0: 26,
      1: 70,
      3: 158,
      4: 202,
      5: 246,
    };
    if ($index === 2 || $index === 6) {
      return `visibility: hidden;`;
    }
    return `left: ${positions[$index]}px;`;
  }}
`;

const whiteKeys = ["c", "d", "e", "f", "g", "a", "h", "c2"];
const blackKeys = ["c#", "d#", "", "f#", "g#", "a#", ""];

export default function Piano({
  checkAnswer,
  noteType,
  result,
  disabled = false,
}: PianoProps) {
  return (
    <PianoStyled>
      <div style={{ display: "flex" }}>
        {whiteKeys.map((note, index) => (
          <WhiteKey
            key={index}
            onClick={() => checkAnswer(note)}
            $isCorrect={result === true && note === noteType}
            disabled={disabled}
            type="button"
            aria-label={`White key ${note.toUpperCase()}`}
          />
        ))}
      </div>

      {blackKeys.map((note, index) =>
        note ? (
          <BlackKey
            key={index}
            $index={index}
            onClick={() => checkAnswer(note)}
            $isCorrect={result === true && note === noteType}
            disabled={disabled}
            type="button"
            aria-label={`Black key ${note.toUpperCase()}`}
          />
        ) : null
      )}
    </PianoStyled>
  );
}
