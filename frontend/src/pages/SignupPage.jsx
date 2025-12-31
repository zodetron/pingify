import React, { useState } from 'react';
import {ShipWheelIcon} from "lucide-react";
import {Link} from "react-router";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { signupfrontend } from '../lib/api';

const SignupPage = () => {

  const[signupData,setSignupData] = useState({
    fullName:"",
    email:"",
    password:"",
  });

  const queryClient = useQueryClient()

  const {mutate,isPending,error} = useMutation({
    mutationFn: async() =>signupfrontend,
    onSuccess:() => queryClient.invalidateQueries({queryKey:["authUser"]}),
  });

  const handleSignup = (e) =>{
    e.preventDefault();  //no reload on submit
    mutate(signupData);
  }

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
      
      {/* signup form left side */}
      <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
      {/* logo */}
      <div className='mb-4 flex items-center justify-start gap-2'>
        <ShipWheelIcon className='size-9 text-primary'/>
        <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>Pingify</span>
      </div>

      <div className='w-full'>
        <form onSubmit={handleSignup}>

          <div className='space-y-4'>
            <div>
              <h2 className='text xl font-semibold'>Create an account</h2>
              <p className='text-sm opacity-70'>
                Join Pingify and start your language learning adventure!
              </p>
            </div>
          {/* Full Name Input */}
            <div className='space-y-3'>
              <div className='form-control w-full '>
                <label className='label '>
                  <span className='label-text'>Full Name</span>
                </label>

                <input type="text"
                    placeholder='John Doe'
                    className='input input-bordered w-full'
                    value={signupData.fullName}
                    onChange={(e)=> setSignupData({...signupData, fullName:e.target.value})}
                    required
                    />
              </div>
            {/* Email input */}
              <div className='form-control w-full '>
                <label className='label '>
                  <span className='label-text'>Email</span>
                </label>

                <input type="email"
                    placeholder='john@gmail.com'
                    className='input input-bordered w-full'
                    value={signupData.email}
                    onChange={(e)=> setSignupData({...signupData, email:e.target.value})}
                    required
                    />
            </div>
            {/* Password */}
              <div className='form-control w-full '>
                <label className='label '>
                  <span className='label-text'>Password</span>
                </label>

                <input type="text"
                    placeholder='*******'
                    className='input input-bordered w-full'
                    value={signupData.password}
                    onChange={(e)=> setSignupData({...signupData, password:e.target.value})}
                    required
                    />
              <p className='text-xs opacity-70 mt-1'>
                Password must be atleast 6 characters long
              </p>
              </div>
            {/* Terms n Conditions checkbox */}
            <div className='form-control'>
              <label className='label cursor-pointer justify-start gap-2'>
                <input type="checkbox" className='checkbox checkbox-sm' required />
                <span className='text-xs leading-tight'>
                  I agree to the {" "}
                  <span className='text-primary hover:underline'>terms of service</span> and {" "}
                  <span className='text-primary hover:underline'>privacy policy</span>
                </span>
              </label>
            </div>
          </div>

          <button className='btn btn-primary w-full 'type="submit">
            {isPending ? "Signing up..." : "Sign up"}
          </button>

          <div className='text-center mt-4'>
            <p className='text-sm'>
              Already have an account? {" "}
              <Link to="/login" className='text-primary hover:underline'>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </form>

    </div>
      
    </div>

      {/* Signup form right side */}
    <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
    <div className="max-w-md p-8">
    {/* Illustration */}
    <div className="relative aspect-square max-w-sm mx-auto">
      
    <DotLottieReact src="./public/animation1.json" loop autoplay className='w-full h-full'/>
    {/* <img src="/i.png" alt="Language connection illustration" className="w-full h-full" /> */}
    </div>

    <div className="text-center space-y-3 mt-6">
    <h2 className="text-2xl font-semibold">Connect with partners worldwide</h2>
    <p className="opacity-70 text-larger" >
    Build Together, make friends, and <br /> improve your skills together
    </p>
    </div>
    </div>
    </div>
      
  </div>
</div>
  )
}

export default SignupPage
