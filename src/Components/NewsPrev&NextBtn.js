import React, { useState, useEffect } from "react";
import NewsItems from "./NewsItems";
import PropTypes from "prop-types";

// Function-based component 'News'
const News = (props) => {
  // State hooks for managing component state
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [country, setCountry] = useState("in");

  // Effect hook to handle initial mount and updates when category or country changes
  useEffect(() => {
    document.title = `${capitalFirstLetter(props.category)} Top Headlines `;
    fetchNews(props.category, props.country);
  }, [props.category, props.country]);

  // Helper function to capitalize the first letter of a string
  const capitalFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Function to fetch news data from the API
  const fetchNews = async (category, country) => {
    setLoading(true);

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=e266f6b0f1d84842b00f9ad13c4541cd&page=${page}&pageSize=${props.pageSize}`;

    try {
      let data = await fetch(url);

      if (!data.ok) {
        throw new Error("Network response was not ok");
      }

      let parsedData = await data.json();

      // Update state with fetched data
      setArticles(parsedData.articles);
      setTotalPage(Math.ceil(parsedData.totalResults / props.pageSize));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Event handler for clicking the 'Previous' button
  const handlePrevClick = async () => {
    if (page > 1) {
      setPage(page - 1);
      await fetchNews(props.category, props.country);
    }
  };

  // Event handler for clicking the 'Next' button
  const handleNextClick = async () => {
    if (page < totalPage) {
      setPage(page + 1);
      await fetchNews(props.category, props.country);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Effect hook to update document title when category changes
  useEffect(() => {
    if (props.category !== "general") {
      document.title = `News Monkey ${capitalFirstLetter(props.category)}`;
    }
  }, [props.category]);

  // Effect hook to handle country change and reset page
  useEffect(() => {
    setCountry(props.country);
    setPage(1);
    fetchNews(props.category, props.country);
  }, [props.country, props.category]);

  // JSX to render the component
  return (
    <>
      <div
        className="container d-flex justify-content-center"
        style={{
          position: "relative",
          top: "35px",
          width: "100%",
          padding: "20px",
          color: "#b2ac88",
        }}
      >
        <h2 className="text-center">{`${capitalFirstLetter(props.category)} - Top Headlines `}</h2>
      </div>

      <div className="container my-3" style={{ marginTop: "70px" }}></div>

      <div className="container my-3">
        {loading ? (
          <div className="text-center">
            <p>Loading...</p>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="row">
              {articles.map((elem) => (
                <div className="col-md-4" key={elem.url}>
                  <NewsItems
                    title={elem.title ? elem.title.slice(0, 45) : ""}
                    description={elem.description ? elem.description.slice(0, 85) : ""}
                    imageUrl={elem.urlToImage}
                    newsUrl={elem.url}
                    author={elem.author}
                    date={elem.publishedAt}
                    source={elem.source.name}
                  />
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={handlePrevClick}>
                Previous &larr;
              </button>
              <p style={{ color: "#b2ac88", margin: "0" }}>
                Page {page} of {totalPage}
              </p>
              <button type="button" className="btn btn-secondary" onClick={handleNextClick}>
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Default props for the News component
News.defaultProps = {
  pageSize: 9,
};

// Prop types for the News component
News.propTypes = {
  pageSize: PropTypes.number,
};

// Export the News component as the default export
export default News;
