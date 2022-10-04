import React, { Ref } from "react";
import cx from "classnames"

import { IOptions } from "../Select";

import "./Option.scss";

interface IOptionComponentProps {
    value: string;
    label: string;
    selectedValue?: IOptions;
    innerRef: Ref<HTMLDivElement>;
    handleClickSelectValue: (selectedValue: IOptions, focusedIndex: number) => void;
    focusedIndex: number;
}

const Option: React.FC<IOptionComponentProps> = ({
    value, label, selectedValue, innerRef, handleClickSelectValue, focusedIndex
}) => {
    return (
        <div
            className={
                cx("select__option", {
                    "is-selected": value === selectedValue?.value
                })
            }
            key={value}
            tabIndex={-1}
            ref={innerRef}
            onClick={() => handleClickSelectValue({ value, label }, focusedIndex)}
        >
            {label}
        </div>
    )
};

export default Option;
