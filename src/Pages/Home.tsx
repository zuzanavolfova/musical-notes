import { useState } from "react";

import StaveComponent from "../components/StaveComponent";
import NoteComponent from "../components/NoteComponent";
import SelectButton from "../components/Buttons/SelectButton";
import ActionButton from "../components/Buttons/ActionButton";
import Piano from "../components/Piano";
import TabsComponent from "../components/TabsComponent";

export default function Home() {
  const [answerResult, setAnswerResult] = useState<boolean | null>(null);
  const [showContent, setContent] = useState<string | null>("Notes");

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
  function changeContent(tab: "Notes" | "Keyboard") {
    setContent(tab);
  }
  return (
    <>
      <TabsComponent setContent={changeContent} />
      <section
        aria-label="Musical stave with note"
        style={{
          position: "relative",
          height: "130px",
          padding: "10px 0 0 0",
          margin: "20px 0",
          backgroundColor: "white",
        }}
      >
        <div style={{ position: "relative" }}>
          <StaveComponent />
          <NoteComponent
            noteImage={noteType === "c" ? "note2" : "note"}
            noteType={noteType}
          />
        </div>
      </section>

      {showContent === "Keyboard" && (
        <section id="Piano" style={{ margin: "0 auto" }}>
          <Piano
            checkAnswer={checkAnswer}
            noteType={noteType}
            answerResult={answerResult}
            disabled={answerResult === true}
          />
        </section>
      )}
      {showContent === "Notes" && (
        <section
          aria-label="Select the correct note"
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
              aria-pressed={answerResult === true && note === noteType}
              aria-label={`Select note ${note.toUpperCase()}`}
            />
          ))}
        </section>
      )}
      <section
        aria-live="polite"
        aria-atomic="true"
        style={{
          color: answerResult ? "var(--success-color)" : "var(--wrong-color)",
          fontSize: "32px",
          margin: "20px auto 0 auto",
        }}
      >
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
