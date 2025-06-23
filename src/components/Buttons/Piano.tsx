import { useState } from "react";
import { styled } from "styled-components";

const PianoStyled = styled.div`
  position: relative;
  margin: 0 auto;
  width: calc(8 * 44px);
  height: 180px;
  .white-key {
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
    &:disabled {
      cursor: default;
    }
  }
  .black-key {
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
    &:hover {
      background-color: rgb(93, 92, 92);
    }
    &:disabled {
      cursor: default;
    }
  }
  .black-key-0 {
    left: 26px;
  }
  .black-key-1 {
    left: 70px;
  }

  .black-key-3 {
    left: 158px;
  }
  .black-key-4 {
    left: 202px;
  }
  .black-key-5 {
    left: 246px;
  }
  .black-key-2,
  .black-key-6 {
    visibility: hidden;
  }
`;
const whiteKeys: string[] = ["c", "d", "e", "f", "g", "a", "h", "c2"];
const blackKeys: string[] = ["c#", "d#", "", "f#", "g#", "a#", ""];

interface PianoProps {
  checkAnswer: (answerText: string) => void;

  disabled?: boolean;
}

export default function Piano({ checkAnswer, disabled = false }: PianoProps) {
  return (
    <PianoStyled className="piano-container">
      <div className="white-keys">
        {whiteKeys.map((note, index) => (
          <button
            key={index}
            className="white-key"
            onClick={() => checkAnswer(note)}
            disabled={disabled}
            type="button"
          ></button>
        ))}
      </div>

      <div className="black-keys">
        {blackKeys.map((note, index) =>
          note ? (
            <button
              key={index}
              className={`black-key black-key-${index}`}
              onClick={() => checkAnswer(note)}
              disabled={disabled}
              type="button"
            ></button>
          ) : (
            <div key={index} className="black-key-placeholder" />
          )
        )}
      </div>
    </PianoStyled>
  );
}
