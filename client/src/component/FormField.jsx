import React from 'react';


const FormField = ({ theme, inputType, placeHolder, labelName, isTextArea, value, handleChange }) => {
  return (
    <label  className='flex-1 w-full flex flex-col'>
      {labelName && (
        <span className={`font-epilogue font-medium text-[14px] capitalize leading-[22px] ${theme? 'text-black':'text-grayText'}  mb-[10px]`}>{labelName}</span>
      )}
      {isTextArea ? (
        <textarea cols="30" rows="5"
        required
        value={value}
        onChange={handleChange}
        className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] bg-transparent ${theme?'border-white border-2':'border-[#3a3a43]'}  font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]`}/>
      ) : (
        <input 
        type={inputType}
        required
        value={value}
        placeholder={placeHolder}
        onChange={handleChange}
        step={0.1}
        className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] bg-transparent ${theme?'border-white placeholder:text-white':'border-[#3a3a43] placeholder:text-[#4b5264] '}  font-epilogue text-white text-[14px] rounded-[10px] sm:min-w-[300px]`}
        />
      )}
    </label>
  )
}

export default FormField