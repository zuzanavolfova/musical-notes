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
    border: 1px solid var(--secondary-color);
    border-radius: 0 0 6px 6px;
    cursor: pointer;
  }
  .black-key {
    width: 32px;
    height: 120px;
    background-color: black;
    border-radius: 0 0 6px 6px;
    border: none;
    position: absolute;
    top: 0;
    cursor: pointer;
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
}
const Piano = ({ checkAnswer }: PianoProps) => {
  return (
    <PianoStyled className="piano-container">
      <div className="white-keys">
        {whiteKeys.map((note, index) => (
          <button
            key={index}
            className="white-key"
            onClick={() => checkAnswer(note)}
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
              type="button"
            ></button>
          ) : (
            <div key={index} className="black-key-placeholder" />
          )
        )}
      </div>
    </PianoStyled>
  );
};

export default Piano;
