import "./styles/main.css";
import styled from "styled-components";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

import NoteLearning from "./Pages/NoteLearning";
import HeaderComponent from "./components/Header";
import Footer from "./components/Footer";
import UserManagementDialog from "./components/Dialogs/UserManagementDialog";
import Dialog from "./components/Dialogs/Dialog";

import UserContextProvider from "./store/user-context";

import { UserContext } from "./store/user-context";

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
  const { setUserManagementDialogOpen, userManagementDialogOpen } =
    useContext(UserContext);

  return (
    <UserContextProvider>
      <AppContainer>
        <HeaderComponent />
        <MainContent>
          <NoteLearning />
          {userManagementDialogOpen && (
            <Dialog
              dialogTitle={t("User Management")}
              handleClose={() => setUserManagementDialogOpen(false)}
              size="S"
            >
              <UserManagementDialog>
                <>
                  <p>{t("LogIn/RegisterToSaveStatistics")}</p>
                </>
              </UserManagementDialog>
            </Dialog>
          )}
        </MainContent>
        <Footer />
      </AppContainer>
    </UserContextProvider>
  );
}
