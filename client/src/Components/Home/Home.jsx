// Home.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout";
import "../../layout.css";
import { Button, Col, Row, Select, Card } from "antd";
import Doctor from "../Doctor";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";

const { Option } = Select;

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [showSymptomsCard, setShowSymptomsCard] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const dispatch = useDispatch();
  const symptomsList = [
    "itching",
    "skin_rash",
    "nodal_skin_eruptions",
    "continuous_sneezing",
    "shivering",
    "chills",
    "joint_pain",
    "stomach_pain",
    "acidity",
    "ulcers_on_tongue",
    "muscle_wasting",
    "vomiting",
    "burning_micturition",
    "spotting_urination",
    "fatigue",
    "weight_gain",
    "anxiety",
    "cold_hands_and_feets",
    "mood_swings",
    "weight_loss",
    "restlessness",
    "lethargy",
    "patches_in_throat",
    "irregular_sugar_level",
    "cough",
    "high_fever",
    "sunken_eyes",
    "breathlessness",
    "sweating",
    "dehydration",
    "indigestion",
    "headache",
    "yellowish_skin",
    "dark_urine",
    "nausea",
    "loss_of_appetite",
    "pain_behind_the_eyes",
    "back_pain",
    "constipation",
    "abdominal_pain",
    "diarrhoea",
    "mild_fever",
    "yellow_urine",
    "yellowing_of_eyes",
    "acute_liver_failure",
    "fluid_overload",
    "swelling_of_stomach",
    "swelled_lymph_nodes",
    "malaise",
    "blurred_and_distorted_vision",
    "phlegm",
    "throat_irritation",
    "redness_of_eyes",
    "sinus_pressure",
    "runny_nose",
    "congestion",
    "chest_pain",
    "weakness_in_limbs",
    "fast_heart_rate",
    "pain_during_bowel_movements",
    "pain_in_anal_region",
    "bloody_stool",
    "irritation_in_anus",
    "neck_pain",
    "dizziness",
    "cramps",
    "bruising",
    "obesity",
    "swollen_legs",
    "swollen_blood_vessels",
    "puffy_face_and_eyes",
    "enlarged_thyroid",
    "brittle_nails",
    "swollen_extremeties",
    "excessive_hunger",
    "extra_marital_contacts",
    "drying_and_tingling_lips",
    "slurred_speech",
    "knee_pain",
    "hip_joint_pain",
    "muscle_weakness",
    "stiff_neck",
    "swelling_joints",
    "movement_stiffness",
    "spinning_movements",
    "loss_of_balance",
    "unsteadiness",
    "weakness_of_one_body_side",
    "loss_of_smell",
    "bladder_discomfort",
    "foul_smell_of urine",
    "continuous_feel_of_urine",
    "passage_of_gases",
    "internal_itching",
    "toxic_look_(typhos)",
    "depression",
    "irritability",
    "muscle_pain",
    "altered_sensorium",
    "red_spots_over_body",
    "belly_pain",
    "abnormal_menstruation",
    "dischromic_patches",
    "watering_from_eyes",
    "increased_appetite",
    "polyuria",
    "family_history",
    "mucoid_sputum",
    "rusty_sputum",
    "lack_of_concentration",
    "visual_disturbances",
    "receiving_blood_transfusion",
    "receiving_unsterile_injections",
    "coma",
    "stomach_bleeding",
    "distention_of_abdomen",
    "history_of_alcohol_consumption",
    "fluid_overload",
    "blood_in_sputum",
    "prominent_veins_on_calf",
    "palpitations",
    "painful_walking",
    "pus_filled_pimples",
    "blackheads",
    "scurring",
    "skin_peeling",
    "silver_like_dusting",
    "small_dents_in_nails",
    "inflammatory_nails",
    "blister",
    "red_sore_around_nose",
    "yellow_crust_ooze",
  ];

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found in localStorage");
        return;
      }
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-all-approved-doctor", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleFilter = (value) => {
    setSpecializationFilter(value);
  };

  const handleSymptomsChange = (value) => {
    setSelectedSymptoms(value);
  };

  const filteredDoctors = specializationFilter
    ? doctors.filter((doctor) => doctor.specialization === specializationFilter)
    : doctors;

  return (
    <Layout>
      {selectedOption === null ? (
        <div style={{ marginBottom: "20px" }}>
          <Button
            onClick={() => handleOptionSelect("symptoms")}
            style={{
              marginRight: "10px",
              backgroundColor: "#E0E9FF",
              borderColor: "#E0E9FF",
              color: "#000",
            }}
          >
            Find doctor based on symptoms
          </Button>
          <Button
            onClick={() => handleOptionSelect("specialization")}
            style={{
              backgroundColor: "#E0E9FF",
              borderColor: "#E0E9FF",
              color: "#000",
            }}
          >
            Find directly based on specialization
          </Button>
        </div>
      ) : (
        <div>
          {selectedOption === "specialization" ? (
            <div>
              <Select
                placeholder="Select Specialization"
                onChange={handleFilter}
                style={{ width: 200 }}
              >
                <Option value="Allergy & Immunology">
                  Allergy & Immunology
                </Option>
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
            </div>
          ) : (
            <div>
              {selectedOption === "symptoms" && (
                <div>
                  <Button
                    onClick={() => setShowSymptomsCard(!showSymptomsCard)}
                  >
                    {showSymptomsCard ? "Hide Symptoms" : "Add Symptoms"}
                  </Button>
                  {showSymptomsCard && (
                    <Card style={{ marginTop: "10px" }}>
                      <Select
                        mode="multiple"
                        placeholder="Select Symptoms"
                        style={{ width: "100%" }}
                        onChange={handleSymptomsChange}
                        value={selectedSymptoms}
                      >
                        {symptomsList.map((symptom, index) => (
                          <Option key={index} value={symptom}>
                            {symptom}
                          </Option>
                        ))}
                      </Select>
                    </Card>
                  )}
                </div>
              )}
            </div>
          )}
          <Row gutter={20} style={{ marginTop: "23px" }}>
            {filteredDoctors.map((doctor) => (
              <Col span={8} xs={24} sm={24} lg={8} key={doctor._id}>
                <Doctor doctor={doctor} selectedOption={selectedOption} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default Home;
