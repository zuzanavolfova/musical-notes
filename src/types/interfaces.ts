import React from "react";
import type { TabType } from "./types";

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonTitle: string;
  onButtonClick: () => void;
  ariaLabel?: string;
}

export interface SelectButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  answerText: string;
  checkAnswer: (answerText: string) => void;
  resetFocus?: boolean;
  isCorrect?: boolean;
}

export interface TabButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSelected?: boolean;
  [key: string]: any;
}

export interface PianoProps {
  checkAnswer: (answerText: string) => void;
  noteType: string;
  answerResult: boolean | null;
  disabled?: boolean;
}

export interface TabsComponentProps {
  setContent: (tab: TabType) => void;
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonTitle?: string | null;
  buttonIcon?: string | null;
  items: { title: string; id: number | string }[];
  onItemSelect?: (value: string) => void;
}

export interface CounterProps {
  goodAnswersCounter: number;
  wrongAnswersCounter: number;
}

export interface DialogProps {
  size?: "S" | "M" | "L";
  dialogTitle: string;
  handleClose: () => void;
  children?: React.ReactNode;
}
