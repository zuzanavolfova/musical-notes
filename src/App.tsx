import "./styles/main.css";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import NoteLearning from "./Pages/NoteLearning";
import HeaderComponent from "./components/Header";
import Footer from "./components/Footer";
import UserManagementDialog from "./components/Dialogs/UserManagementDialog";
import Dialog from "./components/Dialogs/Dialog";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

export default function App() {
  const { t } = useTranslation();
  const [isLogIn, setIsLogIn] = useState(
    localStorage.getItem("userName") ? true : false
  );
  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") ?? ""
  );
  const [logInDialogOpen, setIsLogInOpen] = useState(false);
  const [registerDialogOpen, setIsRegisterOpen] = useState(false);
  const [userManagementDialogOpen, setUserManagementDialogOpen] =
    useState(false);

  function saveUserNameToLocalStorage(user: string) {
    localStorage.setItem("userName", user);
  }
  function setUser(user: string) {
    saveUserNameToLocalStorage(user);
    setUserName(user);
  }
  return (
    <AppContainer>
      <HeaderComponent
        isLogIn={isLogIn}
        logInOpen={logInDialogOpen}
        registerDialogOpen={registerDialogOpen}
        userName={userName}
        setIsLogIn={setIsLogIn}
        setIsLogInOpen={setIsLogInOpen}
        setIsRegisterOpen={setIsRegisterOpen}
        setUserName={setUser}
      />
      <MainContent>
        <NoteLearning
          isLogIn={isLogIn}
          setUserManagementDialogOpen={setUserManagementDialogOpen}
          userName={userName}
        />
        {userManagementDialogOpen && (
          <Dialog
            dialogTitle={t("User Management")}
            handleClose={() => setUserManagementDialogOpen(false)}
            size="S"
          >
            <UserManagementDialog
              onLogIn={() => setIsLogInOpen(true)}
              onRegister={() => setIsRegisterOpen(true)}
              onClose={() => setUserManagementDialogOpen(false)}
            >
              <>
                <p>{t("LogIn/RegisterToSaveStatistics")}</p>
              </>
            </UserManagementDialog>
          </Dialog>
        )}
      </MainContent>
      <Footer />
    </AppContainer>
  );
}
