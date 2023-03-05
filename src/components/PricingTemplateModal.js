import React, { useState } from "react";
import { Modal, Form, InputNumber, Select } from "antd";

const { Option } = Select;

const fakePrices = {
  basic: 19.99,
  pro: 49.99,
  premium: 99.99,
};

const PricingTemplateModal = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanChange = (value) => {
    setSelectedPlan(value);
  };

  const handleCancel = () => {
    form.resetFields();
    setSelectedPlan(null);
    onCancel();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values, selectedPlan);
      form.resetFields();
      setSelectedPlan(null);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Modal
      title="pricing"
      visible={visible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      okText='Subscribe'
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="selecet a plan" name="plan" rules={[{ required: true }]}>
          <Select onChange={handlePlanChange} placeholder="Select a plan">
            <Option value="basic">Basic (${fakePrices.basic})</Option>
            <Option value="pro">Pro (${fakePrices.pro})</Option>
            <Option value="premium">Premium (${fakePrices.premium})</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PricingTemplateModal;