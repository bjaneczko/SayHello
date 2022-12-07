import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  user: string;
}

const initialState: User = {
  user: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
