import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import type { DropdownProps } from "./../../types/interfaces";

const DropdownStyled = styled.div`
  position: relative;
  display: inline-block;
  margin: 12px;
`;

const DropdownButton = styled.button`
  background-color: white;
  box-shadow: 1px 2px 6px rgba(124, 124, 124, 0.5);
  border: 1px solid transparent;
  cursor: pointer;
  padding: 8px 12px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: rgb(212, 212, 212);
  }
  &:focus,
  &:active {
    background-color: var(--secondary-color);
    border: 1px solid var(--secondary-color);
    box-shadow: none;
    color: white;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  background: white;
  min-width: 120px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  &:hover,
  &:focus {
    background: var(--secondary-color, #eee);
    outline: none;
  }
`;

export default function DropdownComponent({
  buttonTitle,
  items,
  onItemSelect,
  ...props
}: DropdownProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function onItemClick(value: string) {
    setIsOpen(false);
    onItemSelect?.(value);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownStyled ref={ref} {...props}>
      <DropdownButton
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {t(buttonTitle)}
      </DropdownButton>
      {isOpen && (
        <DropdownMenu role="listbox">
          {items.map((item) => (
            <DropdownItem
              key={item.id ?? item.title}
              type="button"
              role="option"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onItemClick(item.title);
              }}
            >
              {t(item.title)}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownStyled>
  );
}
