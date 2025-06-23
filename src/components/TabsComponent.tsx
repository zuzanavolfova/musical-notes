import { styled } from "styled-components";

import { useState } from "react";

import TabButton from "./Buttons/TabButton";

const TabsContainerStyled = styled.div`
  display: flex;
  margin: 30px auto;
  gap: 12px;
  width: calc(8 * var(--piano-key-width));
`;

type TabType = "Notes" | "Keyboard";
interface TabsComponentProps {
  setContent: (tab: TabType) => void;
}

export default function TabsComponent({ setContent }: TabsComponentProps) {
  const [selectedTab, setSelectedTab] = useState<TabType | null>("Notes");

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
