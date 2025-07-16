import { createContext, useContext, useReducer } from 'react';
import type { 
  GameState, 
  GameAction, 
  GameContextType, 
  GameProviderProps 
} from '../types';

const GameContext = createContext<GameContextType | undefined>(undefined);

const notes: string[] = ["c", "d", "e", "f", "g", "a", "h", "c2"];

function getRandomPosition(): number {
  return Math.floor(Math.random() * notes.length);
}

const initialState: GameState = {
  result: null,
  showContent: "Keyboard",
  goodAnswers: 0,
  wrongAnswers: 0,
  disableSaveStatisticButton: false,
  statistics: null,
  noteType: notes[getRandomPosition()],
  notes,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_RESULT':
      return { ...state, result: action.payload };
    case 'SET_SHOW_CONTENT':
      return { ...state, showContent: action.payload };
    case 'SET_GOOD_ANSWERS':
      return { ...state, goodAnswers: action.payload };
    case 'SET_WRONG_ANSWERS':
      return { ...state, wrongAnswers: action.payload };
    case 'INCREMENT_GOOD_ANSWERS':
      return { ...state, goodAnswers: state.goodAnswers + 1 };
    case 'INCREMENT_WRONG_ANSWERS':
      return { ...state, wrongAnswers: state.wrongAnswers + 1 };
    case 'SET_DISABLE_SAVE_BUTTON':
      return { ...state, disableSaveStatisticButton: action.payload };
    case 'SET_STATISTICS':
      return { ...state, statistics: action.payload };
    case 'SET_NOTE_TYPE':
      return { ...state, noteType: action.payload };
    case 'RESET_COUNTERS':
      return { ...state, goodAnswers: 0, wrongAnswers: 0 };
    case 'NEXT_NOTE':
      return {
        ...state,
        disableSaveStatisticButton: false,
        result: null,
        noteType: notes[getRandomPosition()],
      };
    default:
      return state;
  }
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const checkAnswer = (data: string): void => {
    if (data === state.noteType) {
      dispatch({ type: 'INCREMENT_GOOD_ANSWERS' });
      dispatch({ type: 'SET_RESULT', payload: true });
    } else {
      dispatch({ type: 'INCREMENT_WRONG_ANSWERS' });
      dispatch({ type: 'SET_RESULT', payload: false });
    }
  };

  const onNextButtonClick = () => {
    dispatch({ type: 'NEXT_NOTE' });
  };

  return (
    <GameContext.Provider value={{ state, dispatch, checkAnswer, onNextButtonClick, getRandomPosition }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}