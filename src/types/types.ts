export type TabType = "Keyboard" | "Notes";

export type UserState = {
  isLogin: boolean;
  userName: string;
};

export type UserAction = 
  | { type: "LOGIN" }
  | { type: "LOGOUT" }
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_USER"; payload: string };

export type UserContextType = {
  isLogin: boolean;
  userName: string;
  logInDialogOpen: boolean;
  registerDialogOpen: boolean;
  userManagementDialogOpen: boolean;
  setUser: (user: string) => void;
  setUserName: (user: string) => void;
  setIsLogin: (open: boolean) => void;
  setIsLogInOpen: (open: boolean) => void;
  setIsRegisterOpen: (open: boolean) => void;
  setUserManagementDialogOpen: (open: boolean) => void;
};

