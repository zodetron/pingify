import React from 'react'
import { Link } from 'react-router';
import { ALL_TECHNOLOGIES } from '../constants';
import { Code2 } from 'lucide-react';

const FriendCard = ({friend}) => {
  const favoriteTech = ALL_TECHNOLOGIES.find(tech => tech.id === friend.nativeLanguage);
  const learningTech = ALL_TECHNOLOGIES.find(tech => tech.id === friend.learningLanguage);

  return (
    <div className='card bg-base-200 hover:shadow-xl transition-all duration-300 border border-base-300/50 gradient-hover overflow-hidden'>

        <div className='card-body p-4 relative z-10'>
            {/* User Info */}
            <div className='flex items-center gap-3 mb-3'>
                <div className='avatar'>
                    <div className='size-12 rounded-full ring-2 ring-primary/20'>
                        <img src={friend.profilePic} alt={friend.fullName} />
                    </div>
                </div>
                <h3 className='font-semibold truncate'>{friend.fullName}</h3>
            </div>

            {/* Tech Stack Badges */}
            <div className='flex flex-col gap-2 mb-3'>
                {favoriteTech && (
                    <div className='flex items-center gap-2 bg-base-300/50 rounded-lg p-2'>
                        <i className={`${favoriteTech.icon} text-xl`} style={{ color: favoriteTech.color }}></i>
                        <div className='flex flex-col'>
                            <span className='text-[10px] text-base-content/60 uppercase font-semibold'>Strongest</span>
                            <span className='text-xs font-semibold'>{favoriteTech.label}</span>
                        </div>
                    </div>
                )}
                {learningTech && (
                    <div className='flex items-center gap-2 bg-base-300/50 rounded-lg p-2'>
                        <i className={`${learningTech.icon} text-xl`} style={{ color: learningTech.color }}></i>
                        <div className='flex flex-col'>
                            <span className='text-[10px] text-base-content/60 uppercase font-semibold'>Learning</span>
                            <span className='text-xs font-semibold'>{learningTech.label}</span>
                        </div>
                    </div>
                )}
                {!favoriteTech && !learningTech && (
                    <div className='flex items-center gap-2 text-base-content/50 text-xs'>
                        <Code2 className='size-4' />
                        <span>No tech stack set</span>
                    </div>
                )}
            </div>

            <Link to={`/chat/${friend._id}`} className='btn btn-primary btn-sm w-full'>
                Message
            </Link>

        </div>
      
    </div>
  )
}

export default FriendCard;
