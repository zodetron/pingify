import React, { Children } from 'react'
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

const Layout = ({children,showSidebar = false}) => {
  return (
    <div className='min-h-screen w-full relative'>
        {/* Theme-based gradient background overlay */}
        <div className='fixed inset-0 pointer-events-none -z-10'>
          <div className='absolute inset-0 opacity-[0.03]' style={{ background: 'var(--theme-gradient)' }} />
        </div>
        
        {/* Fixed Sidebar */}
        {showSidebar && <Sidebar/>}
        
        {/* Main Content Area */}
        <div className={`min-h-screen flex flex-col ${showSidebar ? 'lg:ml-64' : ''}`}>
          <Navbar/>

          <main className='flex-1 w-full overflow-y-auto'>
              {children}
          </main>
        </div>
    </div>
  )
}

export default Layout;