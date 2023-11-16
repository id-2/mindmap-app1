import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import 'antd/dist/antd.css';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/signup', values);
      if (response.status === 200) {
        message.success('Signed up successfully!');
        router.push('/login');
      } else {
        message.error('Failed to sign up. Please try again.');
      }
    } catch (error) {
      message.error('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <h2>Sign Up</h2>
      <Form
        name="signup"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;