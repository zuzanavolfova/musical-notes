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

  return (
    <CounterStyled aria-label={t("Amount-of-answers")}>
      <div className="amount__container" aria-label={t("Amount-good-answers")}>
        <span className="amount__label" id="good-answers-label">
          {t("Amount-good-answers")}
        </span>
        <span
          className="amount__counter"
          aria-labelledby="good-answers-label"
          aria-live="polite"
        >
          {goodAnswersCounter}
        </span>
      </div>
      <div className="amount__container" aria-label={t("Amount-wrong-answers")}>
        <span className="amount__label" id="wrong-answers-label">
          {t("Amount-wrong-answers")}
        </span>
        <span
          className="amount__counter"
          aria-labelledby="wrong-answers-label"
          aria-live="polite"
        >
          {wrongAnswersCounter}
        </span>
      </div>
    </CounterStyled>
  );
}
