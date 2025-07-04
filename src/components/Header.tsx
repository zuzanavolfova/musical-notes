import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";

import clefLogo from "../assets/clef-clipart.svg";
import userIcon from "../assets/user.svg";

import DropdownComponent from "./Buttons/DropdownComponent";
import Dialog from "./Dialogs/Dialog";
import LogInDialog from "./Dialogs/LogInDialog";
import RegisterDialog from "./Dialogs/RegisterDialog";

const Header = styled.header<{ $isLogged?: boolean }>`
  width: 100%;
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
    & button {
      background-color: white;
      box-shadow: none;
      padding: 6px 6px;
      border: ${({ $isLogged }) =>
        $isLogged ? "2px solid var(--primary-color)" : "2px solid white"};
      border-radius: 50%;
      transition: all 0.3s ease-in-out;
      @media (prefers-color-scheme: dark) {
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

        &:focus,
        &:active {
          background-color: white !important;
          border: 2px solid transparent !important;
          box-shadow: none;
        }
      }
      */ &:focus,
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
  const [isLogged, setIsLogged] = useState(false);
  const [logInDialogOpen, setIsLogInDialogOpen] = useState(false);
  const [registerDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const localeItems = [
    { title: "CS", id: "cs" },
    { title: "EN", id: "en" },
  ];
  const userItems = [
    {
      title: isLogged ? userName : t("noUser"),
      id: 0,
      disabled: true,
    },
    {
      title: isLogged ? "logOut" : "logIn",
      id: 1,
      onClick: () => {
        if (!isLogged) setIsLogInDialogOpen(true);
        else logOut();
      },
    },
    {
      title: t("newRegister"),
      id: 2,
      onClick: () => {
        setIsRegisterDialogOpen(true);
      },
    },
  ];
  const [users, setUsers] = useState<any[]>([]);

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

  const onLogInClick = (user: string) => {
    setIsLogged(true);
    setUserName(user);
    console.log("Logged user:", userName);
    setIsLogInDialogOpen(false);
  };

  const logOut = () => {
    setIsLogged(false);
  };

  const register = (newUserName: string, newPassword: string) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { newUserName: newUserName, newPassword: newPassword },
    ]);
  };

  useEffect(() => {
    console.log("Users:", users);
  }, [users]);

  return (
    <Header
      role="banner"
      aria-label="Musical Notes header"
      $isLogged={isLogged}
    >
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
          items={userItems}
          onItemSelect={() =>
            !isLogged ? setIsLogInDialogOpen(true) : logOut()
          }
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
          handleClose={() => setIsLogInDialogOpen(false)}
        >
          <LogInDialog onLogInClick={onLogInClick}></LogInDialog>
        </Dialog>
      )}
      {registerDialogOpen && (
        <Dialog
          dialogTitle={t("newRegister")}
          handleClose={() => setIsRegisterDialogOpen(false)}
        >
          <RegisterDialog
            onClose={() => setIsRegisterDialogOpen(false)}
            register={({ newUserName, newPassword }) =>
              register(newUserName, newPassword)
            }
          />
        </Dialog>
      )}
    </Header>
  );
}
