import StaveComponent from "../components/StaveComponent";

export default function Home() {
  const notes: string[] = ["c", "d", "e", "f", "g", "a", "h", "c2"];
  const noteType: string = notes[Math.floor(Math.random() * notes.length)];
  console.log("Note type:", noteType);

  return (
    <>
      <StaveComponent />
    </>
  );
}
