export interface User {
  _id: string;
  name: string;
  email: string;
  token?: string;
}

export interface Message {
  _id: string;
  sender: User;
  content: string;
  chat: Chat;
  createdAt: string;
  updatedAt: string;
  __V: number;
}

export interface Chat {
  _id: string;
  chatName: string;
  createdAt: string;
  isGroupChat: boolean;
  latestMessage: string;
  updatedAt: string;
  users: User[];
}

export interface updateGroupChatProps {
  fetchMessages: Function;
  fetchAgain: boolean;
  setFetchAgain: Function;
  showModal: boolean;
  setShowModal: Function;
}

export interface ServerToClientEvents {
  connected: () => void;
  typing: () => void;
  stopTyping: () => void;
  messageRecieved: (newMessageRecieved: Message) => void;
}

export interface ClientToServerEvents {
  setup: (user: User) => void;
  joinChat: (selectedChat: Chat) => void;
  typing: (selectedChat: Chat) => void;
  stopTyping: (selectedChat: Chat) => void;
  newMessage: (data: Message) => void;
}
