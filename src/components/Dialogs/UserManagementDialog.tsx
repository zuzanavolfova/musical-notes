import styled from "styled-components";
import { useTranslation } from "react-i18next";

import type { UserManagementDialogProps } from "../../types";

import ActionButton from "./../Buttons/ActionButton";

const UserManagementDialogStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  .message {
    padding: 0 20px;
    line-height: 1.5;
  }
  .action-buttons {
    display: flex;
    flex-direction: column;
  }
`;

export default function UserManagementDialog({
  onLogIn,
  onRegister,
  onClose,
  children,
}: UserManagementDialogProps) {
  const { t } = useTranslation();

  function onLogInClick() {
    onLogIn();
    onClose();
  }

  function onRegisterClick() {
    onRegister();
    onClose();
  }

  return (
    <UserManagementDialogStyled
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-management-title"
      aria-describedby="user-management-description"
      tabIndex={-1}
    >
      <div className="message" aria-live="polite">
        {children}
      </div>
      <div
        className="action-buttons"
        role="group"
        aria-label={t("logInOptions")}
      >
        <ActionButton
          buttonTitle="logIn"
          type="button"
          onClick={onLogInClick}
          aria-describedby="login-description"
        />

        <ActionButton
          buttonTitle="register"
          type="button"
          onClick={onRegisterClick}
          aria-describedby="register-description"
        />
      </div>
    </UserManagementDialogStyled>
  );
}
