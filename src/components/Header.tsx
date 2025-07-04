import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";

import clefLogo from "../assets/clef-clipart.svg";

import DropdownComponent from "./Buttons/DropdownComponent";

const Header = styled.header`
  width: 100%;
  display: grid;
  grid-template-columns: 60px auto 30px 30px;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 6px 4px;
  position: relative;
  @media screen and (min-width: 480px) {
    padding: 16px 18px;
  }
  @media screen and (min-width: 800px) {
    gap: 40px;
  }
  & h1 {
    grid-column: 2 / 3;
    justify-self: center;
    font-family: var(--font-decoration);
    text-transform: uppercase;
    color: var(--primary-color);
    margin: 0 auto;
    position: relative;
    @media screen and (min-width: 480px) {
      font-size: 42px;
    }
  }
  .clef-logo {
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
  .user-component {
    grid-column: 3 / 4;
    margin: 0;
    & button {
      background-color: white;
      box-shadow: none;
      transition: all 0.3s ease-in-out;
    }
  }
  .locale-component {
    justify-self: center;
    margin: 0;
    & button {
      background-color: white;
      box-shadow: none;
      border-bottom: 2px solid var(--primary-color);
      padding: 4px;
      transition: all 0.3s ease-in-out;
      @media (prefers-color-scheme: dark) {
        color: var(--secondary-color);
      }
      &:hover {
        background-color: var(--primary-color);
        color: white;
      }
      &:focus,
      &:active {
        background-color: var(--primary-color);
        border: 1px solid var(--primary-color);
        box-shadow: none;
        color: white;
      }
      &.dropdown__item {
        border: none;
      }
    }
  }
`;

export default function HeaderComponent() {
  const { t, i18n } = useTranslation();
  const localeItems = [
    { title: "CS", id: "cs" },
    { title: "EN", id: "en" },
  ];
  const getLocaleTitle = (lng: string) =>
    localeItems.find((item) => item.id === lng)?.title || "CS";

  const [locale, setLocale] = useState(() => getLocaleTitle(i18n.language));

  useEffect(() => {
    setLocale(getLocaleTitle(i18n.language));
  }, [i18n.language]);

  const handleLocaleChange = (selectedItem: string) => {
    setLocale(selectedItem);
    const found = localeItems.find((item) => item.title === selectedItem);
    if (found) {
      i18n.changeLanguage(found.id);
    }
  };

  return (
    <Header role="banner" aria-label="Musical Notes header">
      <img
        className="clef-logo"
        src={clefLogo}
        alt="Treble clef logo"
        aria-hidden="true"
      />
      <h1 tabIndex={0}>{t("musical-notes")}</h1>
      <DropdownComponent
        buttonTitle={locale}
        items={localeItems}
        onItemSelect={handleLocaleChange}
        className="locale-component"
      />
    </Header>
  );
}
