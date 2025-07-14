export function handleClickOutside<T extends HTMLElement>(
  event: MouseEvent,
  ref: React.RefObject<T | null>,
  setIsOpenFunction?: (open: boolean) => void
) {
  if (
    ref.current &&
    event.target &&
    !ref.current.contains(event.target as Node)
  ) {
    if (typeof setIsOpenFunction === "function") {
      setIsOpenFunction(false);
    }
  }
}
