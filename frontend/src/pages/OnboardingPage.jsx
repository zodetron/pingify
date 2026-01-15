import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { completeOnboarding } from '../lib/api';
import { CameraIcon, LoaderIcon, MapPinIcon, ShipWheelIcon, Code2, Sparkles, UserIcon, UserRoundIcon } from 'lucide-react';
import TechSelector from '../components/TechSelector';

const OnboardingPage = () => {

  const {authUser}= useAuthUser();
  const queryClient = useQueryClient();

  const [formState,setFormState]=useState({
    fullName : authUser?.fullName || "",
    bio : authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "", // Now: favorite/primary programming language
    learningLanguage: authUser?.learningLanguage || "", // Now: programming language being learned
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,

    onSuccess: () => {
      toast.success("Profile onboarded successfully");

    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      }, 500);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Onboarding failed"
      );
    },
  });


  const handleSubmit = (e) =>{
    e.preventDefault();
    onboardingMutation(formState);
  }
  
  const handleMaleAvatar = () =>{
    const idx = Math.floor(Math.random()*50)+1;
    const randomAvatar = `https://xsgames.co/randomusers/assets/avatars/male/${idx}.jpg`;

    setFormState({...formState,profilePic:randomAvatar});
    setTimeout(() => {
      toast.success("Avatar changed successfully");
    }, 1000);
  }
  const handleFemaleAvatar = () =>{
    const idx = Math.floor(Math.random()*50)+1;
    const randomAvatar = `https://xsgames.co/randomusers/assets/avatars/female/${idx}.jpg`;

    setFormState({...formState,profilePic:randomAvatar});
    setTimeout(() => {
      toast.success("Avatar changed successfully");
    }, 1000);
  }
  const handleArtAvatar = () =>{
    const idx = Math.floor(Math.random()*50)+1;
    const randomAvatar = `https://xsgames.co/randomusers/assets/avatars/pixel/${idx}.jpg`;

    setFormState({...formState,profilePic:randomAvatar});
    setTimeout(() => {
      toast.success("Avatar changed successfully");
    }, 1000);
  }
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 flex items-center justify-center p-4 relative' data-theme="forest">
      {/* Theme gradient overlay */}
      <div className='absolute inset-0 opacity-[0.05] pointer-events-none' style={{ background: 'var(--theme-gradient)' }} />
      
      <div className='card bg-base-200/80 backdrop-blur-xl w-full max-w-4xl shadow-2xl border border-base-300/50 gradient-border relative z-10'>
        <div className='card-body p-6 sm:p-8'>
          {/* Header */}
          <div className='text-center mb-6'>
            <div className='flex items-center justify-center gap-3 mb-2'>
              <Code2 className='size-8 text-primary' />
              <h1 className='text-3xl sm:text-4xl font-bold'>
                Complete Your Developer Profile
              </h1>
            </div>
            <p className='text-base-content/70 flex items-center justify-center gap-2'>
              <Sparkles className='size-4' />
              Join the developer learning community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
          {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
            {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden ring-4 ring-primary/20 ring-offset-4 ring-offset-base-200">
                {formState.profilePic ? (
                <img
                src={formState.profilePic}
                alt="Profile Preview"
                className="w-full h-full object-cover"
                />
              ):(
              <div className="flex items-center justify-center h-full">
                <CameraIcon className="size-12 text-base-content opacity-40" />
              </div>
              )}  
              </div>

            {/* Avatar Generator Buttons */}
            <div className='flex flex-wrap items-center justify-center gap-2'>
                <button type='button' onClick={handleMaleAvatar} className='btn btn-sm btn-accent'>
                  <UserIcon className='size-4'/>Male
                </button>
                <button type='button' onClick={handleArtAvatar} className='btn btn-sm btn-accent'>
                  <UserRoundIcon className='size-4'/>Artistic
                </button>
                <button type='button' onClick={handleFemaleAvatar} className='btn btn-sm btn-accent'>
                  <UserRoundIcon className='size-4'/>Female
                </button>
              </div>
            </div>
            
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                <span className="label-text font-semibold">Full Name</span>
                </label>
                  <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName:e.target.value })}
                  className="input input-bordered w-full"
                  placeholder="Your full name"
                  />
              </div>
              
              {/* Bio */}
              <div className="form-control">
                <label className="label">
                <span className="label-text font-semibold">Bio</span>
                </label>
                  <textarea
                  name="bio"
                  value={formState.bio}
                  onChange={(e) => setFormState({ ...formState, bio:e.target.value })}
                  className="textarea textarea-bordered w-full h-24 resize-none"
                  placeholder="Tell others about yourself and your coding journey..."
                  />
              </div>

              {/* Tech Stack Selection */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                
                {/* FAVORITE/PRIMARY LANGUAGE (backend: nativeLanguage) */}
                <TechSelector
                  value={formState.nativeLanguage}
                  onChange={(value) => setFormState({ ...formState, nativeLanguage: value })}
                  label="🏆 Your Strongest Language"
                  placeholder="What are you best at?"
                />

                {/* LEARNING LANGUAGE (backend: learningLanguage) */}
                <TechSelector
                  value={formState.learningLanguage}
                  onChange={(value) => setFormState({ ...formState, learningLanguage: value })}
                  label="📚 Currently Learning"
                  placeholder="What are you learning?"
                />

              </div>
              
              {/* Location Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Location</span>
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5
                  text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
              </div>

            {/*Submit*/}
            <button 
              className='btn btn-primary w-full text-lg h-14 shadow-lg hover:shadow-xl transition-all' 
              disabled={isPending} 
              type='submit'
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className='size-6'/>
                  Complete Onboarding
                </>
              ):(
                <>
                  <LoaderIcon className='animate-spin size-6'/>
                  Setting up your profile...
                </>
              )}          
            </button> 

          </form>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
