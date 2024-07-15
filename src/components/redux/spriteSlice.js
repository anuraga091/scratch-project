import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  position: { x: 0, y: 0 },
  rotation: 0,
  message: '',
  messageDuration: 0,
  thinkMessage: '',
  thinkMessageDuration: 0,
  size: 100,
  visible: true,
  waitDuration: 0,

};

const boundaries = {
  minX: 0,
  maxX: 350,
  minY: 0,
  maxY: 500, 
};

const spriteSlice = createSlice({
  name: 'sprite',
  initialState,
  reducers: {
    moveSprite: (state, action) => {
      const { steps } = action.payload;
      const newX = state.position.x + steps * Math.cos((state.rotation * Math.PI) / 180);
      const newY = state.position.y + steps * Math.sin((state.rotation * Math.PI) / 180);

      state.position.x = Math.max(boundaries.minX, Math.min(boundaries.maxX, newX));
      state.position.y = Math.max(boundaries.minY, Math.min(boundaries.maxY, newY));
    },
    turnSprite: (state, action) => {
      state.rotation += action.payload.degrees;
    },
    setPosition: (state, action) => {
      const { x, y } = action.payload;
      state.position.x = Math.max(boundaries.minX, Math.min(boundaries.maxX, x));
      state.position.y = Math.max(boundaries.minY, Math.min(boundaries.maxY, y));
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
    resetSpriteState: (state) => {
      return initialState;
    },
    setSpriteState: (state, action) => {
      return action.payload; 
    },
    setWaitDuration: (state, action) => {
      state.waitDuration = action.payload;

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
  resetSpriteState,
  setSpriteState,
  setWaitDuration,

} = spriteSlice.actions;

export default spriteSlice.reducer;

