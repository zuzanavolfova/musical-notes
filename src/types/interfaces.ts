import React from "react";
import type { TabType } from "./types";

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonTitle: string;
  onButtonClick?: () => void | null | Promise<void>;
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
  result: boolean | null;
  disabled?: boolean;
}

export interface TabsComponentProps extends React.HTMLAttributes<HTMLDivElement>{
  setContent: (tab: TabType) => void;
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonTitle?: string | null;
  buttonIcon?: string | null;
  items: {
    title: string;
    id: number | string;
    disabled?: boolean;
    onClick?: () => void;
  }[];
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

export interface LogInDialogProps {
  onLogInClick: (username: string) => void;
}

export interface RegisterDialogProps {
  onClose: () => void;
}

export interface UserManagementDialogProps {
  onLogIn: () => void;
  onRegister: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}

export interface NoteLearningProps {
  isLogIn?: boolean;
  userName: string;
  setUserManagementDialogOpen: (open: boolean) => void;
}

export interface Statistics {
  userName: string;
  goodAnswers: number;
  wrongAnswers: number;
  timeStamp: string;
}

export interface StatisticsProps {
  userName: string;
  statistics: Statistics[] | null;
}

export interface HeaderProps {
  isLogIn: boolean;
  logInOpen: boolean;
  registerDialogOpen: boolean;
  userName: string;
  setIsLogIn: (isLogged: boolean) => void;
  setIsLogInOpen: (isOpen: boolean) => void;
  setIsRegisterOpen: (isOpen: boolean) => void;
  setUserName: (name: string) => void;
}
