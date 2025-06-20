import { useState } from "react";

import StaveComponent from "../components/StaveComponent";
import NoteComponent from "../components/NoteComponent";
import SelectButton from "../components/Buttons/SelectButton";
import ActionButton from "../components/Buttons/ActionButton";

export default function Home() {
  const [answerResult, setAnswerResult] = useState<boolean | null>(null);
  const notes: string[] = ["c", "d", "e", "f", "g", "a", "h", "c2"];
  const [noteType, setNoteType] = useState<string>(
    () => notes[getRandomPosition()]
  );

  function getRandomPosition(): number {
    return Math.floor(Math.random() * notes.length);
  }

  function checkAnswer(data: string): void {
    if (data == noteType) {
      setAnswerResult(true);
    } else setAnswerResult(false);
  }

  function changeNote() {
    setAnswerResult(null);
    setNoteType(notes[getRandomPosition()]);
  }

  return (
    <>
      <section
        style={{
          position: "relative",
          height: "140px",
          margin: "20px",
        }}
      >
        <StaveComponent />
        <NoteComponent
          noteImage={noteType === "c" ? "note2" : "note"}
          noteType={noteType}
        />
      </section>

      <section
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          maxWidth: "300px",
          margin: "0 auto",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        {notes.map((note) => (
          <SelectButton
            checkAnswer={checkAnswer}
            key={note}
            answerText={note}
            resetFocus={answerResult === null}
            disabled={answerResult === true}
            isCorrect={answerResult === true && note === noteType}
          />
        ))}
      </section>
      <section>
        {answerResult != null && (
          <span>{answerResult ? "Good Answer" : "Wrong answer"}</span>
        )}
      </section>
      {answerResult === true && (
        <ActionButton buttonTitle="Next" onButtonClick={changeNote} />
      )}
    </>
  );
}
