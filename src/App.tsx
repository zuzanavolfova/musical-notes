import "./styles/main.css";
import styled from "styled-components";

import NoteLearning from "./Pages/NoteLearning";
import HeaderComponent from "./components/Header";
import Footer from "./components/Footer";

import UserContextProvider from "./store/user-context";

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
  return (
    <UserContextProvider>
      <AppContainer>
        <HeaderComponent />
        <MainContent>
          <NoteLearning />
        </MainContent>
        <Footer />
      </AppContainer>
    </UserContextProvider>
  );
}
