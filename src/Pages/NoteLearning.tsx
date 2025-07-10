import { useState } from "react";
import { useTranslation } from "react-i18next";

import StaveComponent from "../components/StaveComponent";
import NoteComponent from "../components/NoteComponent";
import SelectButton from "../components/Buttons/SelectButton";
import ActionButton from "../components/Buttons/ActionButton";
import Piano from "../components/Piano";
import TabsComponent from "../components/TabsComponent";
import CounterComponent from "../components/CounterComponent";
import StatisticsComponent from "../components/StatisticsComponent";

import { saveStatistics, getStatistics } from "../scripts/services/statistics";
import { formatDataStatistics } from "../scripts/statistics";

import type { TabType } from "../types/types";
import type { NoteLearningProps } from "../types/interfaces";
import type { Statistics } from "../types/interfaces";

export default function NoteLearning({
  isLogIn,
  userName,
  setUserManagementDialogOpen,
}: NoteLearningProps) {
  const { t } = useTranslation();
  const [result, setResult] = useState<boolean | null>(null);
  const [showContent, setContent] = useState<string | null>("Keyboard");
  const [goodAnswers, setGoodAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [disableSaveStatisticButton, setDisableSaveStatisticButton] =
    useState<boolean>(false);
  const [statistics, setStatistics] = useState<Statistics[] | null>(null);
  const notes: string[] = ["c", "d", "e", "f", "g", "a", "h", "c2"];
  const [noteType, setNoteType] = useState<string>(
    () => notes[getRandomPosition()]
  );

  function getRandomPosition(): number {
    return Math.floor(Math.random() * notes.length);
  }

  function changeContent(tab: TabType) {
    setContent(tab);
  }

  function checkAnswer(data: string): void {
    if (data == noteType) {
      setGoodAnswers((prev) => prev + 1);
      setResult(true);
    } else {
      setWrongAnswers((prev) => prev + 1);
      setResult(false);
    }
  }

  function onNextButtonClick() {
    setDisableSaveStatisticButton(false);
    setResult(null);
    setNoteType(notes[getRandomPosition()]);
  }

  async function updateStatisticsUI() {
    const data = await getStatistics(userName);
    if (data && data.statistics) {
      setStatistics(formatDataStatistics(data.statistics));
    }
  }

  async function onSaveStatisticsClick() {
    if (isLogIn) {
      const statistic: Statistics = {
        userName: userName || "",
        goodAnswers,
        wrongAnswers,
        timeStamp: new Date().toISOString(),
      };
      setDisableSaveStatisticButton(true);
      await saveStatistics(statistic);
      await updateStatisticsUI();
    } else setUserManagementDialogOpen(true);
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
            result={result}
            disabled={result === true}
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
              resetFocus={result === null}
              disabled={result === true}
              isCorrect={result === true && note === noteType}
              aria-pressed={result === true && note === noteType}
              aria-label={`Select note ${note.toUpperCase()}`}
            />
          ))}
        </section>
      )}
      <section
        aria-live="polite"
        aria-atomic="true"
        style={{
          color: result ? "var(--success-color)" : "var(--wrong-color)",
          fontSize: "32px",
          margin: "20px auto 0 auto",
        }}
      >
        {result != null && (
          <span>{result ? t("good-answer") : t("wrong-answer")}</span>
        )}
      </section>
      <CounterComponent
        goodAnswersCounter={goodAnswers}
        wrongAnswersCounter={wrongAnswers}
      ></CounterComponent>
      {result === true && (
        <>
          <ActionButton
            buttonTitle="saveStatistics"
            disabled={disableSaveStatisticButton}
            onButtonClick={onSaveStatisticsClick}
          />
          <ActionButton
            buttonTitle="next-t"
            onButtonClick={onNextButtonClick}
          />
        </>
      )}
      {userName && (
        <StatisticsComponent userName={userName} statistics={statistics} />
      )}
    </>
  );
}
