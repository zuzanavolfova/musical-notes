import styled from "styled-components";
import { useTranslation } from "react-i18next";

import type { StatisticsProps } from "../types/interfaces";

const StatisticsStyled = styled.section`
  .statistics {
    &__item {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--bkg-medium);
      margin: 20px auto;
      width: 280px;
      &__date {
        padding: 4px 0;
        background-color: var(--primary-color-hover);
        box-shadow: 1px 2px 6px rgba(124, 124, 124, 0.5);
      }
      &__details {
        display: flex;
        justify-content: space-between;
        padding: 4px 12px;
      }
    }
  }
`;

export default function StatisticsComponent({
  userName,
  statistics,
}: StatisticsProps) {
  const { t } = useTranslation();

  return (
    <StatisticsStyled>
      <h2>{t("statistics")}</h2>
      <h3>
        {t("student")} {userName}
      </h3>
      {statistics === null && <p>{t("noStatistics")}</p>}
      {statistics &&
        statistics.length > 0 &&
        statistics.map((item, index) => (
          <div className="statistics__item" key={index}>
            <div className="statistics__item__date">
              <span>{t("savedTime")} </span>
              <span>{item.timeStamp ? item.timeStamp : ""}</span>
            </div>
            <div
              className="statistics__item__details"
              style={{
                color:
                  item.goodAnswers > item.wrongAnswers
                    ? "var(--success-color)"
                    : "var(--text-dark-grey)",
              }}
            >
              <span>{t("amount-good-answers")} </span>
              <span>{item.goodAnswers ? item.goodAnswers : 0}</span>
            </div>
            <div
              className="statistics__item__details"
              style={{
                color:
                  item.goodAnswers < item.wrongAnswers
                    ? "var(--wrong-color)"
                    : "var(--text-dark-grey)",
              }}
            >
              <span>{t("amount-wrong-answers")} </span>
              <span>{item.wrongAnswers ? item.wrongAnswers : 0}</span>
            </div>
          </div>
        ))}
    </StatisticsStyled>
  );
}
