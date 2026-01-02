import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ShipWheelIcon } from 'lucide-react';
import React, { useState } from 'react'

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email:"",
    password:"",
  });

  const queryClient = useQueryClient();

  const {mutate:loginMutation, isPending, error} = useMutation({
    mutationFn:login,
    onSuccess: () => queryClient.invalidateQueries({queryKey:["me"]}),
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  } 





  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 data-theme="forest"'>

      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
      {/* Login Form Section */}
      <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
      {/* Logo */}
      <div className='mb-4 flex items-center justify-start gap-2'>
        <ShipWheelIcon className='size-9 text-primary'/>
      </div>

      </div>
      </div>
      LoginPage
    </div>
  )
}

export default LoginPage
