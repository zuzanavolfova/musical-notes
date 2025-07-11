import styled from "styled-components";
import type { UserManagementDialogProps } from "./../../types/interfaces";

import ActionButton from "./../Buttons/ActionButton";

const UserManagementDialogStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
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
      <div>{children}</div>
      <div>
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
