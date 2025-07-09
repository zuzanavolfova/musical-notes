import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ActionButton from "../Buttons/ActionButton";
import { checkLogIn } from "../../scripts/services/authService";

import type { LogInDialogProps } from "../../types/interfaces";

const StyledLogInDialog = styled.form`
  padding: 12px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 12px;
  .login__field {
    display: flex;
    gap: 10px;
  }
  .login__label {
    margin-right: 6px;
    text-align: right;
  }
  .login__input {
    padding: 8px;
    border: 3px solid var(--text-medium-grey);
    border-radius: 4px;
  }
  .login__input:focus {
    border: 3px solid var(--primary-color-hover);
    outline: none;
    background: #fff;
  }
  .password-rules {
    font-size: 12px;
    text-align: start;
    white-space: pre-line;
  }
`;

export default function LogInDialog({ onLogInClick }: LogInDialogProps) {
  const { t } = useTranslation();
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [loginIsValid, setLoginIsValid] = useState(true);

  async function logIn(event: React.FormEvent) {
    event.preventDefault();
    if (onLogInClick && userName.current && password.current) {
      const isValid = await checkLogIn(
        userName.current.value,
        password.current.value
      );
      if (isValid) {
        onLogInClick(userName.current.value);
        setLoginIsValid(true);
      } else {
        setLoginIsValid(false);
      }
    }
  }

  return (
    <StyledLogInDialog onSubmit={logIn}>
      <div className="login">
        <label className="login__label" htmlFor="username">
          {t("Username")}:
        </label>
        <input
          ref={userName}
          className="login__input"
          id="username"
          type="text"
          name="username"
          required
          placeholder={t("Username")}
        />
      </div>
      <div className="login__field">
        <label className="login__label" htmlFor="password">
          {t("Password")}:
        </label>
        <input
          ref={password}
          className="login__input"
          id="password"
          type="password"
          name="password"
          required
          placeholder={t("Password")}
        />
      </div>
      {!loginIsValid && (
        <span style={{ color: "var(--wrong-color)" }}>
          {t("InvalidUsernameOrPassword")}
        </span>
      )}
      <ActionButton type="submit" buttonTitle="logIn" />
    </StyledLogInDialog>
  );
}
