// ES modules
import io from "socket.io-client";
import { BASE_URL } from "../constants/constants";

export const establishSocketConnection = () => {
  return io(BASE_URL);
};
