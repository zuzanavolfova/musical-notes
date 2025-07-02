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
`;

export default function LogInDialog({ onLogInClick }: LogInDialogProps) {
  const { t } = useTranslation();

  return (
    <StyledLogInDialog>
      <div>
        <label htmlFor="username">{t("username")}:</label>
        <input
          id="username"
          type="text"
          name="username"
          required
          placeholder={t("userName")}
        />
      </div>
      <div>
        <label htmlFor="password">{t("password")}:</label>
        <input
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
