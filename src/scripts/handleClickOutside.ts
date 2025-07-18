export function handleClickOutside<T extends HTMLElement>(
  event: MouseEvent,
  ref: React.RefObject<T | null>,
  onOutsideClick?: (() => void) | ((open: boolean) => void)
): void {
  if (
    ref.current &&
    event.target &&
    !ref.current.contains(event.target as Node)
  ) {
    if (typeof onOutsideClick === "function") {
      if (onOutsideClick.length === 0) {
        (onOutsideClick as () => void)();
      } else {
        (onOutsideClick as (open: boolean) => void)(false);
      }
    }
  }
}
