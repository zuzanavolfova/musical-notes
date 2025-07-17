import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { UserContextType } from "../types/types";

export const UserContext = createContext<UserContextType>({
  isLogin: false,
  userName: "",
  logInDialogOpen: false,
  registerDialogOpen: false,
  userManagementDialogOpen: false,
  setIsLogin: () => {},
  setUser: () => {},
  setIsLogInOpen: () => {},
  setIsRegisterOpen: () => {},
  setUserManagementDialogOpen: () => {},
});

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("userName") ? true : false
  );
  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") ?? ""
  );
  const [logInDialogOpen, setIsLogInOpen] = useState(false);
  const [registerDialogOpen, setIsRegisterOpen] = useState(false);
  const [userManagementDialogOpen, setUserManagementDialogOpen] =
    useState(false);

  function saveToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  function setUser(user: string) {
    saveToLocalStorage("userName", user);
    setUserName(user);
    setIsLogin(true);
  }

  const ctxValue = {
    isLogin,
    userName,
    logInDialogOpen,
    registerDialogOpen,
    userManagementDialogOpen,
    setUser,
    setIsLogin,
    setIsLogInOpen,
    setIsRegisterOpen,
    setUserManagementDialogOpen,
  };

  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
}
