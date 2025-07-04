import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import ActionButton from "../Buttons/ActionButton";
import type { RegisterDialogProps } from "../../types/interfaces";

import { registerUser } from "./../../scripts/services/authService";

const StyledRegisterDialog = styled.form`
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

export default function RegisterDialog({ onClose }: RegisterDialogProps) {
  const { t } = useTranslation();
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const repeatPassword = useRef<HTMLInputElement>(null);
  const [validPassword, setValidPassword] = useState(true);
  const [validUserName, setValidUserName] = useState(true);

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (password.current?.value !== repeatPassword.current?.value) {
      setValidPassword(false);
      return;
    }

    if (!validUserName && userName.current?.value) {
      return;
    }

    try {
      await registerUser({
        newUserName: userName.current!.value,
        newPassword: password.current!.value,
      });
      //TODO waiting dialog
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("User already exists")) {
          setValidUserName(false);
        } else {
          alert(error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  return (
    <StyledRegisterDialog
      onSubmit={handleFormSubmit}
      role="form"
      aria-labelledby="register-title"
    >
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
          autoComplete="username"
          onFocus={() => setValidUserName(true)}
        />
      </div>
      <div className="login__field">
        <label className="login__label" htmlFor="password1">
          {t("Password")}:
        </label>
        <input
          ref={password}
          className="login__input"
          id="password1"
          type="password"
          name="password"
          required
          minLength={8}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
          placeholder={t("Password")}
          title={t("passwordRules")}
          aria-describedby="password-rules"
          autoComplete="new-password"
          onFocus={() => setValidPassword(true)}
        />
      </div>
      <div className="login__field">
        <label className="login__label" htmlFor="repeatePassword">
          {t("repeatePassword")}:
        </label>
        <input
          ref={repeatPassword}
          className="login__input"
          id="repeatePassword"
          type="password"
          name="password"
          required
          minLength={8}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
          placeholder={t("repeatePassword")}
          title={t("passwordRules")}
          aria-describedby="password-rules"
          onFocus={() => setValidPassword(true)}
        />
      </div>
      {validPassword ? (
        <span className="password-rules">{t("passwordRules")}</span>
      ) : (
        <span style={{ color: "var(--wrong-color)" }}>
          {t("passwordsNotMatch")}
        </span>
      )}
      {!validUserName && (
        <span style={{ color: "var(--wrong-color)" }}>
          {t("userNamesExists")}
        </span>
      )}
      <ActionButton type="submit" buttonTitle="register" />
    </StyledRegisterDialog>
  );
}
