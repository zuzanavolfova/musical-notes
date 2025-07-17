import { createContext, useState, useReducer } from "react";
import type { ReactNode } from "react";
import type { UserContextType, UserState, UserAction } from "../types/types";

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: true };
    case "LOGOUT":
      localStorage.removeItem("userName");
      return { ...state, isLogin: false, userName: "" };
    case "SET_USERNAME":
      return { ...state, userName: action.payload };
    case "SET_USER":
      localStorage.setItem("userName", action.payload);
      return { ...state, userName: action.payload, isLogin: true };
    default:
      return state;
  }
}

export const UserContext = createContext<UserContextType>({
  isLogin: false,
  userName: "",
  logInDialogOpen: false,
  registerDialogOpen: false,
  userManagementDialogOpen: false,
  setIsLogin: () => {},
  setUser: () => {},
  setUserName: () => {},
  setIsLogInOpen: () => {},
  setIsRegisterOpen: () => {},
  setUserManagementDialogOpen: () => {},
});

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const initialUserState: UserState = {
    isLogin: localStorage.getItem("userName") ? true : false,
    userName: localStorage.getItem("userName") ?? "",
  };

  const [userState, dispatch] = useReducer(userReducer, initialUserState);
  const [logInDialogOpen, setIsLogInOpen] = useState(false);
  const [registerDialogOpen, setIsRegisterOpen] = useState(false);
  const [userManagementDialogOpen, setUserManagementDialogOpen] =
    useState(false);

  function setUser(user: string) {
    dispatch({ type: "SET_USER", payload: user });
  }

  function setUserName(userName: string) {
    dispatch({ type: "SET_USERNAME", payload: userName });
  }

  function setIsLogin(value: boolean) {
    dispatch({ type: value ? "LOGIN" : "LOGOUT" });
  }

  const ctxValue = {
    isLogin: userState.isLogin,
    userName: userState.userName,
    logInDialogOpen,
    registerDialogOpen,
    userManagementDialogOpen,
    setUser,
    setUserName,
    setIsLogin,
    setIsLogInOpen,
    setIsRegisterOpen,
    setUserManagementDialogOpen,
  };

  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
}
