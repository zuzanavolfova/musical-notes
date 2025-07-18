import { useEffect, type RefObject } from "react";
import { handleClickOutside } from "../scripts/handleClickOutside";

function isLoading(): boolean {
  return !!document.querySelector("[data-loading='true']");
}

export function useClickOutside<T extends HTMLElement>(
  handleClose: (() => void) | undefined,
  ref: RefObject<T | null>,  
  disableOutsideClick: boolean
): void {
  useEffect(() => {
    if (disableOutsideClick || !handleClose) return;

    function handleOutsideClickEvent(event: MouseEvent) {
      if (isLoading()) return;

      handleClickOutside(event, ref, handleClose);
    }

    document.addEventListener("mousedown", handleOutsideClickEvent);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClickEvent);
    };
  }, [handleClose, ref, disableOutsideClick]);
}
