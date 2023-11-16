import React, { useState, useEffect } from 'react';
import { useUser } from '../lib/hooks';
import dynamic from 'next/dynamic';
import { Button, Input, Select, ColorPicker, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

// Dynamic import for react-markdown-editor-lite
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

// Markdown parser
const Parser = dynamic(() => import('react-markdown'), {
  ssr: false,
});

const Sidebar = ({ node, updateNode, generateNode }) => {
  const user = useUser();
  const [markdown, setMarkdown] = useState(node?.markdown || '');
  const [editMode, setEditMode] = useState(false);
  const [attachments, setAttachments] = useState(node?.attachments || []);

  const handleMarkdownChange = ({ text }) => {
    setMarkdown(text);
  };

  const handleEditModeChange = () => {
    setEditMode(!editMode);
  };

  const handleNodeUpdate = () => {
    updateNode({ ...node, markdown, attachments });
  };

  const handleNodeGeneration = () => {
    generateNode(node);
  };

  const handleReset = () => {
    setMarkdown(node?.markdown || '');
    setAttachments(node?.attachments || []);
  };

  const handleSave = () => {
    handleNodeUpdate();
    handleEditModeChange();
  };

  const handleGenerate = () => {
    handleNodeGeneration();
    handleEditModeChange();
  };

  const handleUpload = ({ fileList }) => {
    setAttachments(fileList);
  };

  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  // Render
  return (
    <div style={{ width: '300px', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <h2>Sidebar</h2>
      <p>This is the sidebar panel for node editing.</p>
      <div>
        <h3>Title</h3>
        <Input
          value={node?.title}
          onChange={(e) => updateNode({ ...node, title: e.target.value })}
        />
      </div>
      <div>
        <h3>Type</h3>
        <Select
          value={node?.type}
          onChange={(value) => updateNode({ ...node, type: value })}
        >
          {/* Add your node types here */}
          <Select.Option value="type1">Type 1</Select.Option>
          <Select.Option value="type2">Type 2</Select.Option>
        </Select>
      </div>
      <div>
        <h3>Color</h3>
        <ColorPicker
          value={node?.color}
          onChange={(color) => updateNode({ ...node, color })}
        />
      </div>
      <div>
        <h3>Attachments</h3>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        {attachments.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>
      <div>
        <h3>Markdown</h3>
        {editMode ? (
          <MdEditor value={markdown} onChange={handleMarkdownChange} />
        ) : (
          <Parser source={markdown} />
        )}
        <Button onClick={handleEditModeChange}>
          {editMode ? 'Preview' : 'Edit'}
        </Button>
      </div>
      <div>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleGenerate}>Generate</Button>
      </div>
    </div>
  );
};

export default Sidebar;