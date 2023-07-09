import React from 'react'
import { useNavigate } from 'react-router-dom';
import {FundCard} from './';
import { loader } from '../assets';
const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
    const navigate = useNavigate();

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`,{state:campaign})
    }
    return (
        <div>
            <h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>{title} ({campaigns.length})</h1>
            <div className='grid sm:grid-cols-2 lg:flex lg:flex-wrap mt-[20px] gap-[26px]  '>
                {isLoading && (
                    <div className='flex justify-center items-center w'><img src={loader} alt='loader ' className='w-[100px] h-[100px] object-contain' /></div>
                )}

                {!isLoading && campaigns.length === 0 && (
                    <p className='font-epilogue font-semibold text-[14px]leading-[30px] text-[#818183] capitalize'>
                        no campaign avaliable to show
                    </p>
                )}

                {!isLoading && campaigns.length > 0 && campaigns.reverse().map((campaign) => <FundCard 
                key={campaign.title}
                {...campaign}
                handleClick = {() => handleNavigate(campaign)}
                />)}
            </div>
        </div>
    )
}

export default DisplayCampaigns