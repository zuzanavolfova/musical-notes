import "./styles/main.css";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import NoteLearning from "./Pages/NoteLearning";
import HeaderComponent from "./components/Header";
import Footer from "./components/Footer";
import UserManagementDialog from "./components/Dialogs/UserManagementDialog";
import Dialog from "./components/Dialogs/Dialog";
import { UserProvider, useUser } from "./contexts/UserContext";
import { GameProvider } from "./contexts/GameContext";
import { SettingsProvider } from "./contexts/SettingsContext";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

function AppContent() {
  const { t } = useTranslation();
  const { state, dispatch } = useUser();

  return (
    <AppContainer>
      <HeaderComponent />
      <MainContent>
        <NoteLearning />
        {state.userManagementDialogOpen && (
          <Dialog
            dialogTitle={t("User Management")}
            handleClose={() => dispatch({ type: 'SET_USER_MANAGEMENT_DIALOG', payload: false })}
            size="S"
          >
            <UserManagementDialog
              onLogIn={() => dispatch({ type: 'SET_LOGIN_DIALOG', payload: true })}
              onRegister={() => dispatch({ type: 'SET_REGISTER_DIALOG', payload: true })}
              onClose={() => dispatch({ type: 'SET_USER_MANAGEMENT_DIALOG', payload: false })}
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

export default function App() {
  return (
    <SettingsProvider>
      <UserProvider>
        <GameProvider>
          <AppContent />
        </GameProvider>
      </UserProvider>
    </SettingsProvider>
  );
}
