export default function SelectButton({ answerText }: { answerText: string }) {
  return (
    <button aria-label={`click to answer - ${answerText}`}>{answerText}</button>
  );
}
