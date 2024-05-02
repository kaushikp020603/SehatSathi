import React from "react";

import { Button, Col, Form, Input, Row, TimePicker, Select } from "antd";
import moment from "moment";

function DoctorForm({ onFinish, initialValues }) {
  const { Option } = Select;
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initialValues,
        ...(initialValues && {
          timings: [
            moment(initialValues?.timings[0], "HH:mm"),
            moment(initialValues?.timings[1], "HH:mm"),
          ],
        }),
      }}
    >
      <h1 className="card-title mt-3">Personal Information</h1>
      <Row gutter={20}>
        <Col span={24} xs={24} sm={24} lg={8}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={24} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col span={24} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={24} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Website"
            name="website"
            rules={[{ required: true }]}
          >
            <Input placeholder="Website" />
          </Form.Item>
        </Col>
        <Col span={24} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title mt-3">Professional Information</h1>
      <Row gutter={20}>
        <Col span={24} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Specialization"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Specialization">
              <Option value="Dermatologist">Dermatologist</Option>
              <Option value="Allergist">Allergist</Option>
              <Option value="Gastroenterologist">Gastroenterologist</Option>
              <Option value="Hepatologist">Hepatologist</Option>
              <Option value="General Physician">General Physician</Option>
              <Option value="Endocrinologist">Endocrinologist</Option>
              <Option value="Pulmonologist">Pulmonologist</Option>
              <Option value="Cardiologist">Cardiologist</Option>
              <Option value="Neurologist">Neurologist</Option>
              <Option value="Orthopedic Surgeon">Orthopedic Surgeon</Option>
              <Option value="Infectious Disease Specialist">Infectious Disease Specialist</Option>
              <Option value="Pediatrician">Pediatrician</Option>
              <Option value="Orthopedic Surgeon">Orthopedic Surgeon</Option>
              <Option value="Rheumatologist">Rheumatologist</Option>
              <Option value="ENT Specialist">ENT Specialist</Option>
              <Option value="Urologist">Urologist</Option>
              <Option value="General Surgeon">General Surgeon</Option>
              <Option value="Vascular Surgeon">Vascular Surgeon</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={24} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Experience"
            name="experience"
            rules={[{ required: true }]}
          >
            <Input placeholder="Experience" type="number" />
          </Form.Item>
        </Col>
        <Col span={24} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Fee Per Consultation "
            name="feePerConsultation"
            rules={[{ required: true }]}
          >
            <Input placeholder="Fee Per Consultation " type="number" />
          </Form.Item>
        </Col>
        <Col span={24} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Timings"
            name="timings"
            rules={[{ required: true }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default DoctorForm;
