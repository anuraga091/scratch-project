import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  actions: []
};

const combinedActionsSlice = createSlice({
  name: 'combinedActions',
  initialState,
  reducers: {
    addCombinedAction: (state, action) => {
      const { type, props } = action.payload;
      const serializableProps = { ...props };
      Object.keys(serializableProps).forEach(key => {
        if (typeof serializableProps[key] === 'function') {
          delete serializableProps[key];
        }
      });
      state.actions.push({ type, props: serializableProps });
    },
    clearCombinedActions: (state) => {
      state.actions = [];
    },
    executeCombinedActions: (state, action) => {
      
    }
  },
});

export const { addCombinedAction, clearCombinedActions, executeCombinedActions } = combinedActionsSlice.actions;
export default combinedActionsSlice.reducer;
