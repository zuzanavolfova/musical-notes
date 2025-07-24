import { useTranslation } from "react-i18next";
import type { FormEvent } from "react";
import { useState } from "react";
import DropdownComponent from "../Buttons/DropdownComponent";
import type { DropdownItemType } from "../../types/interfaces";

export default function FilterForm() {
  const { t } = useTranslation();
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  const resultOptions: DropdownItemType[] = [
    { id: "most-wrong", title: "most_wrong" },
    { id: "most-good", title: "most_good" },
  ];

  function handleSubmitFilter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const filterData = new FormData(event.currentTarget);
    const dateTime = filterData.getAll("dateTime");
    const data: { [key: string]: FormDataEntryValue | FormDataEntryValue[] | null } =
      Object.fromEntries(filterData.entries());
    data.dateTime = dateTime;
    console.log("Form data:", data);
    // event.target.reset()
  }

  function handleResultSelect(value: string) {
    const selectedOption = resultOptions.find(
      (option) => option.title === value
    );
    setSelectedResult(selectedOption ? selectedOption.title : null);
  }
  return (
    <form onSubmit={handleSubmitFilter}>
      <input type="date" id="date" name="dateTime"></input>
      <input type="time" id="date" name="dateTime"></input>
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
      <button>{t("filter")}</button>
    </form>
  );
}
