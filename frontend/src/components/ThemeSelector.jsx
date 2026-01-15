import React, { useState, useRef, useEffect } from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { PaletteIcon, Sparkles, Check } from 'lucide-react';
import {THEMES} from "../constants/index.js"

const ThemeSelector = () => {
    const {theme, setTheme} = useThemeStore();
    const [hoveredTheme, setHoveredTheme] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    const currentTheme = THEMES.find(t => t.name === theme);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

  return (
    <div className='relative' ref={dropdownRef}>
    {/* dropdown trigger with gradient effect */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className='btn btn-ghost btn-circle relative group overflow-hidden'
          title="Change Theme"
        >    
            <div className='absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300'
                 style={{background: currentTheme?.gradient}}>
            </div>
            <PaletteIcon className='size-5 relative z-10 group-hover:scale-110 transition-transform duration-300'/>
        </button>
           
        {isOpen && (
          <div
            className='fixed right-4 mt-2 p-3 shadow-2xl bg-base-200/95 backdrop-blur-xl rounded-3xl w-72 border border-base-content/10 max-h-[80vh] overflow-y-auto custom-scrollbar z-50'
            style={{ top: '4rem' }}
          >

            <div className='mb-3 flex items-center gap-2 px-2'>
              <Sparkles className='size-4 text-primary' />
              <h3 className='text-sm font-semibold text-base-content/80'>Choose Your Vibe</h3>
            </div>

            <div className='grid grid-cols-2 gap-2'>
              {THEMES.map((themeOption)=>(
                <button 
                  key={themeOption.name}
                  className={`
                    relative overflow-hidden rounded-2xl p-3 transition-all duration-300
                    ${
                      theme === themeOption.name
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-base-200 scale-[0.98]"
                        : "hover:scale-105 hover:shadow-lg"
                    }
                  `}
                  style={{
                    background: hoveredTheme === themeOption.name || theme === themeOption.name 
                      ? themeOption.gradient 
                      : 'rgba(0,0,0,0.1)'
                  }}
                  onClick={()=> {
                    setTheme(themeOption.name);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setHoveredTheme(themeOption.name)}
                  onMouseLeave={() => setHoveredTheme(null)}
                >
                  {/* Gradient overlay */}
                  <div 
                    className='absolute inset-0 opacity-80'
                    style={{background: themeOption.gradient}}
                  />
                  
                  {/* Content */}
                  <div className='relative z-10 flex flex-col items-center gap-2'>
                    <span className='text-2xl drop-shadow-lg'>{themeOption.icon}</span>
                    <span className='text-xs font-bold text-white drop-shadow-md text-center'>
                      {themeOption.label}
                    </span>
                    
                    {/* Selected indicator */}
                    {theme === themeOption.name && (
                      <div className='absolute top-1 right-1 bg-white rounded-full p-0.5'>
                        <Check className='size-3 text-green-600' />
                      </div>
                    )}
                  </div>

                  {/* Shine effect on hover */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent
                    transform -translate-x-full transition-transform duration-700
                    ${hoveredTheme === themeOption.name ? 'translate-x-full' : ''}
                  `} />
                </button>
              ))}
            </div>

            <div className='mt-3 pt-3 border-t border-base-content/10'>
              <p className='text-xs text-center text-base-content/60'>
                {THEMES.length} themes available
              </p>
            </div>
          </div>
        )}
    </div>
  )
}

export default ThemeSelector
