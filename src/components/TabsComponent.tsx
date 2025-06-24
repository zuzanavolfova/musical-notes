import { useState } from "react";
import { styled } from "styled-components";

import TabButton from "./Buttons/TabButton";

import type { TabsComponentProps } from "./../types/interfaces";
import type { TabType } from "../types/types";

const TabsContainerStyled = styled.div`
  display: flex;
  margin: 30px auto;
  gap: 12px;
  width: calc(8 * var(--piano-key-width));
`;

export default function TabsComponent({ setContent }: TabsComponentProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>("Notes");

  function handleOnTabClick(value: TabType) {
    setSelectedTab(value);
    setContent(value);
  }
  return (
    <TabsContainerStyled>
      <TabButton
        isSelected={selectedTab === "Notes"}
        onClick={() => handleOnTabClick("Notes")}
      >
        Learn notes
      </TabButton>
      <TabButton
        isSelected={selectedTab === "Keyboard"}
        onClick={() => handleOnTabClick("Keyboard")}
      >
        Find the note on the keyboard
      </TabButton>
    </TabsContainerStyled>
  );
}
