import "./styles/main.css";
import styled from "styled-components";

import { useState } from "react";

import NoteLearning from "./Pages/NoteLearning";
import HeaderComponent from "./components/Header";
import Footer from "./components/Footer";

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
  const [isLogIn, setIsLogIn] = useState(false);
  const [logInDialogOpen, setIsLogInOpen] = useState(false);
  
  return (
    <AppContainer>
      <HeaderComponent
        isLogIn={isLogIn}
        logInOpen={logInDialogOpen}
        registerDialogOpen={registerDialogOpen}
        setIsLogIn={setIsLogIn}
        setIsLogInOpen={setIsLogInOpen}
        setIsRegisterOpen={setIsRegisterOpen}
      />
      <MainContent>
        <NoteLearning isLogIn={isLogIn} setIsLogInOpen={setIsLogInOpen} />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}
