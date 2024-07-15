import { configureStore } from '@reduxjs/toolkit';
import spriteReducer from './spriteSlice';
import historyReducer from './historySlice';
import combinedActionsReducer from './combinedActionsSlice';
import { captureActionEffectsMiddleware } from './middleware';
import {thunk} from 'redux-thunk';



const store = configureStore({
  reducer: {
    sprite: spriteReducer,
    history: historyReducer,
    combinedActions: combinedActionsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, captureActionEffectsMiddleware),
});

export default store;
