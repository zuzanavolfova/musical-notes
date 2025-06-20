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
    c: "56px",
    d: "40px",
    e: "29px",
    f: "19px",
    g: "8px",
    a: "-2px",
    h: "-13px",
    c2: "-23px",
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
