import { styled } from "styled-components";
import clefLogo from "../assets/clef-clipart.svg";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 6px 4px;
  position: relative;

  @media screen and (min-width: 480px) {
    padding: 16px 18px;
  }
  & h1 {
    font-family: var(--font-decoration);
    text-transform: uppercase;
    color: var(--primary-color);
    margin: 0 auto;
    position: relative;
  }
  & img {
    display: none;

    @media screen and (min-width: 480px) {
      display: block;
      position: absolute;
      left: 8%;
      top: 30px;
      width: 12%;
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
