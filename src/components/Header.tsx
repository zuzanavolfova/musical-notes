import { styled } from "styled-components";
import clefLogo from "../assets/clef-clipart.svg";
import { useTranslation } from "react-i18next";
import DropdownComponent from "./Buttons/DropdownComponent";
import { useState } from "react";

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
    @media screen and (min-width: 480px) {
      font-size: 42px;
    }
  }
  & img {
    display: none;
    @media screen and (min-width: 550px) {
      display: block;
      position: absolute;
      left: 8%;
      top: 36px;
      width: 10%;
      z-index: 10;
    }
  }
`;

export default function HeaderComponent() {
  const { t, i18n } = useTranslation();
  const localeItems = [
    { title: "CS", id: "cs" },
    { title: "EN", id: "en" },
  ];
  const [locale, setLocale] = useState("CS");
  const handleLocaleChange = (selectedItem: string) => {
    setLocale(selectedItem);
    const found = localeItems.find((item) => item.title === selectedItem);
    if (found) {
      i18n.changeLanguage(found.id);
    }
  };

  return (
    <Header role="banner" aria-label="Musical Notes header">
      <img src={clefLogo} alt="Treble clef logo" aria-hidden="true" />
      <h1 tabIndex={0}>{t("musical-notes")}</h1>
      <DropdownComponent
        buttonTitle={locale}
        items={localeItems}
        onSelect={handleLocaleChange}
      />
    </Header>
  );
}
