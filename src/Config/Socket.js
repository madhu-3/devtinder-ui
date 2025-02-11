// ES modules
import { io } from "socket.io-client";
import { BASE_URL } from "../constants/constants";

const getCookie = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookieKeyValPair = cookies[i].trim();
    if (cookieKeyValPair.indexOf("token") === 0) {
      const cookieVal = cookieKeyValPair.slice(6);
      return cookieVal;
    }
  }
  return "";
};

export const establishSocketConnection = () => {
  const tokenVal = getCookie();
  return io(BASE_URL, {
    withCredentials: true,
    auth: {
      token: tokenVal,
    },
  });
};
