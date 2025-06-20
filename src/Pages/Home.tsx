import StaveComponent from "../components/StaveComponent";
import NoteComponent from "../components/NoteComponent";

export default function Home() {
  const notes: string[] = ["c", "d", "e", "f", "g", "a", "h", "c2"];

  const noteType: string = notes[getRandomPosition()];

  function getRandomPosition(): number {
    return Math.floor(Math.random() * notes.length);
  }

  return (
    <>
      <StaveComponent />
      <NoteComponent
        noteImage={noteType === "c" ? "note2" : "note"}
        noteType={noteType}
      />
    </>
  );
}
