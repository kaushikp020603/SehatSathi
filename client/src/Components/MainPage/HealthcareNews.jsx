// HealthcareNews.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const HealthcareNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=india+health&apiKey=2d4d7801f0624284aabf85f19a80256f&sortBy=popularity&pageSize=8"
        );
        // Filter out articles related to crime
        const filteredArticles = response.data.articles.filter(
          (article) =>
            !article.title.toLowerCase().includes("crime") &&
            !article.description.toLowerCase().includes("crime")
        );
        setArticles(filteredArticles);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching news: {error.message}</p>;

  return (
    <div>
      <style>
        {`
          .news-container {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .news-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
          }

          .news-item {
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            background-color: #f9f9f9;
            padding: 10px;
          }

          .news-image {
            width: 100%;
            height: auto;
            display: block;
          }

          .news-title {
            font-size: 16px;
            font-weight: bold;
            color: #007bff;
            text-decoration: none;
            display: block;
            margin: 10px 0;
          }

          .news-title:hover {
            text-decoration: underline;
          }
        `}
      </style>
      <div className="news-container">
        <h1>Latest Healthcare News</h1>
        <div className="news-grid">
          {articles.map((article, index) => (
            <div key={index} className="news-item">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="news-image"
                />
              )}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-title"
              >
                {article.title}
              </a>
              <p>{article.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthcareNews;
