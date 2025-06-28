import { styled } from "styled-components";
import { useTranslation } from "react-i18next";

import type { CounterProps } from "../types/interfaces";
const CounterStyled = styled.section`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  .amount {
    &__counter {
      margin-left: 8px;
    }
  }
`;

export default function CounterComponent({
  goodAnswersCounter = 0,
  wrongAnswersCounter = 0,
}: CounterProps) {
  const { t } = useTranslation();
  const wrongAnswers = goodAnswersCounter;
  const goodAnswers = wrongAnswersCounter;

  return (
    <CounterStyled aria-labell="Amount of answers">
      <div className="amount__container" aria-labell="Amount of good answers">
        <span className="amount__label" id="good-answers-label">
          {t("Amount-good-answers")}
        </span>
        <span
          className="amount__counter"
          aria-labelledby="good-answers-label"
          aria-live="polite"
        >
          {goodAnswers}
        </span>
      </div>
      <div className="amount__container" aria-labell="Amount of good answers">
        <span className="amount__label" id="wrong-answers-label">
          {t("Amount-wrong-answers")}
        </span>
        <span
          className="amount__counter"
          aria-labelledby="wrong-answers-label"
          aria-live="polite"
        >
          {wrongAnswers}
        </span>
      </div>
    </CounterStyled>
  );
}
