// src/components/redux/historySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory: (state, action) => {
      state.push(action.payload);
    },
    clearHistory: () => {
      return [];
    },
  },
});

export const { addHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
