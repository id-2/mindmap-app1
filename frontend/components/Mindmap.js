import React, { useState, useEffect } from 'react';
import { Tree } from 'react-d3-tree';
import { useUser } from '../lib/hooks';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Button } from 'antd';
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';

const Mindmap = () => {
  const [data, setData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [scale, setScale] = useState(1);
  const user = useUser();

  useEffect(() => {
    // Fetch data from API or database
    const fetchData = async () => {
      const response = await axios.get(`/api/data?user=${user.id}`);
      const data = await response.data;
      setData(data);
    };

    if (user && user.isLoggedIn) {
      fetchData();
    }
  }, [user]);

  const handleNodeClick = (nodeData, evt) => {
    // Handle node click events here
    setSelectedNode(nodeData);
  };

  const handleNodeMouseOver = (nodeData, evt) => {
    // Handle node mouseover events here
    console.log('Node mouseover:', nodeData);
  };

  const handleNodeMouseOut = (nodeData, evt) => {
    // Handle node mouseout events here
    console.log('Node mouseout:', nodeData);
  };

  const updateNode = (updatedNode) => {
    // Update node data here
    setData((prevData) => {
      // Find and update the node in the data
      // This is just a placeholder and should be replaced with the actual update logic
      return prevData;
    });
  };

  const generateNode = (baseNode) => {
    // Generate new node here
    // This is just a placeholder and should be replaced with the actual generation logic
  };

  const zoomIn = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const zoomOut = () => {
    setScale((prevScale) => prevScale - 0.1);
  };
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Sidebar
        node={selectedNode}
        updateNode={updateNode}
        generateNode={generateNode}
      />
      <div style={{ transform: `scale(${scale})` }}>
        {data && (
          <Tree
            data={data}
            translate={{ x: 100, y: 200 }}
            orientation="vertical"
            onClick={handleNodeClick}
            onMouseOver={handleNodeMouseOver}
            onMouseOut={handleNodeMouseOut}
          />
        )}
      </div>
      <div>
        <Button icon={<ZoomInOutlined />} onClick={zoomIn} />
        <Button icon={<ZoomOutOutlined />} onClick={zoomOut} />
      </div>
    </div>
  );
};

export default Mindmap;