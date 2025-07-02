import { useRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ActionButton from "../Buttons/ActionButton";

import type { LogInDialogProps } from "../../types/interfaces";

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

interface LogInDialogProps {
  onClose: () => void;
}

export default function LogInDialog({ onClose }: LogInDialogProps) {
  const { t } = useTranslation();
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    onClose();
  }
  return (
    <StyledRegisterDialog onSubmit={handleFormSubmit}>
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
        />
      </div>
      <div className="login__field">
        <label className="login__label" htmlFor="repeatePassword">
          {t("repeatePassword")}:
        </label>
        <input
          ref={password}
          className="login__input"
          id="repeatePassword"
          type="password"
          name="password"
          required
          minLength={8}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
          placeholder={t("repeatePassword")}
        />
      </div>
      <span className="password-rules">{t("passwordRules")}</span>
      <ActionButton type="submit" buttonTitle="register" />
    </StyledRegisterDialog>
  );
}
