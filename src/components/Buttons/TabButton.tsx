import React from "react";
import { styled } from "styled-components";

const TabButtonStyled = styled.button<{ $isSelected?: boolean }>`
  background: ${({ $isSelected }) =>
    $isSelected ? "var(--primary-color)" : "white"};
  color: ${({ $isSelected }) =>
    $isSelected ? "white" : "var(--secondary-color)"};

  border: 1px solid var(--primary-color);
  border-radius: 4px 4px 4px 4px;
  padding: 8px 8px;
  font-size: 16px;

  cursor: pointer;
  outline: none;
  transition: background 0.2s, color 0.2s;

  &:hover,
  &:focus-visible {
    background: var(--primary-color);
    color: white;
    border: 1px solid transparent;
  }
`;

interface TabButtonProps {
  children: React.ReactNode;
  isSelected?: boolean;
  [key: string]: any;
}

export default function TabButton({
  children,
  isSelected,
  ...props
}: TabButtonProps) {
  return (
    <TabButtonStyled $isSelected={isSelected} {...props}>
      {children}
    </TabButtonStyled>
  );
}
