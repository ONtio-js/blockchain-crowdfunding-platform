import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {logo, sun } from '../assets';
import { navLinks} from '../constants';
import { useStateContext } from '../context';
const SideBar = ({theme,setTheme}) => {
    const navigate = useNavigate();
    const [isActive, setisActive] = useState('dashboard');
    const { disconnect} = useStateContext();
     const Icon = ({style,name,imageUrl,isActive,disabled,handleClick}) => (
        <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-richGreen'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${style}`} onClick={handleClick}>
            {!isActive ? (
                <img src={imageUrl} alt="fund logo" className='w-1/2 h-1/2 ' />
            ):(
                <img src={imageUrl} alt="fund logo" className={`w-1/2 h-1/2 ${isActive!== name && 'grayscale'}`} />  
            )}
        </div>
    )
  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
        <Link to={'/'}>
            <Icon style={`w-[52px] h-[52px] ${theme?'bg-dirtyWhite border-2 border-white':'bg-richGreen'} transition-all duration-700`} imageUrl = {logo}/>
        </Link>
        
        <div className={`flex-1 flex flex-col justify-between items-center ${theme? 'bg-dirtyWhite border-2 border-white' : 'bg-richBlack'} transition-all duration-700 rounded-[20px] w-[70px] py-4 mt-12`}>
            <div className='flex flex-col justify-center items-center gap-3'>
                {navLinks.map((link) => (
                    <Icon 
                    key={link.name}
                    {...link}
                    handleClick={() => {
                        if(!link.disabled){
                            setisActive(link.name)
                            navigate(link.link)
                            if(link.name ==='logout') disconnect();
                        }
                    }}
                    isActive={isActive}
                    imageUrl={link.imgUrl}
                    />
                ))}
            </div>
            <div onClick={setTheme}>
            <Icon imageUrl={sun} style={`${theme?'bg-white' : 'bg-[#1c1c24]'}  shadow-secondary transition-all duration-700`} />
            </div>
        </div>
       
    </div>
  )
}

export default SideBar