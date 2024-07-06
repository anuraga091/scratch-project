import { createSlice } from '@reduxjs/toolkit';
import { addHistory } from './historySlice';


const initialState = {
  position: { x: 0, y: 0 },
  rotation: 0,
  message: '',
  messageDuration: 0,
  thinkMessage: '',
  thinkMessageDuration: 0,
  size: 100,
  visible: true,
};

const spriteSlice = createSlice({
  name: 'sprite',
  initialState,
  reducers: {
    moveSprite: (state, action) => {
      const { steps } = action.payload;
      state.position.x += steps * Math.cos((state.rotation * Math.PI) / 180);
      state.position.y += steps * Math.sin((state.rotation * Math.PI) / 180);
    },
    turnSprite: (state, action) => {
      state.rotation += action.payload.degrees;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.messageDuration = action.payload.duration;
    },
    clearMessage: (state) => {
      state.message = '';
      state.messageDuration = 0;
    },
    setThinkMessage: (state, action) => {
      state.thinkMessage = action.payload.thinkMessage;
      state.thinkMessageDuration = action.payload.thinkDuration;
    },
    clearThinkMessage: (state) => {
      state.thinkMessage = '';
      state.thinkMessageDuration = 0;
    },
    setSize: (state, action) => {
      state.size += action.payload;
    },
    toggleVisibility: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export const {
  moveSprite,
  turnSprite,
  setPosition,
  setMessage,
  clearMessage,
  setThinkMessage,
  clearThinkMessage,
  setSize,
  toggleVisibility,
} = spriteSlice.actions;

export default spriteSlice.reducer;

const logToHistoryMiddleware = ({ dispatch }) => (next) => (action) => {
  const result = next(action);
  if (action.type.startsWith('sprite/')) {
    dispatch(addHistory(action));
  }
  return result;
};

export { logToHistoryMiddleware };
