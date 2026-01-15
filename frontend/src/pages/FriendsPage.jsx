import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getUserFriends } from '../lib/api';
import { Search, Users, UserX } from 'lucide-react';
import FriendCard from '../components/FriendCard';
import NoFriendsFound from '../components/NoFriendsFound';
import { ALL_TECHNOLOGIES } from '../constants';

const FriendsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTech, setFilterTech] = useState('all');

  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // Filter friends based on search and tech filter
  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         friend.bio?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTech = filterTech === 'all' || 
                       friend.nativeLanguage === filterTech || 
                       friend.learningLanguage === filterTech;
    
    return matchesSearch && matchesTech;
  });

  // Get unique technologies from friends
  const friendTechnologies = new Set();
  friends.forEach(friend => {
    if (friend.nativeLanguage) friendTechnologies.add(friend.nativeLanguage);
    if (friend.learningLanguage) friendTechnologies.add(friend.learningLanguage);
  });

  const availableTechs = ALL_TECHNOLOGIES.filter(tech => 
    friendTechnologies.has(tech.id)
  );

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto space-y-6'>
        
        {/* Header */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-3'>
            <Users className='size-8 text-primary' />
            <h1 className='text-3xl sm:text-4xl font-bold tracking-tight'>
              My Friends
            </h1>
          </div>
          <p className='text-base-content/70'>
            Connect and collaborate with your developer friends
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className='card bg-base-200 shadow-sm gradient-overlay'>
          <div className='card-body p-4'>
            <div className='flex flex-col lg:flex-row gap-4'>
              
              {/* Search Input */}
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-base-content/50' />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search friends by name or bio..."
                  className='input input-bordered w-full pl-10'
                />
              </div>

              {/* Tech Filter */}
              <div className='lg:w-64'>
                <select
                  value={filterTech}
                  onChange={(e) => setFilterTech(e.target.value)}
                  className='select select-bordered w-full'
                >
                  <option value="all">All Technologies</option>
                  {availableTechs.map(tech => (
                    <option key={tech.id} value={tech.id}>
                      {tech.label}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Active Filters Display */}
            {(searchQuery || filterTech !== 'all') && (
              <div className='flex flex-wrap gap-2 mt-3 pt-3 border-t border-base-300'>
                <span className='text-sm text-base-content/70'>Active filters:</span>
                {searchQuery && (
                  <div className='badge badge-primary gap-2'>
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className='hover:text-error'>
                      ×
                    </button>
                  </div>
                )}
                {filterTech !== 'all' && (
                  <div className='badge badge-secondary gap-2'>
                    Tech: {ALL_TECHNOLOGIES.find(t => t.id === filterTech)?.label}
                    <button onClick={() => setFilterTech('all')} className='hover:text-error'>
                      ×
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        {!isLoading && friends.length > 0 && (
          <div className='stats stats-vertical lg:stats-horizontal shadow w-full bg-base-200 gradient-overlay'>
            <div className='stat'>
              <div className='stat-figure text-primary'>
                <Users className='size-8' />
              </div>
              <div className='stat-title'>Total Friends</div>
              <div className='stat-value text-primary'>{friends.length}</div>
              <div className='stat-desc'>Your developer network</div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-secondary'>
                <Search className='size-8' />
              </div>
              <div className='stat-title'>Filtered Results</div>
              <div className='stat-value text-secondary'>{filteredFriends.length}</div>
              <div className='stat-desc'>Matching your criteria</div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-accent'>
                <svg className='size-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <div className='stat-title'>Technologies</div>
              <div className='stat-value text-accent'>{friendTechnologies.size}</div>
              <div className='stat-desc'>Unique tech stacks</div>
            </div>
          </div>
        )}

        {/* Friends Grid */}
        {isLoading ? (
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg' />
          </div>
        ) : filteredFriends.length === 0 ? (
          searchQuery || filterTech !== 'all' ? (
            <div className='card bg-base-200 shadow-sm'>
              <div className='card-body items-center text-center py-12'>
                <UserX className='size-16 text-base-content/30 mb-4' />
                <h3 className='text-xl font-semibold mb-2'>No friends found</h3>
                <p className='text-base-content/70 mb-4'>
                  No friends match your current filters
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setFilterTech('all');
                  }}
                  className='btn btn-primary btn-sm'
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <NoFriendsFound />
          )
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {filteredFriends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default FriendsPage;
