import styled from "styled-components";
import type { UserManagementDialogProps } from "./../../types/interfaces";

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
  function onLogInClick() {
    onLogIn();
    onClose();
  }

  function onRegisterClick() {
    onRegister();
    onClose();
  }

  return (
    <UserManagementDialogStyled>
      <div className="message">{children}</div>
      <div className="action-buttons">
        <ActionButton
          buttonTitle="logIn"
          type="button"
          onClick={onLogInClick}
        />

        <ActionButton
          buttonTitle="register"
          type="button"
          onClick={onRegisterClick}
        />
      </div>
    </UserManagementDialogStyled>
  );
}
