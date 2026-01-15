import React from 'react'
import { LoaderIcon } from 'react-hot-toast'
import { useThemeStore } from '../store/useThemeStore';
import { LoaderCircleIcon } from 'lucide-react';

const ChatLoader = () => {
    const {theme} = useThemeStore();
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-600' data-theme={theme}>
        <LoaderCircleIcon className='animate-spin size-10 text-primary'/>
            Loading Chat...
    </div>
  )
}

export default ChatLoader
