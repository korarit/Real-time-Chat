import express,{Express} from "express";
import {createServer} from "http";
import {Server} from "socket.io";


const app: Express = express();
const httpServer  = createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin:"*",
    },
});

io.on("connection",(socket)=>{
    console.log("connected");

    // ผู้ใช้ join room main (เตรียมไว้ทำ V2 ในอนาคต)
    socket.join("main");

    // ผู้ใช้ส่งข้อความ มาที่ server
    socket.on("sendMessage",(message)=>{
        console.log(message);
        io.to("main").emit("message", message);
    });


    // ผู้ใช้ disconnect
    socket.on("disconnect",()=>{
        socket.leave("main");
        console.log("disconnected");
    });
});


httpServer.listen(3000,()=>{
    console.log("backend is running on port 3000");
});