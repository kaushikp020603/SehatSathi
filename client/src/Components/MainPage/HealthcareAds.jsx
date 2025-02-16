import React from "react";

const ads = [
  {
    id: 1,
    title: "Innovative Health Product",
    imgSrc: "https://via.placeholder.com/300x250?text=Health+Product",
    link: "https://www.amazon.com/dp/B08N5WRWNW?tag=yourtag-20", // Replace with your affiliate link
  },
  {
    id: 2,
    title: "New Health Innovation",
    imgSrc: "https://via.placeholder.com/300x250?text=Health+Innovation",
    link: "https://www.amazon.com/dp/B08N5WRWNW?tag=yourtag-20", // Replace with your affiliate link
  },
];

const HealthcareAds = () => {
  return (
    <div style={styles.adContainer}>
      {ads.map((ad) => (
        <div key={ad.id} style={styles.adCard}>
          <a href={ad.link} target="_blank" rel="noopener noreferrer">
            <img src={ad.imgSrc} alt={ad.title} style={styles.adImage} />
            <p style={styles.adText}>{ad.title}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

const styles = {
  adContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "10px",
    padding: "10px",
  },
  adCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  adImage: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  adText: {
    margin: "10px 0",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default HealthcareAds;
