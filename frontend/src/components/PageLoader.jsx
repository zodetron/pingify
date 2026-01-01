import { LoaderIcon } from 'lucide-react'
import React from 'react'

const PageLoader = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-600'>
        <LoaderIcon className='animate-spin size-10 text-primary'/>
    </div>
  )
}

export default PageLoader
