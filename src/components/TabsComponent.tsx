import { useState } from "react";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";

import TabButton from "./Buttons/TabButton";

import type { TabsComponentProps } from "./../types/interfaces";
import type { TabType } from "../types/types";

const TabsContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px auto;
  gap: 12px;
  width: calc(8 * var(--piano-key-width) -24px);
  flex-wrap: wrap;
`;

export default function TabsComponent({ setContent }: TabsComponentProps) {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<TabType>("Keyboard");

  function handleOnTabClick(value: TabType) {
    setSelectedTab(value);
    setContent(value);
  }
  return (
    <TabsContainerStyled>
      <TabButton
        isSelected={selectedTab === "Keyboard"}
        onClick={() => handleOnTabClick("Keyboard")}
      >
        {t("find-note-on-keyboard")}
      </TabButton>
      <TabButton
        isSelected={selectedTab === "Notes"}
        onClick={() => handleOnTabClick("Notes")}
      >
        {t("learn-notes")}
      </TabButton>
    </TabsContainerStyled>
  );
}
