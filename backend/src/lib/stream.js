import pkg from "stream-chat";
import "dotenv/config"
const { StreamChat } = pkg;
const apikey=process.env.STREAM_API_KEY
const apiSecret=process.env.STREAM_API_SECRET
if(!apikey||!apiSecret){
    console.error("stream api key or secret is missing ")
}
const streamClient=StreamChat.getInstance(apikey,apiSecret);
export const upsertStreamUser=async (userData)=>{
    try{
        await streamClient.upsertUsers([userData]);
        return userData;
    }catch(error){
        console.log("error upserting stream users",error);
console.error(error.stack);
    }
};
export const generateStreamToken=(userId)=>{};