import React, { useState, useRef, useEffect, useCallback, KeyboardEventHandler } from "react";
import cx from "classnames";

import Option from "./Option/Option";

import useOnClickOutside from "../../shared/hooks/useOnClickOutside";
import useEventListener from "../../shared/hooks/useEventListener";
import { scrollIntoView } from "../../utils/utils";

import "./Dropdown.scss";
// import { scrollIntoView } from "../../utils/utils";

export interface IOptions {
  value: string;
  label: string;
}

interface ISelectProps {
  options: IOptions[];
  isMenuOpen?: boolean;
}

const Dropdown: React.FC<ISelectProps> = ({ options, isMenuOpen }) => {
  const [value, setValue] = useState<IOptions>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(isMenuOpen);
  const [focusedIndex, setFocusIndex] = useState<number>(0);
  const [optionsState, setOptionsState] = useState<IOptions[]>([]);

  const selectRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>();
  const documentRef = useRef<Document>(document);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const focusedOptionRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setOptionsState(options);
  }, [options]);

  const handleClickOutside = useCallback(() => {
    setIsOpenMenu(false);
    setIsFocus(false);
  }, []);

  const handleEscapePress = (e: KeyboardEvent) => {
    console.log("e.key", e.key);
    if (e.key === "Escape") {
      setIsOpenMenu(false);
      setIsFocus(false);
    } else if (e.key === "ArrowDown") {
      menuRef?.current?.focus();
    }
  };

  const handlEnterPressSelectValue = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearchValue("");
      setValue(optionsState[focusedIndex]);
      setIsOpenMenu(false);
    }
  }, [focusedIndex, optionsState])

  const handleClickSelectValue = useCallback((selectedValue: IOptions, focusedIndex: number) => {
      setValue(selectedValue);
      setIsOpenMenu(false);
      setFocusIndex(focusedIndex);
  }, []);

  const handleClickInput = useCallback(() => {
    setIsOpenMenu(isOpenMenu => !isOpenMenu);
  }, []);

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    switch (e.key) {
      case "ArrowDown":
        setFocusIndex(focusedIndex + 1);
        scrollIntoView(menuRef.current, focusedOptionRef.current[focusedIndex]);
        break;
      case "ArrowUp":
        if (focusedIndex === 0) return;
        setFocusIndex(focusedIndex - 1);
        break;
      default:
        return;
    }
  }

  const onKeyDownInput: KeyboardEventHandler<HTMLDivElement> = (e) => {
     if (e.key === "Backspace") {
      setSearchValue("");
      setValue(null);
      setOptionsState(options);
    }
  }

  const onFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    const optionsClone: IOptions[] = [...optionsState];
    const filteredOptions: IOptions[] = optionsClone.filter(country => {
      return country.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    setOptionsState(filteredOptions);
  }

  const handleClickInside = () => {
    // Your custom logic here
    console.log("clicked inside");
  };

  useOnClickOutside(selectRef, handleClickOutside);
  useEventListener("keydown", handleEscapePress, documentRef);
  useEventListener("keydown", handlEnterPressSelectValue);

  useEffect(() => {
    if (isFocus) {
      inputRef?.current?.focus();
      setIsOpenMenu(true);
    } else {
      inputRef?.current?.blur();
      setIsOpenMenu(false);
    }
  }, [isFocus]);

  useEffect(() => {
    if (isOpenMenu) {
      if (!value) {
        setFocusIndex(0);
      }
      // menuRef?.current?.focus();
      inputRef?.current?.focus();
    }
  }, [isOpenMenu, options, value]);

  const onFocusInput = () => {
    setIsFocus(true);
  };

  return (
    <div ref={selectRef} onClick={handleClickInside}>
      <div
        className={cx("dropdown-wrapper-control", {
          "select-control-focused": isFocus,
        })}
        onClick={onFocusInput}
      >
        <div className="select__value-container">
          <div className="select__placeholder">
            {value?.label ? value?.label : searchValue ? searchValue : "Select..."}
          </div>
          <div className="select__input-container" data-value={value}>
            <input
              className="select__input"
              value={searchValue ? searchValue : value?.label}
              onChange={onFilterValue}
              onKeyDown={onKeyDownInput}
              onClick={handleClickInput}
              ref={inputRef}
            />
          </div>
        </div>
      </div>
      {isOpenMenu && (
        <div
          className="select__menu"
          onKeyDown={onKeyDown}
          tabIndex={0}
          ref={menuRef}
        >
          <div
            className="select__menu-list"
          >
            {optionsState.map((item, index) => {
              return (
                <Option
                  value={item.value} 
                  label={item.label}
                  selectedValue={optionsState[focusedIndex]}
                  innerRef={(ref) => focusedOptionRef.current[index] = ref}
                  handleClickSelectValue={handleClickSelectValue}
                  focusedIndex={focusedIndex}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
