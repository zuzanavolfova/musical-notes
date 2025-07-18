import { useEffect } from "react";
import { isLoading } from "./useLoadingState";

export function useEscapeKey(
  handleClose: (() => void) | undefined,
  disableEsc: boolean
) {
  useEffect(() => {
    if (disableEsc || !handleClose) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && handleClose && !isLoading()) {
        handleClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose, disableEsc]);
}
