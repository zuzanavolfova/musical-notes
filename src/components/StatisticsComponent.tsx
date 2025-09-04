import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import FilterForm from "./FilterForm";

import type { StatisticsProps } from "../types/interfaces";

const StatisticsStyled = styled.section`
  .statistics {
    &__item {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--bkg-medium);
      border-radius: 2px;
      margin: 20px auto;
      width: 280px;
      &__date {
        padding: 4px 0;
        background-color: var(--bkg-medium);
        box-shadow: 1px 2px 6px rgba(124, 124, 124, 0.5);
        color: var(--text-dark-grey);
        font-weight: 600;
        border-bottom: 1px solid var(--primary-color);
      }
      &__details {
        display: flex;
        justify-content: space-between;
        padding: 4px 12px;
        @media (prefers-color-scheme: dark) {
          background-color: var(--bkg-light);
        }
      }
    }
  }
`;

interface FilterData {
  date?: string;
  result?: string;
}

export default function StatisticsComponent({
  userName,
  statistics,
}: StatisticsProps) {
  const { t } = useTranslation();
  const [filterData, setFilterData] = useState<FilterData>({});

  const filteredStatistics = useMemo(() => {
    if (!statistics || statistics.length === 0) return statistics;

    return statistics.filter((item) => {
      if (!filterData.date && !filterData.result) return;

      let passesDateFilter = true;
      let passesResultFilter = true;

      if (filterData.date) {
        if (!item.timeStamp) {
          passesDateFilter = false;
        } else {
          const parts = item.timeStamp.split(" ");
          if (parts.length >= 3) {
            const datePart = parts[0] + " " + parts[1] + " " + parts[2];
            const [day, month, year] = datePart.split(". ");
            const itemDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
              2,
              "0"
            )}`;
            passesDateFilter = itemDate === filterData.date;
          } else {
            passesDateFilter = false;
          }
        }
      }

      if (filterData.result) {
        if (filterData.result === "most-good") {
          passesResultFilter = item.goodAnswers > item.wrongAnswers;
        } else if (filterData.result === "most-wrong") {
          passesResultFilter = item.wrongAnswers > item.goodAnswers;
        }
      }
      return passesDateFilter && passesResultFilter;
    });
  }, [statistics, filterData]);

  const handleFilterApply = (filters: FilterData) => {
    setFilterData(filters);
  };

  return (
    <StatisticsStyled>
      <h3>
        {t("student")} {userName}
      </h3>
      {statistics?.length === 0 && <p>{t("noStatistics")}</p>}
      {statistics && statistics.length > 0 && (
        <FilterForm onFilterApply={handleFilterApply} />
      )}
      {filteredStatistics &&
        filteredStatistics.length > 0 &&
        filteredStatistics.map((item, index) => (
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
