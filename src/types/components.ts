/**
 * Component Props Interfaces
 * All component prop type definitions
 */

import type { ReactNode } from "react";
import type { TabType } from "./common";
import type { Statistics } from "./statistics";

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
  children: ReactNode;
  isSelected?: boolean;
  [key: string]: unknown;
}

export interface PianoProps {
  checkAnswer: (answerText: string) => void;
  noteType: string;
  result: boolean | null;
  disabled?: boolean;
}

export interface TabsComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  setContent: (tab: TabType) => void;
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonTitle?: string | null;
  buttonIcon?: string | null;
  buttonDescription?: string | null;
  items: DropdownItemType[];
  onItemSelect?: (value: string) => void;
}

export interface CounterProps {
  goodAnswersCounter: number;
  wrongAnswersCounter: number;
}

export interface DialogProps {
  size?: "S" | "M" | "L";
  dialogTitle?: string;
  showHeader?: boolean;
  handleClose?: () => void;
  children?: ReactNode;
  disableOutsideClick?: boolean;
  disableEsc?: boolean;
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
  children?: ReactNode;
}

export interface StatisticsProps {
  userName: string;
  statistics: Statistics[] | null;
}

export interface LoadingProps {
  message?: string;
}

export interface DropdownItemType {
  title: string;
  id: number | string;
  disabled?: boolean;
  isFocused?: boolean;
  onClick?: () => void;
}
