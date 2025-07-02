import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ActionButton from "../Buttons/ActionButton";

import type { LogInDialogProps } from "../../types/interfaces";

const StyledLogInDialog = styled.form`
  padding: 12px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  .login {
    &__label {
      margin-right: 6px;
    }
    &__input {
      padding: 8px;
      border: 3px solid var(--text-medium-grey);
      border-radius: 4px;
    }
  }
  .login__input:focus {
    border: 3px solid var(--primary-color-hover);
    outline: none;
    background: #fff;
  }
`;

export default function LogInDialog({ onLogInClick }: LogInDialogProps) {
  const { t } = useTranslation();

  return (
    <StyledLogInDialog>
      <div>
        <label className="login__label" htmlFor="username">
          {t("username")}:
        </label>
        <input
          className="login__input"
          id="username"
          type="text"
          name="username"
          required
          placeholder={t("userName")}
        />
      </div>
      <div>
        <label className="login__label" htmlFor="password">
          {t("password")}:
        </label>
        <input
          className="login__input"
          id="password"
          type="password"
          name="password"
          required
          placeholder={t("password")}
        />
      </div>
      <ActionButton
        type="submit"
        buttonTitle="logIn"
        onButtonClick={onLogInClick}
      />
    </StyledLogInDialog>
  );
}
