import React from 'react';
import { Line } from 'react-konva';

const Edge = ({ edge }) => {
  // Destructure the from and to nodes for easier access
  const { from, to } = edge;

  // Calculate the points for the line
  const points = [from.x, from.y, to.x, to.y];

  return (
    <Line
      points={points}
      stroke="black"
      strokeWidth={2}
      tension={0.5} // This creates a slight curve in the line
    />
  );
};

export default Edge;