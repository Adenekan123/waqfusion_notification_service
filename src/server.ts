import http from "http";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import { onNotificationRead, onUserCheckout, onUserLoggedIn } from "./handlers";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: process.env.CLIENT_BASE_URL || ""
      }
});

const PORT = process.env.PORT || 6500;


io.on('connection',function(socket){
    console.log('a user connected');
    socket.on("userLoggedIn", (payload)=> onUserLoggedIn(payload,socket));
    socket.on("checkout", (payload)=> onUserCheckout(payload,socket));
    socket.on("readNotification", (payload)=> onNotificationRead(payload,socket));
})




server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})