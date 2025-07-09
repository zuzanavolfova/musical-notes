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
  const [isLogIn, setIsLogIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [logInDialogOpen, setIsLogInOpen] = useState(false);
  const [registerDialogOpen, setIsRegisterOpen] = useState(false);
  const [userManagementDialogOpen, setUserManagementDialogOpen] =
    useState(false);

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
        setUserName={setUserName}
      />
      <MainContent>
        <NoteLearning
          isLogIn={isLogIn}
          setUserManagementDialogOpen={setUserManagementDialogOpen}
        />
        {userManagementDialogOpen && (
          <Dialog
            dialogTitle={t("User Management")}
            handleClose={() => setUserManagementDialogOpen(false)}
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
