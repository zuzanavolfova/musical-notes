import { useRef, useState, useEffect } from "react";
import { useContext } from "react";

import { useTranslation } from "react-i18next";
import styled from "styled-components";

import ActionButton from "../Buttons/ActionButton";
import { checkLogIn } from "../../scripts/services/authService";
import LoadingDialog from "./LoadingDialog";

import { UserContext } from "../../store/user-context";
const StyledLogInDialog = styled.form`
  padding: 12px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 550px) {
    gap: 12px;
    align-items: end;
  }

  .login__field {
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 550px) {
      flex-direction: row;
      gap: 10px;
    }
  }
  .login__label {
    margin-right: 6px;
    @media screen and (min-width: 550px) {
      text-align: right;
    }
  }
  .login__input {
    padding: 8px;
    border: 2px solid var(--text-medium-grey);
    border-radius: 4px;
    max-width: 170px;

    @media (prefers-color-scheme: dark) {
      background-color: var(--bkg-dark);
      color: white;
      border: 2px solid var(--bkg-dark);
    }
  }
  .login__input:focus {
    border: 2px solid var(--primary-color-hover);
    outline: none;
    background: #fff;

    @media (prefers-color-scheme: dark) {
      background: white;
      color: var(--text-medium-grey);
    }
  }
  .password-rules {
    font-size: 12px;
    text-align: start;
    white-space: pre-line;
  }
`;

export default function LogInDialog() {
  const { t } = useTranslation();
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loginIsValid, setLoginIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsLogInOpen } = useContext(UserContext);

  useEffect(() => {
    if (userNameRef.current) {
      userNameRef.current.focus();
    }
  }, []);

  async function logIn(event: React.FormEvent) {
    event.preventDefault();

    const username = userNameRef.current?.value.trim();
    const password = passwordRef.current?.value;

    if (!username || !password) return;

    setIsLoading(true);
    setLoginIsValid(true);

    try {
      const isValid = await checkLogIn(username, password);

      if (isValid) {
        setUser(username);
        setIsLogInOpen(false);
      } else {
        setLoginIsValid(false);
        if (userNameRef.current) {
          userNameRef.current.focus();
          userNameRef.current.select();
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginIsValid(false);
      if (userNameRef.current) {
        userNameRef.current.focus();
        userNameRef.current.select();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledLogInDialog
      onSubmit={logIn}
      role="form"
      aria-labelledby="login-title"
      aria-describedby="login-description"
    >
      {isLoading && <LoadingDialog />}
      <div className="login__field">
        <label className="login__label" htmlFor="username">
          {t("Username")}:
        </label>
        <input
          ref={userNameRef}
          className="login__input"
          id="username"
          type="text"
          name="username"
          required
          placeholder={t("Username")}
          aria-invalid={!loginIsValid}
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
        />
      </div>
      <div className="login__field">
        <label className="login__label" htmlFor="password">
          {t("Password")}:
        </label>
        <input
          ref={passwordRef}
          className="login__input"
          id="password"
          type="password"
          name="password"
          required
          placeholder={t("Password")}
          aria-invalid={!loginIsValid}
          autoComplete="current-password"
        />
      </div>
      {!loginIsValid && (
        <span
          style={{ color: "var(--wrong-color)" }}
          role="alert"
          aria-live="polite"
        >
          {t("InvalidUsernameOrPassword")}
        </span>
      )}
      <ActionButton type="submit" buttonTitle="logIn" />
    </StyledLogInDialog>
  );
}
