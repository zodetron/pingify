import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation, useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BellIcon, LogOutIcon, ShipWheelIcon, ArrowLeft } from 'lucide-react';
import { logout } from '../lib/api';
import ThemeSelector from './ThemeSelector.jsx';
import useLogout from '../hooks/useLogout.js';
import ProfileModal from './ProfileModal.jsx';

const Navbar = () => {

    const {authUser} = useAuthUser();
    const location = useLocation();
    const navigate = useNavigate();
    const isChatPage = location.pathname?.startsWith("/chat");  

    const {logoutMutation} = useLogout();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
  <>
    <nav className="bg-base-200/80 backdrop-blur-xl border-b border-base-300/50 sticky top-0 z-40 h-16 shadow-sm w-full flex-shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full overflow-visible">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-4">

            {/* App Name — visible only when sidebar is hidden */}
            {!isChatPage && (
              <Link
                to="/"
                className="flex items-center gap-2 lg:hidden shrink-0"
              >
                <ShipWheelIcon className="size-7 text-primary" />
                <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                  Pingify
                </span>
              </Link>
            )}

            {/* Chat Page Back Button + Logo */}
            {isChatPage && (
              <>
                <button
                  onClick={() => navigate('/')}
                  className="btn btn-ghost btn-circle group"
                  title="Back to Home"
                >
                  <ArrowLeft className="size-6 group-hover:-translate-x-1 transition-transform duration-300" />
                </button>

                <Link
                  to="/"
                  className="flex items-center gap-2.5 group shrink-0"
                >
                  <ShipWheelIcon className="size-9 text-primary group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-2xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent tracking-wider">
                    Pingify
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-auto">
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle relative group">
                <BellIcon className="h-6 w-6 opacity-70 group-hover:opacity-100" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse opacity-0 group-hover:opacity-100" />
              </button>
            </Link>

            <ThemeSelector />

            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="avatar cursor-pointer"
              title="Edit Profile"
            >
              <div className="w-9 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100 hover:ring-primary/50 transition-all">
                <img src={authUser?.profilePic} alt="User Avatar" />
              </div>
            </button>

            <button
              className="btn btn-ghost btn-circle group"
              onClick={logoutMutation}
            >
              <LogOutIcon className="h-6 w-6 opacity-70 group-hover:opacity-100 group-hover:text-error transition-all" />
            </button>
          </div>

        </div>
      </div>
    </nav>

    {/* Profile Modal */}
    <ProfileModal
      isOpen={isProfileModalOpen}
      onClose={() => setIsProfileModalOpen(false)}
      user={authUser}
    />
  </>
);

}

export default Navbar