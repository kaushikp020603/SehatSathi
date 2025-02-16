// Home.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout";
import "../../layout.css";
<<<<<<< HEAD
import { Button, Col, Row, Select, Card, message } from "antd";
import Doctor from "../Doctor";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
=======
import { Button, Col, Row, Select, Card } from "antd";
import Doctor from "../Doctor";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
>>>>>>> e8959d3a82889ce4434aa7f36c039960e31072f2

const { Option } = Select;

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [showSymptomsCard, setShowSymptomsCard] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [disease, setDisease] = useState("");
<<<<<<< HEAD
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [userLocation, setUserLocation] = useState([19.2976, 72.8471]);
  const [mapVisible, setMapVisible] = useState(false);
=======
>>>>>>> e8959d3a82889ce4434aa7f36c039960e31072f2

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

  const paragraphStyle = {
    fontSize: "24px",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    color: "#fff",
    backgroundColor: "#a3b5e3",
    padding: "15px",
    borderRadius: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
<<<<<<< HEAD
  const markerStyle = {
    backgroundColor: "#ff5722",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    border: "2px solid #fff",
  };
  const createIcon = (color, borderColor) =>
    new L.Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="${color}" stroke="${borderColor}" stroke-width="2" />
      </svg>
    `)}`,
      iconSize: [25, 25],
      iconAnchor: [12, 24],
      popupAnchor: [0, -20],
    });

  const popupStyle = {
    backgroundColor: "#ffffff",
    color: "#333333",
    fontSize: "14px",
    borderRadius: "8px",
    padding: "10px",
    border: "1px solid #ddd",
  };

  const customIcon = new L.Icon({
    iconUrl:
      "data:image/svg+xml;base64," +
      btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="${markerStyle.backgroundColor}" stroke="${markerStyle.border}" stroke-width="2" />
      </svg>
    `),
    iconSize: [25, 25], // Size of the icon
    iconAnchor: [12, 24], // Anchor point of the icon
    popupAnchor: [0, -20], // Position of the popup relative to the icon
  });
=======
>>>>>>> e8959d3a82889ce4434aa7f36c039960e31072f2

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
  const [data, setData] = useState({});
  useEffect(() => {
    getData();
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8100/api/data");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === "symptoms") {
      setShowSymptomsCard(true);
    } else {
      setShowSymptomsCard(false);
    }
  };

<<<<<<< HEAD
  const findNearbyHospitals = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setMapVisible(true); // Show the map when the button is clicked
        try {
          const response = await axios.get(
            `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"~"hospital|clinic"](around:3000,${latitude},${longitude});out;`
          );
          if (response.data.elements.length > 0) {
            setNearbyHospitals(response.data.elements);
            message.success("Nearby hospitals and clinics found.");
          } else {
            message.info("No hospitals or clinics found nearby.");
          }
        } catch (error) {
          console.error("Error fetching hospitals:", error);
          message.error("Error fetching nearby hospitals.");
        }
      });
    } else {
      message.error("Geolocation is not supported by this browser.");
    }
  };
=======
>>>>>>> e8959d3a82889ce4434aa7f36c039960e31072f2
  const handleSymptomsChange = async (value) => {
    setSelectedSymptoms(value);
  };

  const handleSubmit = async () => {
    try {
      const symptomsString = selectedSymptoms
        .map((symptom) => symptom.toLowerCase())
        .join(","); // Convert each symptom to lowercase and join them with commas

      const response = await axios.post(
        "http://localhost:8000/disease_predict",
        {
          symptoms: symptomsString,
        }
      );
      setDisease(response.data.doctor);
      // Handle response data
    } catch (error) {
      console.error("Error predicting doctor:", error);
    }
  };

  const handleFilter = (value) => {
    setSpecializationFilter(value);
  };

  const filteredDoctors = specializationFilter
    ? doctors.filter((doctor) => doctor.specialization === specializationFilter)
    : doctors;

