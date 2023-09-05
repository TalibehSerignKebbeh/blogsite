import { useState, createContext, useContext } from "react";
import { ImageUrl } from "../api";
import { io } from "socket.io-client";
import { getAuthData } from "../store/store";


export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const role = getAuthData()?.role
    const username = getAuthData()?.username
    const [socket, setsocket] = useState(io(ImageUrl, {
        auth: {
            role: role,
            username:username
        },
        reconnectionAttempts: 3,
        reconnectionDelay: 2000,
        reconnection: true,
        
    }));

    return <SocketContext.Provider
    value={{socket, setsocket}}>
        {children}
    </SocketContext.Provider>
}


export const useScoketContenxt =()=> useContext(SocketContext)

