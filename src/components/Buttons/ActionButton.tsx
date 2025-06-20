import { styled } from "styled-components";

const StyledActionButton = styled.button``;

interface ActionButtonProps {
  buttonTitle: string;
  onButtonClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function ActionButton({
  buttonTitle,
  onButtonClick,
  type = "button",
  disabled = false,
}: ActionButtonProps) {
  return (
    <StyledActionButton
      onClick={() => onButtonClick}
      type={type}
      disabled={disabled}
    >
      {buttonTitle}
    </StyledActionButton>
  );
}
