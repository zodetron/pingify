import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from '../lib/api';
import { CheckCircle, CheckCircleIcon, MapIcon, MapPinIcon, UserIcon, UserPlusIcon, UsersIcon } from 'lucide-react';
import { Link } from 'react-router';
import FriendCard from '../components/FriendCard';
import NoFriendsFound from '../components/NoFriendsFound';
import { capitalize } from '../lib/util';
import { ALL_TECHNOLOGIES } from '../constants';

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds,setOutgoingRequestsIds] = useState(new Set())

  const{data:friends=[],isLoading:loadingFriends} = useQuery({
    queryKey:["friends"],
    queryFn: getUserFriends,
  })

  const{data:recommendedUsers=[],isLoading:loadingUsers} = useQuery({
    queryKey:["users"],
    queryFn: getRecommendedUsers,
  })

  const{data:outgoingFriendReqs} = useQuery({
    queryKey:["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  })

  const {mutate:sendRequestMutation, isPending} = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess:() => queryClient.invalidateQueries({ queryKey:["outgoingFriendReqs"]}),
  });

  useEffect(()=>{
    const outgoingIds = new Set()
    if(outgoingFriendReqs && outgoingFriendReqs.length>0){
      outgoingFriendReqs.forEach((req)=>{
        outgoingIds.add(req.recipient._id);
      })
      setOutgoingRequestsIds(outgoingIds)
    }
  },[outgoingFriendReqs])

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto space-y-10'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Your Friends</h2>
          <Link to="/notifications" className='btn btn-outline btn-sm gradient-hover'>
              <UsersIcon className='mr-2 size-4'/>
              Friend Requests
          </Link>
        </div>

        {loadingFriends?(
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'/>
          </div>
        ): friends.length=== 0 ? (
          <NoFriendsFound/>
        ):(
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {friends.map((friend)=>(
              <FriendCard key={friend._id} friend={friend}/>
            ))}
          </div>
        )}

        <section>
          <div className='mb-6 sm:mb-8'>
            <div className='flex flex-col sm:flex-row items-start sm:items-start sm:items-center justify-between gap-4'>
              <div>
                <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Meet New Developers</h2>
                <p className='opacity-70'>
                  Discover developers learning similar technologies
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'/>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className='card bg-base-200 p-6 text-center'>
              <h3 className='font-semibold text-lg mb-2'>No recommendations available</h3>
              <p className='text-base-content opacity-70'>
                Check back later for new coding partners!
              </p>
            </div>
          ):(

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {recommendedUsers.map((user)=>{
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                const favoriteTech = ALL_TECHNOLOGIES.find(tech => tech.id === user.nativeLanguage);
                const learningTech = ALL_TECHNOLOGIES.find(tech => tech.id === user.learningLanguage);
                
                return (

                  <div key={user._id}
                  className='card bg-base-200 hover:shadow-xl transition-all duration-300 border border-base-300/50 gradient-hover overflow-hidden'>

                    <div className='card-body p-5 space-y-4 relative z-10'>

                      <div className='flex items-center gap-3'>
                        <div className='avatar'>
                          <div className='size-16 rounded-full ring-2 ring-primary/20'>
                            <img src={user.profilePic} alt={user.fullName} className="w-full h-full rounded-full object-cover" />
                          </div>
                        </div>

                        <div className='flex-1'>
                          <h3 className='font-semibold text-lg'>{user.fullName}</h3>
                          {user.location && (
                            <div className='flex items-center text-xs opacity-70 mt-1'>
                              <MapPinIcon className='size-3 mr-1'/>
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                          {/* Tech Stack with icons */}
                          <div className='flex flex-col gap-2'>
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
                          </div>

                          {user.bio && <p className='text-sm opacity-70 line-clamp-2'>{user.bio}</p>}

                          {/* Action Button */}
                          <button
                            className={`btn w-full mt-2 ${
                              hasRequestBeenSent? "btn-disabled" : "btn-primary"
                            }`}
                            onClick={()=> sendRequestMutation(user._id)}
                            disabled={hasRequestBeenSent || isPending}
                          >
                            {hasRequestBeenSent? (
                              <>
                              <CheckCircleIcon className='size-4 mr-2'/>
                              Request Sent 
                              </>
                            ):(
                              <>
                              <UserPlusIcon className='size-4 mr-2'/>
                              Send Friend Request 
                              </>
                            )}
                          </button>

                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>  
    </div>
  );
} 

export default HomePage;

