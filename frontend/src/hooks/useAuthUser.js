import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getAuthUser } from '../lib/api';

const useAuthUser = () => {
    
//transtack query
  const authUser = useQuery({
    queryKey:["me"],
    queryFn: getAuthUser,
    retry: false, //as it is a auth check so dont retry
  });

  return{ isLoading: authUser.isLoading, authUser:authUser.data?.user}; 

}

export default useAuthUser
