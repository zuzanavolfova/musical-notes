import { useTranslation } from "react-i18next";
import type { FormEvent } from "react";
import { useState } from "react";
import { styled } from "styled-components";

import DropdownComponent from "./Buttons/DropdownComponent";
import ActionButton from "./Buttons/ActionButton";
import type { DropdownItemType } from "../types/interfaces";

interface FilterFormProps {
  onFilterApply: (filters: { date?: string; result?: string }) => void;
}

const FormStyled = styled.form`
  padding: 1rem;
  background-color: var(--bkg-light);
  clip-path: polygon(10% 0, 90% 0, 80% 100%, 20% 100%);
  border-radius: 4px;
  margin: 12px auto;
  max-width: 440px;
  @media screen and (min-width: 960px) {
    clip-path: polygon(0 0, 100% 0, 92% 100%, 8% 100%);
  }

  @media (prefers-color-scheme: dark) {
    background-color: var(--bkg-dark);
    box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.5);
  }

  input[type="date"] {
    padding: 8px 12px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 16px;
    background-color: white;

    cursor: pointer;
    transition: all 0.3s ease-in-out;

    @media (prefers-color-scheme: dark) {
      background-color: var(--bkg-dark);
      color: var(--dark-theme-text-color);
      box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.5);
    }
  }
`;

const ApplyButton = styled(ActionButton)`
  font-size: 16px;
  padding: 12px 18px;
`;

const ResetButton = styled(ActionButton)`
  background-color: white !important;
  color: var(--primary-color) !important;
  border: 2px solid var(--primary-color) !important;
  font-size: 16px;
  padding: 12px 18px;
  &:hover {
    background-color: var(--primary-color-hover) !important;
    border: 2px solid var(--primary-color-hover) !important;
    color: white !important;
  }

  &:active {
    background-color: var(--primary-color) !important;
    color: white !important;
  }
`;

export default function FilterForm({ onFilterApply }: FilterFormProps) {
  const { t } = useTranslation();
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const resultOptions: DropdownItemType[] = [
    { id: "all", title: "All" },
    { id: "most-wrong", title: "most_wrong" },
    { id: "most-good", title: "most_good" },
  ];

  function handleSubmitFilter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const filterData = new FormData(event.currentTarget);

    const filters = {
      date: (filterData.get("date") as string) || undefined,
      result: (filterData.get("result") as string) || undefined,
    };

    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value && value.trim() !== ""
      )
    );

    onFilterApply(cleanedFilters);
  }

  function handleResultSelect(value: string) {
    const selectedOption = resultOptions.find(
      (option) => option.title === value
    );
    setSelectedResult(selectedOption ? selectedOption.title : null);
  }

  function resetFilter() {
    setSelectedResult(null);
    setSelectedDate("");
    onFilterApply({});
  }
  return (
    <FormStyled onSubmit={handleSubmitFilter}>
      <div>
        <input
          type="date"
          id="date"
          name="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        ></input>
        <DropdownComponent
          buttonTitle={selectedResult || "select_option"}
          items={resultOptions}
          onItemSelect={handleResultSelect}
        />
        <input
          type="hidden"
          name="result"
          value={
            selectedResult
              ? resultOptions.find((opt) => opt.title === selectedResult)?.id ||
                ""
              : ""
          }
        />
      </div>
      <div>
        <ApplyButton buttonTitle={t("applyFilter")} type="submit" />
        <ResetButton
          buttonTitle={t("resetFilter")}
          type="button"
          onClick={resetFilter}
        />
      </div>
    </FormStyled>
  );
}
