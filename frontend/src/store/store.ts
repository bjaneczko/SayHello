import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import chatsSlice from './chatsSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    chats: chatsSlice,
  },
});

export default store;
