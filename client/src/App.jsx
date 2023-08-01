import React,{useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import { sun } from './assets';
import {Home, Profile, CreateCampaign,CampaignDetails} from './pages';
import { useStateContext } from './context';
import { NavBar,SideBar } from './component';
const App = () => {
 const {theme, setTheme} = useStateContext();
  return (
    <div className={`overflow-x-hidden relative sm:p-8 p-4 ${theme?'bg-gray-200':'bg-blackbg'} transition-all duration-700 min-h-screen flex flex-row`}>
        <div className='sm:flex hidden mr-10 fixed'>
          < SideBar theme={theme} setTheme={() =>setTheme(prev => !prev)} />
        </div>
        <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto md:ml-[100px] sm:pr-5'>
          <NavBar theme={theme}/>

          <div className='mt-20'>
          <Routes>
          <Route path='/' element = { <Home />} />
          <Route path='/profile' element = { <Profile  />} />
          <Route path='/campaign-details/:id' element = { <CampaignDetails  />} />
          <Route path='/create-campaign' element = { <CreateCampaign /> } />
        </Routes>
          </div>
          <div onClick={() => setTheme(prev => !prev)} className='sm:hidden absolute bottom-4 right-4 bg-gray-800 p-2 rounded-full'>
            <img src={sun} alt="sun" />
            </div>
        </div>
        
    </div>
  )
}

export default App