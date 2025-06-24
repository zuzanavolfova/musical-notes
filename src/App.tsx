import "./styles/main.css";
import styled from "styled-components";

import Home from "./Pages/Home";
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
  return (
    <AppContainer>
      <HeaderComponent />
      <MainContent>
        <Home />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}