<<<<<<< HEAD
  const locationIcon = new L.Icon({
    iconUrl:
      "data:image/svg+xml;base64," +
      btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.746 4.635 10.497 10.543 11.948 1.63.39 2.96-.472 3.458-1.258.52-.811.453-1.789.214-2.747-.162-.546-.567-.98-1.123-1.229a4.092 4.092 0 0 0-1.502-.346c-2.217 0-4-1.783-4-4s1.783-4 4-4 4 1.783 4 4c0 .206-.013.411-.037.612a4.092 4.092 0 0 0-1.437.349c-.556.249-.961.683-1.126 1.229-.243.957-.306 1.926-.16 2.748.506.786 1.832 1.641 3.413 1.062 3.924-1.236 6.833-4.668 6.833-8.663 0-6.627-5.373-12-12-12zm-1 17.9c-1.472 0-2.775-1.303-2.775-2.775 0-1.472 1.303-2.775 2.775-2.775 1.472 0 2.775 1.303 2.775 2.775 0 1.472-1.303 2.775-2.775 2.775z" fill="#ff5722"/>
        </svg>
      `),
    iconSize: [24, 24], // Size of the icon
    iconAnchor: [12, 24], // Anchor point of the icon
    popupAnchor: [0, -20], // Position of the popup relative to the icon
  });
  const hospitalIcon = new L.Icon({
    iconUrl:
      "data:image/svg+xml;base64," +
      btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.746 4.635 10.497 10.543 11.948 1.63.39 2.96-.472 3.458-1.258.52-.811.453-1.789.214-2.747-.162-.546-.567-.98-1.123-1.229a4.092 4.092 0 0 0-1.502-.346c-2.217 0-4-1.783-4-4s1.783-4 4-4 4 1.783 4 4c0 .206-.013.411-.037.612a4.092 4.092 0 0 0-1.437.349c-.556.249-.961.683-1.126 1.229-.243.957-.306 1.926-.16 2.748.506.786 1.832 1.641 3.413 1.062 3.924-1.236 6.833-4.668 6.833-8.663 0-6.627-5.373-12-12-12zm-1 17.9c-1.472 0-2.775-1.303-2.775-2.775 0-1.472 1.303-2.775 2.775-2.775 1.472 0 2.775 1.303 2.775 2.775 0 1.472-1.303 2.775-2.775 2.775z" fill="#ff5722"/>
      </svg>
    `),
    iconSize: [24, 24], // Size of the icon
    iconAnchor: [12, 24], // Anchor point of the icon
    popupAnchor: [0, -20], // Position of the popup relative to the icon
  });

  // Define custom icon for user's location
  const userLocationIcon = new L.Icon({
    iconUrl:
      "data:image/svg+xml;base64," +
      btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.373-12 12 0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm-1 17.9c-1.472 0-2.775-1.303-2.775-2.775 0-1.472 1.303-2.775 2.775-2.775 1.472 0 2.775 1.303 2.775 2.775 0 1.472-1.303 2.775-2.775 2.775zm1-9.9c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" fill="#007bff"/>
      </svg>
    `),
    iconSize: [24, 24], // Size of the icon
    iconAnchor: [12, 24], // Anchor point of the icon
    popupAnchor: [0, -20], // Position of the popup relative to the icon
  });

=======
>>>>>>> e8959d3a82889ce4434aa7f36c039960e31072f2
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
<<<<<<< HEAD
          <Button
            onClick={findNearbyHospitals}
            style={{
              backgroundColor: "#E0E9FF",
              borderColor: "#E0E9FF",
              color: "#000",
              marginLeft: "10px",
            }}
          >
            Find Nearby Hospitals and Clinics
          </Button>
=======
>>>>>>> e8959d3a82889ce4434aa7f36c039960e31072f2
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
<<<<<<< HEAD
                <Option value="Infectious Disease Specialist">
                  Infectious Disease Specialist
                </Option>
=======
                <Option value="Infectious Disease Specialist">Infectious Disease Specialist</Option>
>>>>>>> e8959d3a82889ce4434aa7f36c039960e31072f2
                <Option value="Pediatrician">Pediatrician</Option>
                <Option value="Orthopedic Surgeon">Orthopedic Surgeon</Option>
                <Option value="Rheumatologist">Rheumatologist</Option>
                <Option value="ENT Specialist">ENT Specialist</Option>
                <Option value="Urologist">Urologist</Option>
                <Option value="General Surgeon">General Surgeon</Option>
                <Option value="Vascular Surgeon">Vascular Surgeon</Option>
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
<<<<<<< HEAD
                      <p>
                        For better accuracy enter atleast 4 symptoms. If you
                        have less than 4 mild symptoms visit a General Physician
                        for better treatment
                      </p>
=======
                      <p>For better accuracy enter atleast 4 symptoms. If you have less than 4 mild symptoms visit a General Physician for better treatment</p>
>>>>>>> e8959d3a82889ce4434aa7f36c039960e31072f2
                      <Button onClick={handleSubmit}>Check</Button>
                    </Card>
                  )}
                  <br></br>
                  <hr></hr>
                  {disease && (
<<<<<<< HEAD
                    <p style={paragraphStyle}>You should Visit a {disease}</p>
=======
                    <p style={paragraphStyle}>
                      You should Visit a {disease}
                    </p>
>>>>>>> e8959d3a82889ce4434aa7f36c039960e31072f2
                  )}
                  <Row gutter={20} style={{ marginTop: "23px" }}>
                    {filteredDoctors.map((doctor) => (
                      <Col span={8} xs={24} sm={24} lg={8} key={doctor._id}>
                        <Doctor
                          doctor={doctor}
                          selectedOption={selectedOption}
                        />
                      </Col>
                    ))}
                  </Row>
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
<<<<<<< HEAD

      {mapVisible && (
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {nearbyHospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              position={[hospital.lat, hospital.lon]}
              icon={hospitalIcon}
            >
              <Popup>
                {hospital.tags.name || "Hospital"} <br />{" "}
                {hospital.tags.address}
              </Popup>
            </Marker>
          ))}
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>Your location</Popup>
          </Marker>
        </MapContainer>
      )}
=======
>>>>>>> e8959d3a82889ce4434aa7f36c039960e31072f2
    </Layout>
  );
}

export default Home;
