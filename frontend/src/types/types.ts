export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface updateGroupChatProps {
  fetchMessages: Function;
  fetchAgain: boolean;
  setFetchAgain: Function;
  showModal: boolean;
  setShowModal: Function;
}
