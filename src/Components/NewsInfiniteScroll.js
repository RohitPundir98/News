import React, { useState, useEffect } from "react";
import NewsItems from "./NewsItems";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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

    // Construct the API URL based on category, country, page, and pageSize
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=e266f6b0f1d84842b00f9ad13c4541cd&page=${page}&pageSize=${props.pageSize}`;

    try {
      let data = await fetch(url);

      if (!data.ok) {
        throw new Error("Network response was not ok");
      }

      let parsedData = await data.json();

      // Update state with fetched data
      setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
      setTotalPage(Math.ceil(parsedData.totalResults / props.pageSize));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Load more news articles when the user scrolls to the bottom
  const handleInfiniteScroll = () => {
    if (page < totalPage) {
      setPage((prevPage) => prevPage + 1);
      fetchNews(props.category, props.country);
    }
  };

  // Effect hook to handle country change and reset page
  useEffect(() => {
    setCountry(props.country);
    setPage(1);
    setArticles([]); // Clear articles when the country changes
    fetchNews(props.category, props.country);
  }, [props.country, props.category]);

  // JSX to render the component
  return (
    <>
      {/* Section for displaying a heading */}
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
        {/* Use capitalFirstLetter method for category */}
        <h2 className="text-center">{`${capitalFirstLetter(props.category)} - Top Headlines `}</h2>
      </div>

      {/* Container for displaying news articles */}
      <InfiniteScroll
        dataLength={articles.length} // This is an important field to render the next data
        next={handleInfiniteScroll}
        hasMore={page < totalPage}
        loader={
          // Display different messages for initial loading and subsequent page loading
          loading && page === 1 ? (
            <div className="text-center" key="loader">
              <p>Loading...</p>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : loading ? (
            <div className="text-center" key="loader">
              <p>Loading more articles...</p>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : null
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more articles to load</b>
          </p>
        }
      >
        {/* Grid layout for displaying news articles */}
        <div className="row">
          {articles.map((elem) => (
            <div className="col-md-4" key={elem.url}>
              {/* Render the NewsItems component for each news article */}
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
      </InfiniteScroll>
    </>
  );
};

// Default props for the News component
News.defaultProps = {
  pageSize: 9, // Default number of articles per page
};

// Prop types for the News component
News.propTypes = {
  pageSize: PropTypes.number, // Validate that pageSize is a number
};

// Export the News component as the default export
export default News;
