import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";

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
import { useGame } from "../contexts/GameContext";
import { useUser } from "../contexts/UserContext";

import type { TabType, Statistics } from "../types";

const NoteLearningStyled = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 960px) {
    display: grid;
    grid-template-columns: minmax(300px, 600px) 1fr minmax(300px, 600px);
    grid-template-rows: 80px auto;
    grid-template-areas:
      "clef tabs statistics"
      "clef content statistics";
  }

  .tabs {
    grid-area: tabs;
  }
  .content {
    grid-area: content;
  }
  .statistics {
    grid-area: statistics;

    @media screen and (min-width: 960px) {
      display: flex;
      flex-direction: column;
      align-items: self-start;
      margin-left: 20px;
      &__counter {
        text-align: start;
      }

      h2 {
        position: relative;
        padding-bottom: 8px;
        margin-bottom: 16px;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 150%;
          height: 2px;
          background: linear-gradient(
            to right,
            var(--primary-color) 70%,
            white 100%
          );
        }
      }
    }
  }
`;

export default function NoteLearning() {
  const { t } = useTranslation();
  const { state: gameState, dispatch: gameDispatch, checkAnswer, onNextButtonClick } = useGame();
  const { state: userState, dispatch: userDispatch } = useUser();

  function changeContent(tab: TabType) {
    gameDispatch({ type: 'SET_SHOW_CONTENT', payload: tab });
  }

  async function updateStatisticsUI() {
    const data = await getStatistics(userState.userName);
    if (data && data.statistics) {
      gameDispatch({ type: 'SET_STATISTICS', payload: formatDataStatistics(data.statistics) });
    }
  }
  
  useEffect(() => {
    if (userState.isLogIn) {
      updateStatisticsUI();
    }
  }, [userState.userName, userState.isLogIn]);

  async function onSaveStatisticsClick() {
    if (userState.isLogIn) {
      const statistic: Statistics = {
        userName: userState.userName || "",
        goodAnswers: gameState.goodAnswers,
        wrongAnswers: gameState.wrongAnswers,
        timeStamp: new Date().toISOString(),
      };
      gameDispatch({ type: 'SET_DISABLE_SAVE_BUTTON', payload: true });
      await saveStatistics(statistic);
      await updateStatisticsUI();
    } else {
      userDispatch({ type: 'SET_USER_MANAGEMENT_DIALOG', payload: true });
    }
  }

  return (
    <NoteLearningStyled>
      <TabsComponent className="tabs" setContent={changeContent} />
      <div className="content">
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
              noteImage={gameState.noteType === "c" ? "note2" : "note"}
              noteType={gameState.noteType}
            />
          </div>
        </section>
        {gameState.showContent === "Keyboard" && (
          <section id="Piano" style={{ margin: "0 auto" }}>
            <Piano
              checkAnswer={checkAnswer}
              noteType={gameState.noteType}
              result={gameState.result}
              disabled={gameState.result === true}
            />
          </section>
        )}
        {gameState.showContent === "Notes" && (
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
            {gameState.notes.map((note) => (
              <SelectButton
                checkAnswer={checkAnswer}
                key={note}
                answerText={note}
                resetFocus={gameState.result === null}
                disabled={gameState.result === true}
                isCorrect={gameState.result === true && note === gameState.noteType}
                aria-pressed={gameState.result === true && note === gameState.noteType}
                aria-label={`Select note ${note.toUpperCase()}`}
              />
            ))}
          </section>
        )}
        <section
          aria-live="polite"
          aria-atomic="true"
          style={{
            color: gameState.result ? "var(--success-color)" : "var(--wrong-color)",
            fontSize: "32px",
            margin: "20px auto 0 auto",
          }}
        >
          {gameState.result != null && (
            <span>{gameState.result ? t("good-answer") : t("wrong-answer")}</span>
          )}
        </section>

        {gameState.result === true && (
          <ActionButton
            buttonTitle="next-t"
            onButtonClick={onNextButtonClick}
          />
        )}
      </div>
      <div className="statistics">
        <div className="statistics__counter">
          <h2>{t("statistics")}</h2>
          <CounterComponent
            goodAnswersCounter={gameState.goodAnswers}
            wrongAnswersCounter={gameState.wrongAnswers}
          ></CounterComponent>
        </div>
        {userState.userName && (
          <>
            <ActionButton
              buttonTitle="saveStatistics"
              disabled={gameState.disableSaveStatisticButton}
              onButtonClick={onSaveStatisticsClick}
            />
            <StatisticsComponent userName={userState.userName} statistics={gameState.statistics} />
          </>
        )}
      </div>
    </NoteLearningStyled>
  );
}
