import { styled } from "styled-components";
import clefLogo from "../assets/clef-clipart.svg";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 6px 4px;
  @media screen and (min-width: 768px) {
    padding: 16px 18px;
  }
  & h1 {
    font-family: var(--font-decoration);
    text-transform: uppercase;
  }
  & img {
    display: none;

    @media screen and (min-width: 550px) {
      display: block;
      position: absolute;
      left: 8%;
      top: 36px;
      width: 10%;
    }
  }
`;

export default function HeaderComponent() {
  return (
    <Header>
      <img src={clefLogo} alt="Logo treble clef" />
      <h1>Musical Notes</h1>
    </Header>
  );
}
