import React, {useState, useEffect, useRef} from "react";
import Icon from "./Icon";
import { useDispatch, useSelector } from 'react-redux';
import {
  moveSprite as moveSpriteAction,
  turnSprite as turnSpriteAction,
  setPosition as setPositionAction,
  setMessage as setMessageAction,
  setThinkMessage as setThinkMessageAction,
  setSize as setSizeAction,
  toggleVisibility as toggleVisibilityAction
} from '../components/redux/spriteSlice';
import { addHistory } from '../components/redux/historySlice';
import DraggableItem from "./DraggableItem";

export default function Sidebar() {
  const dispatch = useDispatch();
  const sprite = useSelector(state => state.sprite);

  const [inputX, setInputX] = useState(sprite.position.x);
  const [inputY, setInputY] = useState(sprite.position.y);
  const [steps, setSteps] = useState(15);
  const [rightDegree, setRightDegree] = useState(15)
  const [leftDegree, setLeftDegree] = useState(15)
  const [selectedOption, setSelectedOption] = useState('randomPosition');
  const [message, setMessage] = useState('Hello!');
  const [duration, setDuration] = useState(2);
  const [thinkMessage, setThinkMessage] = useState('hmmm....')
  const [thinkDuration, setThinkDuration] = useState(2)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sizeChange, setSizeChange] = useState(20);




  useEffect(() => {
    setInputX(sprite.position.x);
    setInputY(sprite.position.y);

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

  const handleGreenFlagClick = () => {

  }

  const handleSpriteClick = () => {

  }


  const moveSprite = () => {
    dispatch(moveSpriteAction({ steps}));

  };

  const rotateSprite = (direction) => {
    dispatch(turnSpriteAction({ degrees: direction === 'left' ? -leftDegree : rightDegree }));
  }

  const goToRandomPosition = () => {
    if (selectedOption === 'randomPosition') {
      const newX = Math.random() * 300;
      const newY = Math.random() * 300;
      dispatch(setPositionAction({ x: newX, y: newY }));
    } else if (selectedOption === 'mousePointer') {
      console.log(mousePosition)
      dispatch(setPositionAction({ x: mousePosition.x, y: mousePosition.y }));
    }
  };

  const goToPosition = () => {
    dispatch(setPositionAction({ x: parseFloat(inputX), y: parseFloat(inputY) }));
  };

  const handleSelect = (e) => {
    const selected = e.target.value;
    setSelectedOption(selected);
    
  };

  const handleSay = () => {
    dispatch(setMessageAction({ message, duration }));
  };

  const handleThink = () => {
    dispatch(setThinkMessageAction({ thinkMessage, thinkDuration }));
  };

  const handleChangeSize = () => {
    dispatch(setSizeAction(sizeChange));
  };

  const handleToggleVisibility = () => {
    dispatch(toggleVisibilityAction(!sprite.visible));
  };

  const options = [
    { value: 'randomPosition', label: 'Random Position' },
    { value: 'mousePointer', label: 'Mouse Pointer' }
  ];

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">

      {/* ----------------------------------------Events Section---------------------------------------------- */}

      <div className="font-bold"> {"Events"} </div>

      <DraggableItem type="flag" props={{}}>
        <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={handleGreenFlagClick}
        >
          {"When "}
          <Icon name="flag" size={15} className="text-green-600 mx-2" />
          {"clicked"}
        </div>
      </DraggableItem>

      <DraggableItem type="sprite" props={{}}>
        <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={handleSpriteClick}
        >
          {"When this sprite clicked"}
        </div>
      </DraggableItem>

      {/* ----------------------------------------Motion Section--------------------------------------------- */}

      <div className="font-bold"> {"Motion"} </div>
      <DraggableItem type="move-steps" props={{ steps, setSteps, moveSprite }}>
        <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={moveSprite}
        >
          <span>move</span>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="bg-white-300 text-black rounded text-center mx-2 w-8 text-sm"
          />
          <span>steps</span>
        </div>
      </DraggableItem>

      <DraggableItem type="rotate-sprite-left" props={{ leftDegree, setLeftDegree, rotateSprite }}>
        <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => rotateSprite('left')}
        >
          {"Turn "}
          <Icon name="undo" size={15} className="text-white mx-2" />
          <input
            type="number"
            value={leftDegree}
            onChange={(e) => setLeftDegree(e.target.value)}
            className="bg-white-300 text-black rounded text-center mx-2 w-8 text-sm"
          />
          {"degrees"}
        </div>
      </DraggableItem>

      <DraggableItem type="rotate-sprite-right" props={{ rightDegree, setRightDegree, rotateSprite }}>
        <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => rotateSprite('right')}
        >
          {"Turn "}
          <Icon name="redo" size={15} className="text-white mx-2" />
          <input
            type="number"
            value={rightDegree}
            onChange={(e) => setRightDegree(e.target.value)}
            className="bg-white-300 text-black rounded text-center mx-2 w-8 text-sm"
          />
          {"degrees"}
        </div>
      </DraggableItem>

      <DraggableItem type="go-to-position" props={{ inputX, setInputX, inputY, setInputY, goToPosition }}>
        <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={goToPosition}
        >
          <span>go to x:</span>
          <input
            type="number"
            className="mx-2 w-12 bg-white-200 text-black rounded text-center"
            value={inputX}
            onChange={(e) => setInputX(e.target.value)}
          />
          <span>y:</span>
          <input
            type="number"
            className="mx-2 w-12 bg-white-200 text-black rounded text-center"
            value={inputY}
            onChange={(e) => setInputY(e.target.value)}
          />
        </div>
      </DraggableItem>
      
      <DraggableItem type='go-to-random-position' props={{ selectedOption, setSelectedOption, options, handleSelect, goToRandomPosition }}>
        <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={goToRandomPosition}
        >
          <span className="mr-2">go to</span>
          <select
            className="mx-2 bg-blue-400 text-white font-bold rounded text-center cursor-pointer"
            value={selectedOption}
            onChange={handleSelect}
          >
            {options.map(option => (
              <option
                key={option.value}
                value={option.value}
                className={`bg-red-500 hover:bg-red-700 ${selectedOption === option.value ? 'bg-red-700' : 'bg-red-300'}`}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </DraggableItem>
      
      

      {/* -----------------------------------------Looks Section----------------------------------------- */}

      <div className="font-bold"> {"Looks"} </div>
      <DraggableItem type='say' props={{ message, setMessage, duration, setDuration, handleSay }}>
        <div className="bg-purple-500 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={handleSay}
        >
          <span>say</span>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white-300 text-black rounded text-center mx-2 w-12 text-sm"
          />
          <span>for</span>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="bg-white-300 text-black rounded text-center w-8 mx-2 text-sm"
          />
          <span>seconds</span>
        
        </div>
      </DraggableItem>

      <DraggableItem type='think' props={{ thinkMessage, setThinkMessage, thinkDuration, setThinkDuration, handleThink }}>
        <div className="bg-purple-500 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={handleThink}
        >
          <span>think</span>
          <input
            type="text"
            value={thinkMessage}
            onChange={(e) => setThinkMessage(e.target.value)}
            className="bg-white-300 text-black rounded text-center mx-2 w-12 text-sm"
          />
          <span>for</span>
          <input
            type="number"
            value={thinkDuration}
            onChange={(e) => setThinkDuration(Number(e.target.value))}
            className="bg-white-300 text-black rounded text-center w-8 mx-2 text-sm"
          />
          <span>seconds</span>
        
        </div>
      </DraggableItem>

      <DraggableItem type='change-size' props={{ sizeChange, setSizeChange, handleChangeSize }}>
        <div className="bg-purple-500 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={handleChangeSize}
        >
          <span>change size by</span>
          <input
            type="text"
            value={sizeChange}
            onChange={(e) => setSizeChange(Number(e.target.value))}
            className="bg-white-300 text-black rounded text-center mx-2 w-12 text-sm"
          />
        </div>
      </DraggableItem>

      <DraggableItem type='visible' props={{ sprite, handleToggleVisibility }}>
        <div className="bg-purple-500 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={handleToggleVisibility}
        >
          <span>{sprite.visible ? 'hide' : 'show'}</span>
        </div>
      </DraggableItem>
      

      {/* --------------------------------------Control Section---------------------------------------------- */}

      <div className="font-bold"> {"Control"} </div>
      <DraggableItem type='wait' props={{ message, setMessage }}>
        <div className="bg-yellow-600 flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer">
          <span>wait</span>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white-300 text-black rounded text-center mx-2 w-12 text-sm"
          />
          <span>seconds</span>

        
        </div>
      </DraggableItem>
    </div>
  );
}
