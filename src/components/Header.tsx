import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import { useContext } from "react";

import clefLogo from "../assets/clef-clipart.svg";
import userIcon from "../assets/user.svg";

import DropdownComponent from "./Buttons/DropdownComponent";
import Dialog from "./Dialogs/Dialog";
import LogInDialog from "./Dialogs/LogInDialog";
import RegisterDialog from "./Dialogs/RegisterDialog";

import { UserContext } from "../store/user-context";

const Header = styled.header<{ $isLogged?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
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
    margin: 0;
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
  .header__buttons {
    grid-column: 3 / 4;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .user-component {
    margin: 0;
    & .dropdown__menu {
      left: -20px;
      @media screen and (min-width: 550px) {
        left: 0;
      }
    }
    & button {
      background-color: white;
      box-shadow: none;
      padding: 6px 6px;
      border: ${({ $isLogged }) =>
        $isLogged ? "2px solid var(--primary-color)" : "2px solid white"};
      border-radius: 50%;
      transition: all 0.3s ease-in-out;

      @media (prefers-color-scheme: dark) {
        background-color: white;
        border: ${({ $isLogged }) =>
          $isLogged
            ? "2px solid var(--primary-color)"
            : "2px solid var(--bkg-dark)"};
        color: ${({ $isLogged }) =>
          $isLogged ? "white" : "var(--secondary-color)"};
      }

      &:not(:disabled):hover {
        background-color: var(--primary-color);
        color: white;
      }
      &:disabled {
        cursor: default;
        border: 2px solid transparent !important;
        background-color: white !important;

        @media (prefers-color-scheme: dark) {
          background-color: white !important;
          color: var(--text-light-grey);
        }

        &:focus,
        &:active {
          background-color: white !important;
          border: 2px solid transparent !important;
          box-shadow: none;

          @media (prefers-color-scheme: dark) {
            background-color: white !important;
          }
        }
      }
      &:focus,
      &:active {
        background-color: var(--primary-color);
        border: 1px solid var(--primary-color);
        box-shadow: none;
        color: white;
      }
      &:disabled {
        cursor: default;
        &:focus,
        &:active {
          background-color: white;
          border: 1px solid white;
          box-shadow: none;

          @media (prefers-color-scheme: dark) {
            background-color: white;
            border: 1px solid var(--bkg-dark);
          }
        }
      }

      &.dropdown__item {
        border: none;
        border-radius: 0;
        padding: 8px;
      }
    }
  }

  .locale-component {
    margin: 0;
    min-width: fit-content;

    & button {
      background-color: white;
      box-shadow: none;
      border-bottom: 2px solid var(--primary-color);
      padding: 4px 4px;
      min-width: 30px;
      transition: all 0.3s ease-in-out;

      @media (prefers-color-scheme: dark) {
        background-color: white;
        border-bottom: 6px solid var(--primary-color);

        color: var(--secondary-color);
      }

      &:hover {
        background-color: var(--primary-color);
        color: white;
      }

      &:focus,
      &:active {
        background-color: var(--primary-color);
        border: none;
        box-shadow: none;
        color: white;
        @media (prefers-color-scheme: dark) {
          border-bottom: 6px solid var(--primary-color);
        }
      }

      &.dropdown__item {
        border: none;
        padding: 8px;
      }
    }
  }
`;

export default function HeaderComponent() {
  const { t, i18n } = useTranslation();
  const {
    setIsLogInOpen,
    setIsRegisterOpen,
    setIsLogin,
    setUserName,
    logInDialogOpen,
    registerDialogOpen,
    isLogin,
    userName,
  } = useContext(UserContext);

  const localeItems = [
    { title: "CS", id: "cs" },
    { title: "EN", id: "en" },
  ];
  const userItems = [
    {
      title: isLogin && userName ? userName : t("noUser"),
      id: 0,
      disabled: true,
    },
    {
      title: isLogin ? "logOut" : "logIn",
      id: 1,
      onClick: () => {
        if (!isLogin) setIsLogInOpen(true);
        else logOut();
      },
    },
    {
      title: t("newRegister"),
      id: 2,
      onClick: () => {
        setIsRegisterOpen(true);
      },
    },
  ];

  const getLocaleTitle = (lng: string) =>
    localeItems.find((item) => item.id === lng)?.title || "CS";

  const [locale, setLocale] = useState(() => getLocaleTitle(i18n.language));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  const logOut = () => {
    localStorage.removeItem("userName");
    setIsLogin(false);
    setUserName("");
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getDialogSize = () => {
    if (windowWidth < 480) return "S";
    if (windowWidth > 480) return "M";
  };

  return (
    <Header role="banner" aria-label="Musical Notes header" $isLogged={isLogin}>
      <img
        className="clef-logo"
        src={clefLogo}
        alt="Treble clef logo"
        aria-hidden="true"
      />
      <h1 tabIndex={0}>{t("musical-notes")}</h1>
      <div className="header__buttons">
        <DropdownComponent
          buttonIcon={userIcon}
          buttonDescription={t("userManagement")}
          items={userItems}
          className="user-component"
        />
        <DropdownComponent
          buttonTitle={locale}
          items={localeItems}
          onItemSelect={handleLocaleChange}
          className="locale-component"
        />
      </div>
      {logInDialogOpen && (
        <Dialog
          dialogTitle={t("logIn")}
          size={getDialogSize()}
          handleClose={() => setIsLogInOpen(false)}
        >
          <LogInDialog></LogInDialog>
        </Dialog>
      )}
      {registerDialogOpen && (
        <Dialog
          dialogTitle={t("newRegister")}
          size={getDialogSize()}
          handleClose={() => setIsRegisterOpen(false)}
        >
          <RegisterDialog onClose={() => setIsRegisterOpen(false)} />
        </Dialog>
      )}
    </Header>
  );
}
