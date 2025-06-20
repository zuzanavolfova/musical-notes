import StaveComponent from "../components/StaveComponent";
import NoteComponent from "../components/NoteComponent";
import SelectButton from "../components/Buttons/SelectButton";
export default function Home() {
  const notes: string[] = ["c", "d", "e", "f", "g", "a", "h", "c2"];

  const noteType: string = notes[getRandomPosition()];

  function getRandomPosition(): number {
    return Math.floor(Math.random() * notes.length);
  }

  return (
    <>
      <div
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
      </div>
      {notes.map((note) => (
        <SelectButton key={note} answerText={note} />
      ))}
    </>
  );
}
