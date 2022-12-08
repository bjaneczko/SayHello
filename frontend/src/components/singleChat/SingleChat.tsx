import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { setSelectedChat, setNotification } from '../../store/chatsSlice';
import { toast } from 'react-toastify';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { FaArrowLeft, FaPen } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import ScrollableChat from '../scrollableChat/ScrollableChat';
import UpdateGroupChatModal from '../updateGroupChat/UpdateGroupChat';
import { getSender } from '../../utils/getUserInfo';

import {
  Message,
  Chat,
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../types/types';

import {
  ChatHeader,
  InfomationContainer,
  InformationText,
  ChatButton,
  MessagesContainer,
  FormWrapper,
  FormInput,
  Button,
} from './SingleChat.styled';

// const ENDPOINT = 'https://say-hello-coo0.onrender.com';
const ENDPOINT = 'http://localhost:5000';
let socket: Socket<ServerToClientEvents, ClientToServerEvents>;
let selectedChatCompare: Chat;

interface SingleChatProps {
  fetchAgain: boolean;
  setFetchAgain: Function;
}

const SingleChat = ({ fetchAgain, setFetchAgain }: SingleChatProps) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  const selectedChat = useAppSelector((state) => state.chats.selectedChat);
  const notification = useAppSelector((state) => state.chats.notification);

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [newMessage, setNewMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const messageinput = document.getElementById('messageinput');
  const messagebutton = document.getElementById('messagebutton');
  messageinput?.addEventListener('keypress', function onEvent(event) {
    if (event.key === 'Enter') {
      messagebutton?.click();
    }
  });

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on(`typing`, () => setIsTyping(true));
    socket.on(`stopTyping`, () => setIsTyping(false));
  }, [user]);

  useEffect(() => {
    socket.on('messageRecieved', (newMessageRecieved: Message) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          dispatch(setNotification([newMessageRecieved, ...notification]));
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit('joinChat', selectedChat._id);
    } catch (error) {
      toast.error(`Failed to load the messages, please refresh page`, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  const sendMessage = async () => {
    if (newMessage) {
      socket.emit('stopTyping', selectedChat._id);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage('');
        const { data } = await axios.post(
          '/api/message',
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        socket.emit('newMessage', data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error('Failed to send the Message', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    }
  };

  const typingHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stopTyping', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <ChatHeader>
            <ChatButton
              hideOnMobile={true}
              onClick={() => dispatch(setSelectedChat(''))}
            >
              <FaArrowLeft />
            </ChatButton>

            {!selectedChat.isGroupChat ? (
              <>{getSender(user, selectedChat?.users)}</>
            ) : (
              <>
                {selectedChat.chatName}
                <ChatButton onClick={() => openModal}>
                  <FaPen />
                </ChatButton>
              </>
            )}
          </ChatHeader>
          {showModal ? (
            <UpdateGroupChatModal
              showModal={showModal}
              setShowModal={setShowModal}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              fetchMessages={fetchMessages}
            />
          ) : (
            <MessagesContainer>
              {loading ? (
                <p>Loading</p>
              ) : (
                <>
                  <ScrollableChat messages={messages} />
                </>
              )}
              {isTyping && (
                <p>{getSender(user, selectedChat?.users)} is typing...</p>
              )}
              <FormWrapper>
                <FormInput
                  type="text"
                  id="messageinput"
                  placeholder="Write your message.."
                  autoComplete="off"
                  onChange={typingHandler}
                  value={newMessage}
                />
                <Button id="messagebutton" onClick={sendMessage}>
                  <IoIosSend />
                </Button>
              </FormWrapper>
            </MessagesContainer>
          )}
        </>
      ) : (
        <InfomationContainer>
          <InformationText>Nothing here..</InformationText>
          <InformationText>
            Choose existing chat or send new message
          </InformationText>
        </InfomationContainer>
      )}
    </>
  );
};

export default SingleChat;
