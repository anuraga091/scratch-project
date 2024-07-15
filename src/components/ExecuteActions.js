import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  moveSprite as moveSpriteAction,
  turnSprite as turnSpriteAction,
  setPosition as setPositionAction,
  setMessage as setMessageAction,
  setThinkMessage as setThinkMessageAction,
  setSize as setSizeAction,
  toggleVisibility as toggleVisibilityAction,
  setWaitDuration as setWaitDurationAction,

} from './redux/spriteSlice';
import Icon from './Icon';

const ExecuteActions = () => {
  const dispatch = useDispatch();
  const combinedActions = useSelector(state => state.combinedActions.actions);

  const executeActions = () => {
    let delay = 0;
    combinedActions.forEach(action => {
      setTimeout(() => {
        switch (action.type) {
          case 'move-steps':
            dispatch(moveSpriteAction({ steps: action.props.steps }));
            break;
          case 'rotate-sprite-left':
            dispatch(turnSpriteAction({ degrees: -action.props.leftDegree }));
            break;
          case 'rotate-sprite-right':
            dispatch(turnSpriteAction({ degrees: action.props.rightDegree }));
            break;
          case 'go-to-position':
            dispatch(setPositionAction({ x: action.props.inputX, y: action.props.inputY }));
            break;
          case 'go-to-random-position':
            if (action.props.selectedOption === 'randomPosition') {
              const newX = Math.random() * 300;
              const newY = Math.random() * 300;
              dispatch(setPositionAction({ x: newX, y: newY }));
            } else if (action.props.selectedOption === 'mousePointer') {
              dispatch(setPositionAction({ x: action.props.mousePosition.x, y: action.props.mousePosition.y }));
            }
            break;
          case 'say':
            dispatch(setMessageAction({ message: action.props.message, duration: action.props.duration }));
            break;
          case 'think':
            dispatch(setThinkMessageAction({ thinkMessage: action.props.thinkMessage, thinkDuration: action.props.thinkDuration }));
            break;
          case 'change-size':
            dispatch(setSizeAction(action.props.sizeChange));
            break;
          case 'visible':
            dispatch(toggleVisibilityAction(action.props.visible));
            break;
          case 'wait':
            dispatch(setWaitDurationAction(action.props.waitDuration));
            break;
          default:
            break;
        }
      }, delay);
      delay += (action.type === 'wait') ? action.props.waitDuration * 1000 : 0;
    });
    console.log(delay, 'delay')
  };

  return (
    <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={executeActions}
        >
          {"When "}
          <Icon name="flag" size={15} className="text-green-600 mx-2" />
          {"clicked"}
    </div>
  );
};

export default ExecuteActions;
