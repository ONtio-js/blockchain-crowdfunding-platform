import React from 'react'

const CustomButton = ({ btnType, style, handleClick, title }) => {
    return (
        <button
            type={btnType}
            className={`${style} font-epilogue font-semibold text-[16px] leading-[26px] px-4 min-h-[52px] text-white rounded-[10px]`}
            onClick={handleClick}>
            {title}
        </button>
    )
}

export default CustomButton