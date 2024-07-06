import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { Provider } from 'react-redux';
import store from "./components/redux/store";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReplayControls from "./components/ReplayControls";


//implement 4 functionality from motion
//implement 4 functionality from look
//implement 1 functionality from events
//implement 1 functionality from control

export default function App() {
  return (
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <div className="bg-blue-100 pt-2 font-sans">
            <ReplayControls/>
            <div className="h-screen overflow-hidden flex flex-row  ">
              <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
                <Sidebar /> <MidArea />
              </div>
              <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
                <PreviewArea />
              </div>
            </div>
          </div>
        </Provider>
      </DndProvider>
    
  );
}
