import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "../../App.css";
function Creators() {
  let message = `Discover the faces shaping SehatSathi's success.`;
  return (
    <section className="section-whit">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="section-title">The Team Behind SehatSathi</h2>
            <p className="section-subtitle">{message}</p>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="team-item" style={{ height: "475px" }}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD8woxjr_40owk1FcTp88hzBeXmJSdJGDcVyDrpQSU_5XkfYm1_JOn0vZ49ANyFeuEtLY&usqp=CAU"
                className="team-img"
                alt="img1"
              />
              <h3>Kaushik Prabhu Nerurkar</h3>
              <div className="team-info"></div>
              <p>Web Development</p>
              <p>
                Health is the greatest gift, contentment the greatest wealth.
              </p>
              <ul className="team-icon">
                <li>
                  <a
                    href="#"
                    className="twitter"
                    style={{
                      backgroundColor: "#4099ff",
                    }}
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="instagram"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #833AB4, #FD1D1D, #F56040)",
                    }}
                  >
                    <FontAwesomeIcon icon={faInstagram} className="instagram" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="facebook"
                    style={{
                      backgroundColor: "#3b5998",
                    }}
                  >
                    <FontAwesomeIcon icon={faFacebook} className="facebook" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="team-item" style={{ height: "475px" }}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhnJ8ohO113eX3thYt_EViTew3NXN3xwKxi4DzqigRhpA0GY6OWlgY5yZCOqPLda4y5fk&usqp=CAU"
                className="team-img"
                alt="img1"
              />
              <h3>Amogh Parulekar</h3>
              <div className="team-info"></div>
              <p>AI/ML</p>
              <p>Innovation distinguishes between a leader and a follower.</p>
              <ul className="team-icon" style={{ marginTop: "47px" }}>
                <li>
                  <a
                    href="#"
                    className="twitter"
                    style={{
                      backgroundColor: "#4099ff",
                    }}
                  >
                    <FontAwesomeIcon icon={faTwitter} className="twitter" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="instagram"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #833AB4, #FD1D1D, #F56040)",
                    }}
                  >
                    <FontAwesomeIcon icon={faInstagram} className="instagram" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="facebook"
                    style={{
                      backgroundColor: "#3b5998",
                    }}
                  >
                    <FontAwesomeIcon icon={faFacebook} className="facebook" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="team-item" style={{ height: "475px" }}>
              <img
                src="data:image/jpeg;base64,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"
                className="team-img"
                alt="img1"
              />
              <h3>Riya Patel</h3>
              <div className="team-info"></div>
              <p>UI Design</p>
              <p>Empathy is the heart of healthcare.</p>
              <ul className="team-icon" style={{ marginTop: "70px" }}>
                <li>
                  <a
                    href="#"
                    className="twitter"
                    style={{
                      backgroundColor: "#4099ff",
                    }}
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="instagram"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #833AB4, #FD1D1D, #F56040)",
                    }}
                  >
                    <FontAwesomeIcon icon={faInstagram} className="instagram" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="facebook"
                    style={{
                      backgroundColor: "#3b5998",
                    }}
                  >
                    <FontAwesomeIcon icon={faFacebook} className="facebook" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="centered">
              <div className="team-item" style={{ height: "475px" }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUoR-yOX8K8OKoCV4iULO0R4pus6-OXifLFOj_bR8gghVfrDYd9v5IaXsEr6YfWt6wM-w&usqp=CAU"
                  className="team-img"
                  alt="img1"
                />
                <h3>Ajit Pawar</h3>
                <div className="team-info"></div>
                <p>Project Management</p>
                <p>Teamwork makes the dream work.</p>
                <ul className="team-icon" style={{ marginTop: "69px" }}>
                  <li>
                    <a
                      href="#"
                      className="twitter"
                      style={{
                        backgroundColor: "#4099ff",
                      }}
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="instagram"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #833AB4, #FD1D1D, #F56040)",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="instagram"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="facebook"
                      style={{
                        backgroundColor: "#3b5998",
                      }}
                    >
                      <FontAwesomeIcon icon={faFacebook} className="facebook" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Creators;
