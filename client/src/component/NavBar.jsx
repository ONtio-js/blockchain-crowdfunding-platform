import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo, thirdweb, menu, search } from '../assets';
import { navLinks } from '../constants';
import CustomButton from './CustomButton';
import ConnectBox from './ConnectBox'
import { useStateContext } from '../context';
const NavBar = () => {
  const navigate = useNavigate();
  const [isActive, setisActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [toggleConnectBox, setConnectBox] = useState(false);
  const {connect,address,multiWalletConnect} = useStateContext();
  return (
    <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
      <div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]'>
        <input
          type="text"
          placeholder='search for campaigns'
          className=' flex w-full font-epilogue font-normal text-[14px]placeholder:text-[#4b5264] text-white bg-transparent outline-none' />
        <div className='w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer'>
          <img src={search} alt="search" className='w-[15px] h-[15px] object-contain' />
        </div>
      </div>
      <div className='sm:flex hidden flex-row items-center justify-end gap-4'>
        <CustomButton
          btnType={'button'}
          title={address ? 'create a campaign' : 'connect'}
          style={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {setConnectBox(true)}}
        />

        <Link to={'/profile'}>
          <div className='w-[52px] h-[52px] bg-[#2c2f32] flex items-center justify-center rounded-full cursor-pointer'>
            <img src={thirdweb} alt="profile" className='w-[60%] h-[60%] object-contain' />
          </div>
        </Link>
      </div>
<ConnectBox open={toggleConnectBox} onClose = {() => setConnectBox(false)}/>
      {/* ssmall screen navbar */}
      <div className='sm:hidden flex justify-between items-center relative'>

        <div className='w-[40px] h-[40px] bg-[#2c2f32] flex items-center justify-center rounded-[10px] cursor-pointer'>
          <img  src={logo} alt="profile" className='w-[60%] h-[60%] object-contain' />
        </div>
        <img src={menu} alt="menu" className='w-[34px] h-[34px] object-contain cursor-pointer' onClick={() => setToggleDrawer((prev) => !prev)} />
        <div className={`absolute rounded-b-[20px] top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          <ul>
            {navLinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 cursor-pointer ${isActive === link.name && 'bg-[#3a3a43]'}`}
                onClick={() => {
                  setisActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link)
                }}
              >
                <img src={link.imgUrl} alt={link.name} className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`} />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>{link.name}</p>
              </li>
            ))}
          </ul>
          <div className='flex mx-4'>
            <CustomButton
              btnType={'button'}
              title={address ? 'create a campaign' : 'connect'}
              style={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if (address) {
                  navigate('create-campaign');
                  setToggleDrawer(false);
                } else {
                  connect();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar