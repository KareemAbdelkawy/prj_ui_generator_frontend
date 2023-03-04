import { useState } from "react";
import { Modal, Form, Input, Button, Checkbox, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const SignUpModal = ({ signUpModal, setSignUpModal }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: "Our backend is under maintenance",
      description:
        "Please hold tight as our backend team is currently unavailable..",
      icon: (
        <SmileOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleCancel = () => {
    setSignUpModal(false);
  };

  const showSignUpModal = () => {
    setSignUpModal(true);
  };

  return (
    <>
      {contextHolder}

      <Modal
        title="Welcome back we missed you!"
        visible={signUpModal}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          layout="vertical"
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
                message: "Please input your email!",
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
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            style={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={openNotification}
              type="primary"
              htmlType="submit"
              style={{ width: 115 }}
            >
              Login
            </Button>
            <span style={{ margin: "0 10px 100px 20px" }}>or</span>
            <Button onClick={openNotification} type="link">Forgot password?</Button>
          </Form.Item>
          <Form.Item
            style={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button onClick={openNotification} type="primary" htmlType="submit" style={{ width: 300 }}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SignUpModal;
