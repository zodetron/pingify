import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api';

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from 'stream-chat';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY


const ChatPage = () => {
  const {id:targetUserId} = useParams ();

  const [chatClient, setChatClient] = useState (null);
  const [channel, setChannel] = useState (null);
  const [loading, setLoading] = useState (null);

  const {authUser} = useAuthUser();

  const {data} = useQuery({
    queryKey:["streamToken"],
    queryFn:getStreamToken,
    enabled: !!authUser //this will run only when authUser is available 
  });

  useEffect(()=>{
    const initChat = async () => {
      if(!tokenData?.token || !authUser) return;
      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser({
          id: authUser._id,
          name:authUser.fullName,
          image:authUser.profilePic,
        },tokenData.data)

        //Create Channel
        const channelId = [authUser._id,targetUserId].sort().join("-");

        //You and me 
        //if i start the chat => [myId,yourId]
        //if you start the chat => [yourId,myId] => [myId,yourId]

        const currChannel = client.channel("messaging",channelId,{
          members: [authUser._id,targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
        
      } catch (error) {
        console.error("Error in initializing chat:",error);
      } finally {
        setLoading(false);
      }
    }
    initChat();
  },[]);

  

  return (
    <div>
      Chat Page
    </div>
  )
}

export default ChatPage
