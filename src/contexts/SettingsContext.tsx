import { createContext, useContext, useReducer } from 'react';
import type { 
  SettingsState, 
  SettingsAction, 
  SettingsContextType, 
  SettingsProviderProps 
} from '../types';

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const initialState: SettingsState = {
  locale: 'CS',
  windowWidth: window.innerWidth,
};

function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'SET_LOCALE':
      return { ...state, locale: action.payload };
    case 'SET_WINDOW_WIDTH':
      return { ...state, windowWidth: action.payload };
    default:
      return state;
  }
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}