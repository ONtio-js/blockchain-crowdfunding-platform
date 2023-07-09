import React from 'react';
import {Route, Routes} from 'react-router-dom';

import {Home, Profile, CreateCampaign,CampaignDetails} from './pages';
import { NavBar,SideBar } from './component';
const App = () => {
  return (
    <div className='relative sm:p-8 p-4 bg-blackbg min-h-screen flex flex-row'>
        <div className='sm:flex hidden mr-10'>
          < SideBar />
        </div>
        <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
          <NavBar />

          <Routes>
          <Route path='/' element = { <Home />} />
          <Route path='/profile' element = { <Profile />} />
          <Route path='/campaign-details/:id' element = { <CampaignDetails />} />
          <Route path='/create-campaign' element = { <CreateCampaign /> } />
        </Routes>
        </div>
        
    </div>
  )
}

export default App