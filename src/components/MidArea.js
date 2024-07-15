import React, { useState, useEffect } from "react";
import { useDrop } from 'react-dnd';
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
} from '../components/redux/spriteSlice';
//import { addHistory } from '../components/redux/historySlice';
import { addCombinedAction } from '../components/redux/combinedActionsSlice';



const MidArea = () => {
  const sprite = useSelector(state => state.sprite);
  const [droppedItems, setDroppedItems] = useState([]);

  const [inputX, setInputX] = useState(sprite.position.x);
  const [inputY, setInputY] = useState(sprite.position.y);
  const [steps, setSteps] = useState(15);
  const [rightDegree, setRightDegree] = useState(15);
  const [leftDegree, setLeftDegree] = useState(15);
  const [selectedOption, setSelectedOption] = useState('randomPosition');
  const [message, setMessage] = useState('Hello!');
  const [duration, setDuration] = useState(2);
  const [thinkMessage, setThinkMessage] = useState('hmmm....');
  const [thinkDuration, setThinkDuration] = useState(2);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sizeChange, setSizeChange] = useState(20);
  const [visible, setVisible] = useState(true);
  const [waitDuration, setWaitDuration] = useState(1);

  const dispatch = useDispatch();


  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [sprite.position]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [
      'move-steps',
      'rotate-sprite-left',
      'rotate-sprite-right',
      'go-to-position',
      'go-to-random-position',
      'say',
      'think',
      'change-size',
      'visible',
      'wait'
    ],
    drop: (item) => addDroppedItem(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addDroppedItem = (item) => {
    setDroppedItems(prevItems => [
      ...prevItems,
      { id: prevItems.length, type: item.type, props: { ...item.props } }
    ]);
    dispatch(addCombinedAction(item));

  };

  // const handleAction = (type, payload) => {
  //   dispatch(addHistory({ type, payload, timestamp: Date.now() }));
  // };



  const renderDroppedItem = (item, index) => {
    
    switch (item.type) {
      case 'move-steps':
        return (
          <div key={index} className="bg-blue-500 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer w-48"
            onClick={() => {
              dispatch(moveSpriteAction({ steps: Number(steps) }));
              //handleAction('move-steps', { steps: Number(steps) });
            }}  
          >
            <span>move</span>
            <input
              type="number"
              defaultValue={item.props.steps || 15}
              onChange={(e) => setSteps(e.target.value)}
              className="bg-white-300 text-black rounded text-center mx-2 w-8 text-sm"
            />
            <span>steps</span>
          </div>
        );
      case 'rotate-sprite-left':
        return (
          <div key={index} className="bg-blue-500 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer w-48"
            onClick={() => {
              dispatch(turnSpriteAction({ degrees: -Number(leftDegree) }))
              //handleAction('rotate-sprite-left', { degrees: -Number(leftDegree) });
            }}
          >
            <span>Turn</span>
            <input
              type="number"
              value={leftDegree}
              defaultValue={item.props.leftDegree || 15}
              onChange={(e) => setLeftDegree(e.target.value)}
              className="bg-white-300 text-black rounded text-center mx-2 w-8 text-sm"
            />
            <span>degrees left</span>
          </div>
        );
      case 'rotate-sprite-right':
        return (
          <div key={index} className="bg-blue-500 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer w-48"
            onClick={() => {
              dispatch(turnSpriteAction({ degrees: Number(rightDegree) }));
              //handleAction('rotate-sprite-right', { degrees: Number(rightDegree) });
            }}
          >
            <span>Turn</span>
            <input
              type="number"
              value={rightDegree}
              defaultValue={item.props.rightDegree || 15}
              onChange={(e) => setRightDegree(e.target.value)}
              className="bg-white-300 text-black rounded text-center mx-2 w-8 text-sm"
            />
            <span>degrees right</span>
          </div>
        );
      case 'go-to-position':
        return (
          <div key={index} className="bg-blue-500 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer w-52"
            onClick={() => {
              dispatch(setPositionAction({ x: parseFloat(inputX), y: parseFloat(inputY) }));
              //handleAction('go-to-position', { x: parseFloat(inputX), y: parseFloat(inputY)});
            }}
          >
            <span>go to x:</span>
            <input
              type="number"
              value={inputX}
              defaultValue={item.props.inputX || 0}
              onChange={(e) => setInputX(e.target.value)}
              className="bg-white-300 text-black rounded text-center mx-2 w-12 text-sm"
            />
            <span>y:</span>
            <input
              type="number"
              value={inputY}
              defaultValue={item.props.inputY || 0}
              onChange={(e) => setInputY(e.target.value)}
              className="bg-white-300 text-black rounded text-center mx-2 w-12 text-sm"
            />
          </div>
        );
      case 'go-to-random-position':
        return (
          <div key={index} className="bg-blue-500 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer w-52"
            onClick={() => {
              if (selectedOption === 'randomPosition') {
                const newX = Math.random() * 300;
                const newY = Math.random() * 300;
                dispatch(setPositionAction({ x: newX, y: newY }));
                //handleAction('go-to-random-position', { x: newX, y: newY });
              } else if (selectedOption === 'mousePointer') {
                dispatch(setPositionAction({ x: mousePosition.x, y: mousePosition.y }));
                //handleAction('go-to-random-position', { x: mousePosition.x, y: mousePosition.y });
              }
            }}
          >
            <span>go to</span>
            <select
              className="mx-2 bg-blue-400 text-white font-bold rounded text-center cursor-pointer"
              value={selectedOption}
              defaultValue={item.props.selectedOption || 'randomPosition'}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="randomPosition">Random Position</option>
              <option value="mousePointer">Mouse Pointer</option>
            </select>
          </div>
        );
      case 'say':
        return (
          <div key={index} className="bg-purple-500 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer w-56"
            onClick={() => {
              dispatch(setMessageAction({ message, duration }));
              //handleAction('say', { message, duration });
            }}
          >
            <span>say</span>
            <input
              type="text"
              value={message}
              defaultValue={item.props.message || 'Hello!'}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white-300 text-black rounded text-center mx-2 w-12 text-sm"
            />
            <span>for</span>
            <input
              type="number"
              value={duration}
              defaultValue={item.props.duration || 2}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-white-300 text-black rounded text-center w-8 mx-2 text-sm"
            />
            <span>seconds</span>
          </div>
        );
      case 'think':
        return (
          <div key={index} className="bg-purple-500 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer w-56"
            onClick={() => {
              dispatch(setThinkMessageAction({ thinkMessage, thinkDuration }));
              //handleAction('think', { thinkMessage, thinkDuration });
            }}
          >
            <span>think</span>
            <input
              type="text"
              value={thinkMessage}
              defaultValue={item.props.thinkMessage || 'Hmmm...'}
              onChange={(e) => setThinkMessage(e.target.value)}
              className="bg-white-300 text-black rounded text-center mx-2 w-12 text-sm"
            />
            <span>for</span>
            <input
              type="number"
              value={thinkDuration}
              defaultValue={item.props.thinkDuration || 2}
              onChange={(e) => {
                setThinkDuration(e.target.value)
              }}
              className="bg-white-300 text-black rounded text-center w-8 mx-2 text-sm"
            />
            <span>seconds</span>
          </div>
        );
      case 'change-size':
        return (
          <div key={index} className="bg-purple-500 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer w-52"
            onClick={() => {
              dispatch(setSizeAction(Number(sizeChange)));
              //handleAction('change-size', { sizeChange });
            }}
          >
            <span>change size by</span>
            <input
              type="number"
              value={sizeChange}
              defaultValue={item.props.sizeChange || 20}
              onChange={(e) => setSizeChange(e.target.value)}
              className="bg-white-300 text-black rounded text-center mx-2 w-12 text-sm"
            />
            
          </div>
        );
      case 'visible':
        return (
          <div key={index} className="bg-purple-500 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer w-16"
            onClick={() => {
              dispatch(toggleVisibilityAction(!sprite.visible));
              //handleAction('visible', { visible: !sprite.visible });
            }}
          >
          <span>{sprite.visible ? 'hide' : 'show'}</span>
        </div>
        );
      case 'wait':
        return (
          <div key={index} className="bg-yellow-600 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer w-52"
            onClick={() => {
              dispatch(setWaitDurationAction(Number(waitDuration)))
              //handleAction('wait', { waitDuration });
            }}
          >
            <span>wait</span>
            <input
              type="number"
              value={waitDuration}
              onChange={(e) => setWaitDuration(e.target.value)}
              className="bg-white-300 text-black rounded text-center mx-2 w-8 text-sm"
            />
            
            <span>seconds</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={drop} className={`flex-1 h-full p-4 ${isOver ? 'bg-blue-100' : 'bg-white'}`}>
      {droppedItems.map((item, index) => renderDroppedItem(item, index))}
    </div>
  );
};

export default MidArea;
