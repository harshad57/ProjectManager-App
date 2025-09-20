import { io } from "socket.io-client";

const backendurl = import.meta.env.VITE_BACKEND_URL;

export const socket = io(backendurl, {
  withCredentials: true,
});
