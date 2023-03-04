import { useState } from 'react';
import { Modal, Form, Input, Button, Checkbox } from 'antd';

const SignUpModal = ({signUpModal, setSignUpModal}) => {

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const handleCancel = () => {
    setSignUpModal(false);
  };

  const showSignUpModal = () => {
    setSignUpModal(true);
  };

  return (
    <>
      <Modal
        title="Welcome back we missed you!"
        visible={signUpModal}
        onCancel={handleCancel}
        footer={null}
      >

        <Form
          name="basic"
          layout='vertical'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{ marginTop: 20 }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item style={{ flexDirection: "column", display: "flex", alignItems: "center", justifyContent: "center" }}>
  <Button type="primary" htmlType="submit" style={{width: 115}}>
    Login
  </Button>
  <span style={{ margin: "0 10px 100px 20px" }}>or</span>
  <Button type="link">
    Forgot password?
  </Button>
</Form.Item>
    <Form.Item style={{ flexDirection: "column", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Button type="primary" htmlType="submit" style={{width:300}}>
        Sign Up
      </Button>
    </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SignUpModal;