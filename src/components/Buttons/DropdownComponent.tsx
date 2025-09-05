import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import { handleClickOutside } from "../../scripts/handleClickOutside";

import type { DropdownProps } from "./../../types/interfaces";

import { useEscapeKey } from "../../hooks/useEscape";

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

  @media (prefers-color-scheme: dark) {
    background-color: var(--bkg-dark);
    color: var(--dark-theme-text-color);
    box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.5);
  }

  &:hover {
    background-color: rgb(212, 212, 212);

    @media (prefers-color-scheme: dark) {
      background-color: var(--bkg-medium);
    }
  }
  &:focus,
  &:active {
    background-color: var(--secondary-color);
    border: 1px solid var(--secondary-color);
    box-shadow: none;
    color: white;
  }
  .dropdown__title__icon {
    height: 20px;
    padding: "0 8px";
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  background: white;
  min-width: 120px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;

  @media (prefers-color-scheme: dark) {
    background: var(--bkg-dark);
    color: var(--dark-theme-text-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

const DropdownItem = styled.button<{ $isFocused?: boolean }>`
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;

  @media (prefers-color-scheme: dark) {
    color: var(--dark-theme-text-color);
  }

  &:hover,
  &:focus {
    background: var(--secondary-color, #eee);
    outline: none;
    color: white;

    @media (prefers-color-scheme: dark) {
      background: var(--bkg-medium);
      color: var(--dark-theme-text-color);
    }
  }
`;

export default function DropdownComponent({
  buttonTitle = null,
  buttonIcon = null,
  buttonDescription = null,
  items,
  onItemSelect,
  ...props
}: DropdownProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  function onItemClick(value: string) {
    setIsOpen(false);
    onItemSelect?.(value);
  }

  useEscapeKey(() => setIsOpen(false), false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
          break;
        case "Enter":
        case " ": {
          event.preventDefault();
          const focusedItem = items[focusedIndex];
          if (focusedItem && !focusedItem.disabled) {
            if (typeof focusedItem.onClick === "function") {
              focusedItem.onClick();
            } else {
              onItemClick(focusedItem.title);
            }
          }
          break;
        }
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, focusedIndex, items]);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      handleClickOutside(event, ref, setIsOpen);
    }
    if (isOpen) {
      document.addEventListener("mousedown", onDocumentClick);
    }
    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
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
        {buttonIcon && (
          <img
            src={buttonIcon}
            alt={buttonDescription ?? ""}
            className="dropdown__title__icon"
          ></img>
        )}
        {buttonTitle ? t(buttonTitle) : ""}
      </DropdownButton>
      {isOpen && (
        <DropdownMenu role="listbox" className="dropdown__menu">
          {items.map((item, index) => (
            <DropdownItem
              key={item.id ?? item.title}
              type="button"
              role="option"
              tabIndex={focusedIndex === index ? 0 : -1}
              disabled={item.disabled ?? false}
              $isFocused={focusedIndex === index}
              onClick={(e) => {
                e.stopPropagation();
                if (item.disabled) return;
                if (typeof item.onClick === "function") {
                  item.onClick();
                } else {
                  onItemClick(item.title);
                }
                setIsOpen(false);
              }}
              className="dropdown__item"
            >
              {t(item.title)}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownStyled>
  );
}
