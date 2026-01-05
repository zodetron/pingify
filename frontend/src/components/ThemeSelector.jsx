import React from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { PaletteIcon } from 'lucide-react';

const ThemeSelector = () => {
    const {theme, setTheme} = useThemeStore();
  return (
    <div className='dropdown dropdown-end'>
    {/* dropdown trigger */}
        <button tabIndex={0} className='btn btn-ghost btn-circle'>    
            <PaletteIcon className='size-5'/>
        </button>
           
    </div>
  )
}

export default ThemeSelector
