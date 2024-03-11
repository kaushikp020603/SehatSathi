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
              <Option value="Allergy & Immunology">Allergy & Immunology</Option>
              <Option value="Anesthesiology">Anesthesiology</Option>
              <Option value="Cardiology">Cardiology</Option>
              <Option value="Dermatology">Dermatology</Option>
              <Option value="Endocrinology">Endocrinology</Option>
              <Option value="Family Medicine">Family Medicine</Option>
              <Option value="Gastroenterology">Gastroenterology</Option>
              <Option value="Geriatrics">Geriatrics</Option>
              <Option value="Hematology">Hematology</Option>
              <Option value="Infectious Disease">Infectious Disease</Option>
              <Option value="Internal Medicine">Internal Medicine</Option>
              <Option value="Nephrology">Nephrology</Option>
              <Option value="Neurology">Neurology</Option>
              <Option value="Obstetrics & Gynecology">
                Obstetrics & Gynecology
              </Option>
              <Option value="Oncology">Oncology</Option>
              <Option value="Ophthalmology">Ophthalmology</Option>
              <Option value="Orthopedic Surgery">Orthopedic Surgery</Option>
              <Option value="Otolaryngology">Otolaryngology</Option>
              <Option value="Pain Medicine">Pain Medicine</Option>
              <Option value="Pediatrics">Pediatrics</Option>
              <Option value="Physical Medicine & Rehabilitation">
                Physical Medicine & Rehabilitation
              </Option>
              <Option value="Plastic Surgery">Plastic Surgery</Option>
              <Option value="Psychiatry">Psychiatry</Option>
              <Option value="Pulmonology">Pulmonology</Option>
              <Option value="Radiology">Radiology</Option>
              <Option value="Rheumatology">Rheumatology</Option>
              <Option value="Sleep Medicine">Sleep Medicine</Option>
              <Option value="Sports Medicine">Sports Medicine</Option>
              <Option value="Urology">Urology</Option>
              {/* Add more Option components for additional specializations */}
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
