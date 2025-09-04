import { useTranslation } from "react-i18next";
import type { FormEvent } from "react";
import { useState } from "react";
import DropdownComponent from "./Buttons/DropdownComponent";
import type { DropdownItemType } from "../types/interfaces";

interface FilterFormProps {
  onFilterApply: (filters: { date?: string; result?: string }) => void;
}

export default function FilterForm({ onFilterApply }: FilterFormProps) {
  const { t } = useTranslation();
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

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
  return (
    <form onSubmit={handleSubmitFilter}>
      <input type="date" id="date" name="date"></input>
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
      <button type="submit">{t("filter")}</button>
    </form>
  );
}
