/**
 * Context Types
 * All context-related types and interfaces
 */

import type { ReactNode } from "react";
import type { Statistics } from "./statistics";

// User Context Types
export interface UserState {
  isLogIn: boolean;
  userName: string;
  logInDialogOpen: boolean;
  registerDialogOpen: boolean;
  userManagementDialogOpen: boolean;
}

export type UserAction =
  | { type: "SET_LOGIN"; payload: boolean }
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_LOGIN_DIALOG"; payload: boolean }
  | { type: "SET_REGISTER_DIALOG"; payload: boolean }
  | { type: "SET_USER_MANAGEMENT_DIALOG"; payload: boolean }
  | { type: "LOGIN_USER"; payload: string }
  | { type: "LOGOUT_USER" };

export interface UserContextType {
  state: UserState;
  dispatch: (action: UserAction) => void;
  setUser: (user: string) => void;
  logoutUser: () => void;
}

// Game Context Types
export interface GameState {
  result: boolean | null;
  showContent: string | null;
  goodAnswers: number;
  wrongAnswers: number;
  disableSaveStatisticButton: boolean;
  statistics: Statistics[] | null;
  noteType: string;
  notes: string[];
}

export type GameAction =
  | { type: "SET_RESULT"; payload: boolean | null }
  | { type: "SET_SHOW_CONTENT"; payload: string | null }
  | { type: "SET_GOOD_ANSWERS"; payload: number }
  | { type: "SET_WRONG_ANSWERS"; payload: number }
  | { type: "INCREMENT_GOOD_ANSWERS" }
  | { type: "INCREMENT_WRONG_ANSWERS" }
  | { type: "SET_DISABLE_SAVE_BUTTON"; payload: boolean }
  | { type: "SET_STATISTICS"; payload: Statistics[] | null }
  | { type: "SET_NOTE_TYPE"; payload: string }
  | { type: "RESET_COUNTERS" }
  | { type: "NEXT_NOTE" };

export interface GameContextType {
  state: GameState;
  dispatch: (action: GameAction) => void;
  checkAnswer: (data: string) => void;
  onNextButtonClick: () => void;
  getRandomPosition: () => number;
}

// Settings Context Types
export interface SettingsState {
  locale: string;
  windowWidth: number;
}

export type SettingsAction =
  | { type: "SET_LOCALE"; payload: string }
  | { type: "SET_WINDOW_WIDTH"; payload: number };

export interface SettingsContextType {
  state: SettingsState;
  dispatch: (action: SettingsAction) => void;
}

// Context Provider Props
export interface UserProviderProps {
  children: ReactNode;
}

export interface GameProviderProps {
  children: ReactNode;
}

export interface SettingsProviderProps {
  children: ReactNode;
}
