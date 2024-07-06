import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { replayHistory, clearHistory } from '../components/redux/historySlice';
import {
  moveSprite as moveSpriteAction,
  turnSprite as turnSpriteAction,
  setPosition as setPositionAction,
  setMessage as setMessageAction,
  setThinkMessage as setThinkMessageAction,
  setSize as setSizeAction,
  toggleVisibility as toggleVisibilityAction,
} from '../components/redux/spriteSlice';

const ReplayControls = () => {
  const dispatch = useDispatch();
  const history = useSelector(state => state.history);
  const [actionIndex, setActionIndex] = useState(0);

  const replayAction = (action) => {
    switch (action.type) {
      case 'sprite/moveSprite':
        dispatch(moveSpriteAction(action.payload));
        break;
      case 'sprite/turnSprite':
        dispatch(turnSpriteAction(action.payload));
        break;
      case 'sprite/setPosition':
        dispatch(setPositionAction(action.payload));
        break;
      case 'sprite/setMessage':
        dispatch(setMessageAction(action.payload));
        break;
      case 'sprite/setThinkMessage':
        dispatch(setThinkMessageAction(action.payload));
        break;
      case 'sprite/setSize':
        dispatch(setSizeAction(action.payload));
        break;
      case 'sprite/toggleVisibility':
        dispatch(toggleVisibilityAction(action.payload));
        break;
      default:
        break;
    }
  };

  const handleReplayAll = () => {
    history.forEach(action => {
      replayAction(action);
    });
  };

  const handleReplayNth = () => {
    const action = history[actionIndex];
    if (action) {
      replayAction(action);
    }
  };

  return (
    <div className="replay-controls flex justify-center">
      
      <div className="flex my-2">
        <button onClick={handleReplayAll} className="bg-green-500 text-white px-4 py-2 rounded">Replay All Actions</button>
        <button onClick={() => dispatch(clearHistory())} className="bg-red-500 text-white px-4 py-2 rounded mx-2">Clear History</button>
        <input
          type="number"
          value={actionIndex}
          onChange={(e) => setActionIndex(Number(e.target.value))}
          className="bg-white text-black rounded px-2 py-1 mr-2"
        />
        <button onClick={handleReplayNth} className="bg-blue-500 text-white px-4 py-2 rounded">Replay Nth Action</button>
      </div>
    </div>
  );
};

export default ReplayControls;
