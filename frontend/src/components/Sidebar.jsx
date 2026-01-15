import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router'
import { BellIcon, HomeIcon, ShipWheelIcon, UserIcon } from 'lucide-react';
import ProfileModal from './ProfileModal';

const Sidebar = () => {

    const{authUser}=useAuthUser();
    const location = useLocation();
    const currentPath= location.pathname;
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // console.log(currentPath);


  return <aside className='fixed left-0 top-0 w-64 h-screen bg-base-200 border-r border-base-300 hidden lg:flex flex-col z-30 overflow-hidden'>
    <div className='p-5 border-b border-base-100 flex-shrink-0'>
        <Link to="/" className='flex items-center gap-2.5'>
          <ShipWheelIcon className='size-9 text-primary'/>
          <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
            Pingify
          </span>
        </Link>
    </div>
{/* Nav buttons 3 */}
    <nav className='flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar'>

        <Link
            to="/"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case${
            currentPath === "/" ? "btn-active" : ""
            }`}
        >
            <HomeIcon className='size-5 text-base-content opacity-70'/>
            <span>Home</span>
        </Link>

        <Link
            to="/friends"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case${
            currentPath === "/friends" ? "btn-active" : ""
            }`}
        >
            <UserIcon className='size-5 text-base-content opacity-70'/>
            <span>Friends</span>
        </Link>

        <Link
            to="/notifications"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case${
            currentPath === "/notifications" ? "btn-active" : ""
            }`}
        >
            <BellIcon className='size-5 text-base-content opacity-70'/>
            <span>Notifications</span>
        </Link>
    </nav>

    {/* User profile section */}
    <div className='p-4 border-t border-base-300 flex-shrink-0'>
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className='flex items-center gap-3 w-full hover:bg-base-300 p-2 rounded-lg transition-colors cursor-pointer'
        >
            <div className='avatar'>
                <div className='w-10 rounded-full ring-2 ring-primary/20'>
                    <img src={authUser?.profilePic} alt="User Avatar" />
                </div>
            </div>
            <div className='flex-1 text-left'>
                <p className='font-semibold text-sm truncate'>{authUser?.fullName}</p>
                <p className='text-xs text-success flex items-center gap-1'>
                <span className='size-2 rounded-full bg-success inline-block'/>
                Online
                </p>
            </div>
        </button>
    </div>

    {/* Profile Modal */}
    <ProfileModal
      isOpen={isProfileModalOpen}
      onClose={() => setIsProfileModalOpen(false)}
      user={authUser}
    />

  </aside>;
};

export default Sidebar
Sidebar