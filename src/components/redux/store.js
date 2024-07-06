import { configureStore } from '@reduxjs/toolkit';
import spriteReducer, { logToHistoryMiddleware } from './spriteSlice';
import historyReducer from './historySlice';


const store = configureStore({
  reducer: {
    sprite: spriteReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logToHistoryMiddleware),
});

export default store;
