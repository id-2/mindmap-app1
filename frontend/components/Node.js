import React from 'react';
import { Circle, Text } from 'react-konva';

const Node = ({ node, onNodeClick, onNodeDoubleClick, onNodeHover, selected, onNodeDrag }) => {
  // Create a ref for the group
  const groupRef = React.useRef();

  // Handle drag events
  const handleDragMove = (e) => {
    // Get the new x and y positions
    const { x, y } = e.target.attrs;

    // Update the node's position
    node.x = x;
    node.y = y;

    // Call the onNodeDrag event
    onNodeDrag(node);
  };

  // Handle click events
  const handleClick = () => {
    onNodeClick(node);
  };

  // Handle double click events
  const handleDoubleClick = () => {
    onNodeDoubleClick(node);
  };

  // Handle hover events
  const handleMouseEnter = () => {
    onNodeHover(node);
  };

  const handleMouseLeave = () => {
    onNodeHover(null);
  };

  // Determine the fill color based on whether the node is selected
  const fillColor = selected ? 'lightgreen' : 'lightblue';

  return (
    <React.Fragment>
      <Circle
        ref={groupRef}
        x={node.x}
        y={node.y}
        radius={20}
        fill={fillColor}
        draggable
        onDragMove={handleDragMove}
        onClick={handleClick}
        onDblClick={handleDoubleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <Text
        x={node.x}
        y={node.y}
        text={node.text}
        draggable
        onDragMove={handleDragMove}
        onClick={handleClick}
        onDblClick={handleDoubleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </React.Fragment>
  );
};

export default Node;