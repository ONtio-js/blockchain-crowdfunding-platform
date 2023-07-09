import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useStateContext} from '../context'
import {ethers} from 'ethers';
import {createCampaign, money} from '../assets';
import { CustomButton, Loader } from '../component';
import {checkImage} from '../utils'
import FormField from '../component/FormField';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const {createCampaign} = useStateContext();
  const [form, setform] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });
  const handleFormFieldChange = (fieldName,e) => {
    setform({...form, [fieldName]:e.target.value});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

      checkImage(form.image, async(exist) => {
        if(exist){
         setisloading(true);
         await createCampaign({...form, target: ethers.utils.parseUnits(form.target,18)});
         setisloading(false);
         navigate('/');
        }else{
         alert('provide a valid image url');
         setform({...form,image:''});
        }
      })
    
    
  }
  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded[10px] sm:p-10 p-4 rounded-[15px]' >{isloading && <Loader />}
    <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
      <h1 className='font-epilogue sm:text-[25px]  text-[18px] leading-[38px] text-white'>start a campaign</h1>
    </div>
    <form onSubmit={handleSubmit} 
          className='w-full mt-[65px] flex flex-col gap-[30px]'
    >
      <div className='flex flex-wrap gap-[40px]'>
    <FormField 
     labelName = 'your name'
     placeHolder = 'John Doe'
     inputType = 'text'
     value = {form.name}
     handleChange = {(e) => handleFormFieldChange('name',e)}
    />
     <FormField 
     labelName = 'campaign Title'
     placeHolder = 'Campaign Title'
     inputType = 'text'
     value = {form.title}
     handleChange = {(e) => handleFormFieldChange('title',e)}
    />
      </div>
      <FormField 
     labelName = 'story'
     placeHolder = 'write your story here...'
     inputType = 'text'
     isTextArea={true}
     value = {form.description}
     handleChange = {(e) => handleFormFieldChange('description',e)}
    />
    <div className='w-full flex gap-3 justify-center items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
      <img src={money} alt='money' className='w-[40px] h-[40px] object-contain' />
      <h4 className='font-epilogue font-bold text-white text-[25px]'>you will get 95.7% of raised amount</h4>
    </div>
    <div className='flex flex-wrap gap-[40px]'>
    <FormField 
     labelName = 'target'
     placeHolder = 'ETH 2'
     inputType = 'text'
     value = {form.target}
     handleChange = {(e) => handleFormFieldChange('target',e)}
    />
     <FormField 
     labelName = 'end date'
     placeHolder = 'End Date'
     inputType = 'date'
     value = {form.deadline}
     handleChange = {(e) => handleFormFieldChange('deadline',e)}
    />
      </div>
      <FormField 
     labelName = 'campaign image'
     placeHolder={'place your image url here'}
     inputType = 'url'
     value = {form.image}
     handleChange = {(e) => handleFormFieldChange('image',e)}
    />
      <div className='flex justify-center items-center mt-[20px]'>
      <CustomButton 
      btnType={'submit'}
      title={'submit new campaign'}
      style={'bg-[#1dc071]'}
      />
    </div>
    </form>
    </div>
  )
}

export default CreateCampaign