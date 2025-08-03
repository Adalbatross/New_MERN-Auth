import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const ResetPassword = () => {
  axios.defaults.withCredentials = true;
  const {backendUrl} = useContext(AppContext);
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [emailSent, setEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [otpSubmitted, setotpSubmitted] = useState(false)
  
  const submitEmail = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email })
      data.success ? toast.success(data.message): toast.error(data.message)
      data.success && setEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  }
  const otpSubmit = async (e)=>{
    e.preventDefault();
    const otpArray = Object.values(inputRefs.current).map(input => input.value.trim());
    setOtp(otpArray.join(''));
    setotpSubmitted(true);

  }
  const onSubmitNewPassword = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email,otp,newPassword
      })
      if(data.success){
        toast.success(data.message);
        navigate('/login');
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const inputRefs = React.useRef({})
    const handleInput = (e, index) => {
      const value = e.target.value;
      if (value.length > 0 && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    };
    const handleKeyDown = (e, index) => {
      if (e.key === 'Backspace') {
        if (e.target.value === '' && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      }
    };  
    const handlePaste= (e)=>{
      const paste = e.clipboardData.getData('text')
      const pasteArray = paste.split('');
      pasteArray.forEach((char,index)=>{
        if(inputRefs.current[index]){
          inputRefs.current[index].value = char
        }
      })
    };
  
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 
    bg-gradient-to-br from-purple-400 to-blue-200'>
      <img src={assets.logo} onClick={()=>{navigate('/')}} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>

{!emailSent &&     
      <form onSubmit={submitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your registered Email id</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#505068]'>
          <img src={assets.mail_icon} alt=''/>
            <input           
            className='bg-transparent outline-none text-white' 
            type='email' placeholder='Email id'
            value = {email} onChange={e=>{setEmail(e.target.value)}} required />
        </div>
        <button className='w-full rounded-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium text-white cursor-pointer mt-3'>Submit</button>
      </form>
} 

{/* reset otp form */}
{!otpSubmitted && emailSent &&
      <form onSubmit={otpSubmit} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email id.</p> 
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
        {Array(6).fill(0).map((_,index)=>(
          <input type='text' maxLength='1' key = {index} required
          className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
          ref={e=> inputRefs.current[index] = e} //important to learn
          onInput={(e)=>handleInput(e,index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
        </div>
        <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer rounded-full text-white'>Submit</button>
      </form>
}   

{/* enter new passord form*/}
{otpSubmitted && emailSent &&
      <form onSubmit = {onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your new passord</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#505068]'>
          <img src={assets.lock_icon} alt=''/>
            <input           
            className='bg-transparent outline-none text-white' 
            type='password' placeholder='Password'
            value = {newPassword} onChange={e=>{setNewPassword(e.target.value)}} required />
        </div>
        <button className='w-full rounded-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium text-white cursor-pointer mt-3'>Submit</button>
      </form>
}      
    </div>
  )
}

export default ResetPassword
