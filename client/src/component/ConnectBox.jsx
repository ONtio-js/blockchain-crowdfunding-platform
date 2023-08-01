import React from 'react'
import {metamask,walletConnect} from  '../assets';
import { useStateContext } from '../context';
const ConnectBox = ({open,onClose}) => {
  const {connect,theme, multiWalletConnect} = useStateContext();
  const handleWalletConnect = () => {
    if(multiWalletConnect()) onClose();
  }
  const handleMetaMask = () => {
    if(connect()) onClose();
  }
  return (
    <div onClick={onClose} className={`${open? 'translate-y-0': '-translate-y-[100vh]' } transition-all duration-700  fixed inset-0 z-10 h-screen w-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col text-white`}>
    <div className={`relative flex flex-col gap-4 w-5/6 sm:w-1/2 h-1/2 ${theme?'bg-dirtyWhite':'bg-blackbg'}  p-4 rounded-2xl justify-center items-center`}>
    
        <div onClick={handleMetaMask} className={`cursor-pointer  ${theme?'bg-white text-black':'bg-richBlack'} p-4 h-[50px] sm:w-2/3 rounded-[10px] flex  items-center gap-4 capitalize`}>
          <img src={metamask} alt="" className='w-[30px] h-[30px] ' /> metamask
        </div>
        <div  onClick={handleWalletConnect} className={`cursor-pointer  ${theme?'bg-white text-black':'bg-richBlack'} p-4 h-[50px] sm:w-2/3 rounded-[10px] flex  items-center gap-4 capitalize`}>
        <img  src={walletConnect} alt="" className='w-[30px] h-[30px] ' /> Trustwallet
        </div>
        <div className={`absolute bottom-0 py-4 rounded-b-[20px] w-full flex items-center justify-center ${theme?'bg-white':'bg-richBlack'}  shadow-secondary`}>
          <h1 className='capitalize font-bold font-epilogue text-purple-600'>theophilus [ONtio-js]</h1>
        </div>
    </div>
    </div>
  )
}

export default ConnectBox