import { createContext } from "react";
import io from "socket.io-client";

export const socket = io(process.env.REACT_APP_URL);
export const SocketContext = createContext();
