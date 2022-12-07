import { createSlice } from '@reduxjs/toolkit';

interface User {
  user:
    | {
        _id: string;
        name: string;
        email: string;
        token: string;
      }
    | '';
}

const initialState: User = {
  user: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
