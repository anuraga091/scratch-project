// src/components/ReplayControls.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearHistory } from './redux/historySlice';
import {setLoggingEnabled} from './redux/middleware'


const ReplayControls = () => {
  const dispatch = useDispatch();
  const history = useSelector(state => state.history);
  const [isReplaying, setIsReplaying] = useState(false);
  const [nthAction, setNthAction] = useState(0);



    const replayActions = async () => {
      setLoggingEnabled(false);

      dispatch({
        type: 'sprite/resetSpriteState',
        meta: { replay: true }
      }); 

      for (let i = 0; i < history.length; i++) {
        setTimeout(() => {
          dispatch({...history[i].action, meta: { replay: true }});
        }, i * 1000);
      }

      
      setTimeout(() => setLoggingEnabled(true), history.length * 1000);
    };



const replayNthAction = () => {
  if (nthAction > 0 && nthAction <= history.length) {

    setTimeout(() => {
      if (nthAction > 1) {
        const previousAction = history[nthAction - 1];
        dispatch({
          type: 'sprite/setSpriteState',
          payload: previousAction.state,
          meta: { replay: true }
        });
      }
    }, 0); 

    setTimeout(() => {
      const currentAction = history[nthAction];
      dispatch({
        type: 'sprite/setSpriteState',
        payload: currentAction.state,
        meta: { replay: true }
      });
     
    }, 1000);
  }
};

  const handleNthActionChange = (event) => {
    const actionIndex = event.target.value;
    setNthAction(actionIndex);
  };

  const clearActionHistory = () => {
    dispatch(clearHistory());
  };

 

  return (
    <div className="replay-controls flex justify-center">
      <div className="flex my-2">
        <button onClick={replayActions} disabled={isReplaying} className="bg-green-500 text-white px-4 py-2 rounded">
          Replay All Actions
        </button>
        <button onClick={clearActionHistory} className="bg-red-500 text-white px-4 py-2 rounded mx-2">
          Clear History
        </button>
        <input
          type="number"
          value={nthAction}
          min="1"
          max={history.length}
          onChange={handleNthActionChange}
          className="mx-2 px-2 py-1 rounded border"
          placeholder="Enter action number"
        />
        <button onClick={replayNthAction} className="bg-blue-500 text-white px-4 py-2 rounded">Replay Nth Action</button>
      </div>
    </div>
  );
};

export default ReplayControls;
