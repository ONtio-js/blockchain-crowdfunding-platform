import React from 'react'
import { tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';
import { useStateContext } from '../context';

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
    deadline = daysLeft(deadline);
    const {theme} = useStateContext();
    return (
        <div className={`sm:w-[288px] w-[90vw] rounded-[15px] ${theme?'bg-dirtyWhite border-2 border-white p-1':'bg-[#1c1c24]'}  cursor-pointer`} onClick={handleClick}>
            <img src={image} alt="" srcSet="" className='w-full h-[158px] object-cover rounded-[15px]' />
            <div className='flex flex-col p-4'>
                <div className='flex  items-center mb-[18px]'>
                    <img src={tagType} alt="tag" className='w-[17px] h-[17px] object-contain' />
                    <p className={`font-epilogue font-medium ml-[12px] mt-[12px] text-[12px] text-[#808191] capitalize`}>category</p>
                </div>
                <div className='block'>
                    <h3 className={`capitalize font-semibold font-epilogue ${theme? 'text-green-400':'text-white'} text-left text-[16px] laeding-[26px] truncate`}>{title}</h3>
                    <p className={`mt-1 font-normal font-epilogue ${theme? 'text-black':'text-[#808191]'}  text-left leading-[18px] truncate`}>{description}</p>
                </div>
                <div className='flex flex-wrap justify-between mt-3 gap-2 '>
                    <div className='flex flex-col'>
                        <h4 className={`font-epilogue font-semibold text-[14px] ${theme? 'text-black':'text-[#b2b3bd]'}  leading-[22px]`}>{amountCollected} ETH</h4>
                        <p className={`mt-1 font-epilogue font-normal leading-[18px] ${theme?'text-black':'text-[#808191] '} sm:max-w-[120px] truncate`}>Raised of {target} ETH</p>
                    </div>
                    <div className='flex flex-col'>
                        <h4 className={`font-epilogue font-semibold text-[14px] ${theme?'text-black':'text-[#b2b3bd]'}  leading-[22px]`}>{deadline}</h4>
                        <p className={`mt-1 font-epilogue font-normal leading-[18px] ${theme?'text-black':'text-[#808191]'}  sm:max-w-[120px] truncate capitalize`}>days left</p>
                    </div>

                </div>
                <div className='flex item-center mt-5 gap-3'>
            <div className='w-6 h-6 flex items-center justify-center rounded-full bg-[#13131a]'>
                <img src={thirdweb} alt="user" className='w-1/2 h-1/2 object-contain' />
            </div>
            <p className={`flex-1 gap-3 font-normal font-epilogue capitalize ${theme?'text-black text-lg font-bold':'text-[#808191]'}  truncate`}>by <span className={theme?'text-white':'text-[#b2b3bd]'}>{owner}</span></p>
                </div>
            </div>
        </div>
    )
}

export default FundCard