import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ type, children, props }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type, props },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

export default DraggableItem;
