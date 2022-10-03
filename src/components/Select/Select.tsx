import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";

import "./Dropdown.scss";

export interface IOptions {
  value: string;
  label: string;
}

interface ISelectProps {
  options: IOptions[];
  isMenuOpen?: boolean;
}

const Dropdown: React.FC<ISelectProps> = ({
  options,
  isMenuOpen
}) => {
  const [value, setValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(isMenuOpen);

  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if  (isFocus) {
        inputRef?.current?.focus();
        setIsOpenMenu(true);
    } else {
        inputRef?.current?.blur();
        setIsOpenMenu(false);
    }
  }, [isFocus])

  const onFocusInput = () => {
    setIsFocus(true);
  };

  console.log("options", options);

  return (
    <>
      <div
        className={cx("dropdown-wrapper-control", {
          "select-control-focused": isFocus,
        })}
        onClick={onFocusInput}
      >
        <div className="select__value-container">
          <div className="select__placeholder">{value ? value : "Select..."}</div>
          <div className="select__input-container" data-value={value}>
            <input
              className="select__input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              ref={inputRef}
            />
          </div>
        </div>
      </div>
      {isOpenMenu && (
        <div className="select__menu">
          <div className="select__menu-list">
            {options.map((item) => {
              return (
                <div
                  className="select__option"
                  key={item.value}
                >
                  {item.label}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
