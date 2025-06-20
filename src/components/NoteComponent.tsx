import note from "./../assets/Note.webp";
import note2 from "./../assets/Note2.webp";

export default function NoteComponent({
  noteImage,
  noteType,
}: {
  noteImage: "note" | "note2";
  noteType: string;
}) {
  const notePosition: { [key: string]: string } = {
    c: "152px",
    d: "142px",
    e: "132px",
    f: "122px",
    g: "112px",
    a: "101px",
    h: "89px",
    c2: "80px",
  };

  return (
    <img
      src={noteImage === "note" ? note : note2}
      alt="Musical Note"
      style={{
        position: "absolute",
        top: notePosition[noteType],
        left: "50%",
        height: "66px",
      }}
    />
  );
}
