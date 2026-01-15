import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { acceptFriendRequest, getFriendRequests } from '../lib/api';
import {BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon} from 'lucide-react'
import NoNotificationsFound from '../components/NoNotificationsFound';
import { ALL_TECHNOLOGIES } from '../constants';

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const {data:friendRequests,isLoading} = useQuery({
    queryKey:["friendRequests"],
    queryFn: getFriendRequests,
  })

  const {mutate:acceptRequestMutation,isPending} = useMutation({
    mutationFn:acceptFriendRequest,
    onSuccess: ()=> {
      queryClient.invalidateQueries({queryKey:["friendRequests"] });
      queryClient.invalidateQueries({queryKey:["friends"] });
  },
});

const incomingRequests = friendRequests?.incomingRequests || []
const acceptedRequests = friendRequests?.acceptedRequests || []

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto max-w-4xl space-y-8'>
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight mb-6'>Notifications</h1>

        {isLoading? (
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'></span>
          </div>
        ) : (
          <>
            {incomingRequests.length>0 && (
              <section className='space-y-4'>
                <h2 className='text-xl font-semibold flex items-center gap-2'>
                  <UserCheckIcon/>
                  Friend Requests
                  <span className='badge badge-primary ml-2'>{incomingRequests.length}</span>
                  </h2>

                <div className='space-y-3'> 
                  {incomingRequests.map((request) =>{
                    const favoriteTech = ALL_TECHNOLOGIES.find(tech => tech.id === request.sender.nativeLanguage);
                    const learningTech = ALL_TECHNOLOGIES.find(tech => tech.id === request.sender.learningLanguage);
                    
                    return (
                    <div
                      key={request._id}
                      className='card bg-base-200 shadow-sm hover:shadow-md transition-shadow gradient-hover overflow-hidden'
                      >
                      <div className='card-body p-4 relative z-10'>
                        <div className='flex items-center justify-between gap-4'>
                          <div className='flex items-center gap-3 flex-1'>
                            <div className='avatar'>
                              <div className='w-14 h-14 rounded-full ring-2 ring-primary/20'>
                                <img src={request.sender.profilePic} alt={request.sender.fullName} />
                              </div>
                            </div>
                            <div className='flex-1'>
                              <h3 className='font-semibold'>{request.sender.fullName}</h3>
                              <div className='flex flex-wrap gap-2 mt-2'>
                                {favoriteTech && (
                                  <div className='flex items-center gap-1 bg-base-300/50 rounded-lg px-2 py-1'>
                                    <i className={`${favoriteTech.icon} text-sm`} style={{ color: favoriteTech.color }}></i>
                                    <span className='text-xs font-semibold'>{favoriteTech.label}</span>
                                  </div>
                                )}
                                {learningTech && (
                                  <div className='flex items-center gap-1 bg-base-300/50 rounded-lg px-2 py-1'>
                                    <i className={`${learningTech.icon} text-sm`} style={{ color: learningTech.color }}></i>
                                    <span className='text-xs font-semibold'>{learningTech.label}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                      <button
                        className='btn btn-primary btn-sm'
                        onClick={()=> acceptRequestMutation(request._id)}
                        disabled={isPending}
                        >
                        Accept
                      </button>

                      </div>
                    </div>
                  </div>

                  )})}

                </div>
              </section>
            )}

            {/*Accepted Reqs Notifs */}
            {acceptedRequests.length > 0 && (
            <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
            <BellIcon className="h-5 w-5 text-success" />
            New Connections
            </h2>

            <div className="space-y-3">
            {acceptedRequests.map((notification) => (
            <div key={notification._id} className="card bg-base-200 shadow-sm">
            <div className="card-body p-4">
            <div className="flex items-start gap-3">
              <div className="avatar mt-1">
                <div className='size-10 rounded-full ring-2 ring-success/20'>
                  <img
                    src={notification.recipient.profilePic}
                    alt={notification.recipient.fullName}
                  />
                </div>
              </div>
            <div className="flex-1">
              <h3 className="font-semibold">{notification.recipient.fullName}</h3>
              <p className="text-sm my-1">
                {notification.recipient.fullName} accepted your friend request
              </p>
              <p className="text-xs flex items-center opacity-70">
              <ClockIcon className="h-3 w-3 mr-1" />
              Recently
              </p>
              </div>
              <div className="badge badge-success">
              <MessageSquareIcon className="h-3 w-3 mr-1" />
              New Friend
              </div>
              </div>
              </div>
              </div>
            ))}
            </div>
            </section>
            )}

            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
            <NoNotificationsFound/>
            )}
          </>
        )}
      </div>
      
    </div>
  )
}

export default NotificationsPage;
