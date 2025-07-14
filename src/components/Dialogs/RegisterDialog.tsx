import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import ActionButton from "../Buttons/ActionButton";
import LoadingDialog from "./LoadingDialog";

import type { RegisterDialogProps } from "../../types/interfaces";

import { registerUser } from "./../../scripts/services/authService";

const StyledRegisterDialog = styled.form`
  padding: 12px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 550px) {
    align-items: end;
    gap: 12px;
  }
  .register__field {
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 550px) {
      flex-direction: row;
      gap: 10px;
    }
  }
  .register__label {
    margin-right: 6px;
    @media screen and (min-width: 550px) {
      text-align: right;
    }
  }
  .register__input {
    padding: 8px;
    border: 2px solid var(--text-medium-grey);
    border-radius: 4px;
  }
  .register__input:focus {
    border: 2px solid var(--primary-color-hover);
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
  const [isLoading, setIsLoading] = useState(false);

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (password.current?.value !== repeatPassword.current?.value) {
      setValidPassword(false);
      return;
    }

    if (!validUserName && userName.current?.value) {
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({
        newUserName: userName.current!.value,
        newPassword: password.current!.value,
      });
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledRegisterDialog
      onSubmit={handleFormSubmit}
      role="form"
      aria-labelledby="register-title"
    >
      {isLoading && <LoadingDialog message="pleaseWait" />}
      <div className="register__field">
        <label className="register__label" htmlFor="username">
          {t("Username")}:
        </label>
        <input
          ref={userName}
          className="register__input"
          id="username"
          type="text"
          name="username"
          required
          placeholder={t("Username")}
          autoComplete="username"
          onFocus={() => setValidUserName(true)}
        />
      </div>
      <div className="register__field">
        <label className="register__label" htmlFor="password1">
          {t("Password")}:
        </label>
        <input
          ref={password}
          className="register__input"
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
      <div className="register__field">
        <label className="login__label" htmlFor="repeatePassword">
          {t("repeatePassword")}:
        </label>
        <input
          ref={repeatPassword}
          className="register__input"
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
