import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL as string);


const auth = Date.now().toString(32);

socket.auth = { token: auth };
socket.on("connect", () => {
    console.log("socket connected");
});

socket.on("disconnect", () => {
    console.log("socket disconnected");
});

export const SocketContext = createContext<Socket | null>(null);
