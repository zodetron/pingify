import {StreamChat} from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET

if(!apiKey || !apiSecret){
    console.log("Stream api key or secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        //upsert => create or if does exist then update w given data
        return userData;
    } catch (error) {
        console.error("Error upserting stream user",error);
    }
};

//will get back to it later
export const generateStreamToken = (userId) => {};