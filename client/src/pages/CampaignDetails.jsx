import React, { useState, useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import { CustomButton, CountBox, Loader } from '../component';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';
const Campaigndetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { getDonations, contract, address,donate } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const handleDonate = async () =>{
    setIsLoading(true);
    await donate(state.pId,amount);
    navigate('/')
    setIsLoading(false);
   
  }

const fetchDonations = async () => {
  const data =  await getDonations(state.pId);
  setDonators(data);
}

useEffect(() =>{
  if(contract) fetchDonations();
},[contract,address])
  return (
    <div>
      {isLoading && <Loader />}
      <div className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'>
        <div className='flex-1 flex-col'>
          <img src={state.image} alt="campaign-image" className='w-full h-[410px] object-cover rounded-xl' />
          <div className='relative w-full h-3 rounded-full bg-[#3a3a43] mt-2'>
            <div className='absolute h-full rounded-full bg-green-400' style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxwidth: '100' }}></div>
          </div>
        </div>
        <div className='flex md:w-[150px]  w-full flex-wrap justify-between gap-7'>
          <CountBox title={'days Left'} value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title={'Total Donators'} value={donators.length} />
        </div>
      </div>
      <div className='mt-[60px] flex md:flex-row flex-col gap-5'>
        <div className='flex-[2] flex flex-col  gap-10'>
          <div>
            <h4 className='font-epilogue font-semibold text-white text-[18px]  text-left uppercase'>creator</h4>
            <div className='mt-5 flex flex-wrap items-center gap-3 '>
              <div className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer'>
                <img src={thirdweb} alt="user" className='w-1/2 h-1/2 object-contain' />
              </div>
              <div>
                <h4 className='font-semibold font-epilogue text-[14px] text-white break-all'>{state.owner}</h4>
                <p className='mt-1 font-normal text-[14px] font-epilogue text-[#808191]'>20 campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className='font-epilogue font-semibold text-white text-[18px]  text-left uppercase'>story</h4>
            <div className='mt-2'>
              <p className='font-normal leading-6 text-[18px] font-epilogue text-[#808191] text-justify'>{state.description}</p>
            </div>
          </div>
          <div>
            <h4 className='font-epilogue font-semibold text-white text-[18px]  text-left uppercase'>donators</h4>
            <div className='mt-2 flex flex-col gap-4 '>

              {donators.length > 0 ? donators.map((donator,index) => (
                <div key={`${donator.donator}-${index}`} className="flex justify-between  items-center gap-4 ">
                <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {donator.donator}</p>
                <p className="font-epilogue font-semibold text-[16px] text-green-400 leading-[26px] break-ll">{donator.donation}</p>
              </div>
              )) : (
                <p className='font-normal leading-6 text-[18px] font-epilogue text-[#808191] text-justify'>No Donators yet... Be the first Donators❤</p>
              )}

            </div>
          </div>
          <div className='flex-1'>
            <h4 className='font-epilogue font-semibold text-white text-[18px]  text-left uppercase'>fund</h4>

            <div className='mt-5 flex flex-col p-4 rounded-[10px] bg-[#1c1c24]'>
              <p className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191] capitalize'>
                fund the campaign
              </p>
              <div>
                <input type='number' placeholder='ETH 0.1' step='0.1' className='w-full py-2 sm:px-5 px-4 outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]' value={amount} onChange={(e) => setAmount(e.target.value)} />
                <div className='my-5 p-4 bg-[#13131a] rounded-[10px] '>
                  <h4 className='font-semibold font-epilogue text-white capitalize text-[16px] leading-[22px]'>back it because you believe in it</h4>
                  <p className='mt-3 font-epilogue font-normal leading-[22px] text-[#808191]'>support the project for no reward, just because it speaks to you</p>
                </div>
                <CustomButton title={'fund campaign'} style={'w-full bg-[#8c6dfd]'} handleClick={handleDonate} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Campaigndetails