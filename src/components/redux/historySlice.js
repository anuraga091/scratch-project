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
    replayHistory: (state, action) => {
      return state.slice(0, action.payload);
    }
  },
});

export const { addHistory, clearHistory, replayHistory } = historySlice.actions;
export default historySlice.reducer;
