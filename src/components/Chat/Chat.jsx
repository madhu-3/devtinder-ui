import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { establishSocketConnection } from "../../Config/Socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import defaultImg from "../../assets/defaultImg.jpeg";

const Chat = () => {
  const { targetId } = useParams();
  const { state } = useLocation();
  const userData = useSelector((store) => store.user.userData);
  const [messageStream, setMessageStream] = useState([]);
  const [message, setMessage] = useState("");

  const fetchChatData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/${targetId}`, {
        withCredentials: true,
      });
      console.log(res.data.messages);
      setMessageStream(res.data?.messages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChatData();
  }, []);

  useEffect(() => {
    if (!userData || !targetId) {
      return;
    }
    const socket = establishSocketConnection();
    socket.on("connect_error", (err) => {
      console.error(err.message);
    });
    socket.emit("joinChat", { fromUserId: userData._id, toUserId: targetId });
    socket.on("messageReceived", ({ firstName, lastName, text, createdAt }) => {
      const senderInfo = {
        senderId: {
          firstName,
          lastName,
        },
        text,
        createdAt,
      };
      setMessageStream((previous) => [...previous, senderInfo]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userData, targetId]);

  const handleSend = (e, type) => {
    console.log("cmg", type);
    if (type === "clickEvent" || (type === "keyEvent" && e.key === "Enter")) {
      const { _id, firstName, lastName } = userData;
      const socket = establishSocketConnection();
      socket.emit("sendMessage", {
        firstName,
        lastName,
        fromUserId: _id,
        toUserId: targetId,
        text: message,
      });
      setMessage("");
    }
  };

  return (
    <div className="relative h-full p-2">
      <div className="flex items-center gap-4">
        <div>Back</div>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={state?.photoUrl ? BASE_URL + state?.photoUrl : defaultImg}
            />
          </div>
        </div>
        <div>{state?.firstName + " " + state?.lastName}</div>
      </div>
      {messageStream && messageStream.length > 0 ? (
        <div className="overflow-scroll h-4/5">
          {messageStream.map((msg, index) => {
            return (
              <div
                key={index}
                className={`chat ${
                  msg?.senderId?.firstName === userData?.firstName
                    ? "chat-end"
                    : "chat-start"
                }`}
              >
                <div className="chat-header">
                  {msg?.senderId?.firstName +
                    " " +
                    msg?.senderId?.lastName +
                    " "}
                  <time className="text-xs opacity-50">
                    {new Date(msg?.createdAt).toLocaleString("en-US", {
                      weekday: "long",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </time>
                </div>
                <div className="chat-bubble">{msg?.text}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center font-bold text-3xl">{`Start Chat with ${state?.firstName} ${state?.lastName}`}</div>
      )}

      <div className="absolute bottom-3 w-full flex justify-center gap-4 p-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => handleSend(e, "keyEvent")}
          className="border border-black rounded-lg flex-1 pl-2"
        />
        <button
          className="btn btn-secondary"
          onClick={(e) => handleSend(e, "clickEvent")}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
