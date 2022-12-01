import React, { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import { getSender } from '../../config/ChatLogic';
import { FaArrowLeft, FaEye, FaPen } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import ScrollableChat from '../scrollableChat/ScrollableChat';
import UpdateGroupChatModal from '../updateGroupChatModal/UpdateGroupChatModal';
import io from 'socket.io-client';

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

// const ENDPOINT = "https://say-hello-coo0.onrender.com";
const ENDPOINT = 'http://localhost:5000';
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  const [messages, setMessages] = useState([]);
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
  messageinput?.addEventListener('keypress', function onEvent(event) {
    if (event.key === 'Enter') {
      document.getElementById('messagebutton').click();
    }
  });

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    const fallbackUser = JSON.parse(localStorage.getItem('userInfo'));
    socket.emit('setup', fallbackUser);
    socket.on('connected', () => setSocketConnected(true));
    socket.on(`typing`, () => setIsTyping(true));
    socket.on(`stop typing`, () => setIsTyping(false));
  }, []);

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
        // console.log(user);
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
      socket.emit('join chat', selectedChat._id);
    } catch (error) {
      console.log(`Failed to Load the Messages`);
    }
  };

  const sendMessage = async (event) => {
    if (newMessage) {
      socket.emit('stop typing', selectedChat._id);
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

        socket.emit('new message', data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log('Failed to send the Message');
      }
    }
  };

  const typingHandler = (e) => {
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
        socket.emit('stop typing', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <UpdateGroupChatModal
            showModal={showModal}
            setShowModal={setShowModal}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            fetchMessages={fetchMessages}
          />
          <ChatHeader>
            <ChatButton hideOnMobile={true} onClick={() => setSelectedChat('')}>
              <FaArrowLeft />
            </ChatButton>

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ChatButton onClick={() => console.log('Modal opened')}>
                  <FaEye />
                </ChatButton>
              </>
            ) : (
              <>
                <p>{selectedChat.chatName}</p>
                <ChatButton onClick={openModal}>
                  <FaPen />
                </ChatButton>
              </>
            )}
          </ChatHeader>

          <MessagesContainer>
            {loading ? (
              <p>Loading</p>
            ) : (
              <>
                <ScrollableChat messages={messages} />
              </>
            )}
            {isTyping && <p>Typing...</p>}
            <FormWrapper>
              <FormInput
                type="text"
                id="messageinput"
                placeholder="Write your message.."
                onChange={typingHandler}
                value={newMessage}
              />
              <Button id="messagebutton" onClick={sendMessage}>
                <IoIosSend />
              </Button>
            </FormWrapper>
          </MessagesContainer>
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
