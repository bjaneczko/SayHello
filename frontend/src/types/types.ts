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
  chatName: string;
  createdAt: string;
  isGroupChat: boolean;
  latestMessage: string;
  updatedAt: string;
  users: { key: string }[];
}

export interface updateGroupChatProps {
  fetchMessages: Function;
  fetchAgain: boolean;
  setFetchAgain: Function;
  showModal: boolean;
  setShowModal: Function;
}
