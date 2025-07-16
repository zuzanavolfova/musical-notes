import { createContext, useContext, useReducer } from 'react';
import type { 
  UserState, 
  UserAction, 
  UserContextType, 
  UserProviderProps 
} from '../types';

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialState: UserState = {
  isLogIn: localStorage.getItem("userName") ? true : false,
  userName: localStorage.getItem("userName") ?? "",
  logInDialogOpen: false,
  registerDialogOpen: false,
  userManagementDialogOpen: false,
};

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'SET_LOGIN':
      return { ...state, isLogIn: action.payload };
    case 'SET_USERNAME':
      return { ...state, userName: action.payload };
    case 'SET_LOGIN_DIALOG':
      return { ...state, logInDialogOpen: action.payload };
    case 'SET_REGISTER_DIALOG':
      return { ...state, registerDialogOpen: action.payload };
    case 'SET_USER_MANAGEMENT_DIALOG':
      return { ...state, userManagementDialogOpen: action.payload };
    case 'LOGIN_USER':
      localStorage.setItem("userName", action.payload);
      return {
        ...state,
        isLogIn: true,
        userName: action.payload,
        logInDialogOpen: false,
        registerDialogOpen: false,
      };
    case 'LOGOUT_USER':
      localStorage.removeItem("userName");
      return {
        ...state,
        isLogIn: false,
        userName: "",
        logInDialogOpen: false,
        registerDialogOpen: false,
        userManagementDialogOpen: false,
      };
    default:
      return state;
  }
}

export function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user: string) => {
    dispatch({ type: 'LOGIN_USER', payload: user });
  };

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT_USER' });
  };

  return (
    <UserContext.Provider value={{ state, dispatch, setUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}