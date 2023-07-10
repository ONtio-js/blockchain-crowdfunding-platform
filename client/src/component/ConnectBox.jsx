import React from 'react'
import {metamask,walletConnect} from  '../assets';
import { useStateContext } from '../context';
const ConnectBox = ({open,onClose}) => {
  const {connect, multiWalletConnect} = useStateContext();
  const handleWalletConnect = () => {
    if(multiWalletConnect()) onClose();
  }
  const handleMetaMask = () => {
    if(connect()) onClose();
  }
  return (
    <div className={`${open? '': 'hidden' } fixed inset-0 z-10 h-screen w-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col text-white`}>
    <div className='flex flex-col gap-4 w-1/2 h-1/2 bg-blackbg p-4 rounded-2xl justify-center items-center'>
        <div onClick={handleMetaMask} className=' cursor-pointer bg-richBlack p-4 h-[50px] w-2/3 rounded-[10px] flex  items-center gap-4 capitalize'>
          <img src={metamask} alt="" className='w-[30px] h-[30px] ' /> metamask
        </div>
        <div  onClick={handleWalletConnect} className=' cursor-pointer bg-richBlack p-4 h-[50px] w-2/3 rounded-[10px] flex items-center gap-4 capitalize'>
        <img  src={walletConnect} alt="" className='w-[30px] h-[30px] ' /> wallet Connect
        </div>

    </div>
    </div>
  )
}

export default ConnectBox