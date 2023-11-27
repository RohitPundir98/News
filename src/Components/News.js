import React, { useState, useEffect } from "react";
import NewsItems from "./NewsItems"; // Import the NewsItems component
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import InfiniteScroll from "react-infinite-scroll-component"; // Import InfiniteScroll component

// Function-based component 'News'
const News = ({ pageSize, setProgress, category, country }) => {
  // State to manage news articles, loading state, page, and totalPage
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  // Method to capitalize the first letter of a string
  const capitalFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Method to fetch news data from the API
  const fetchNews = async (category, country, nextPage) => {
    setLoading(true); // Set loading to true before fetching data

    // Inform parent component about the loading progress (10%)
    setProgress(28);

    // Construct the API URL based on category, country, page, and pageSize
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=e266f6b0f1d84842b00f9ad13c4541cd&page=${nextPage}&pageSize=${pageSize}`;

    try {
      // Fetch data from the API
      let data = await fetch(url);

      // Check if the network response is ok
      if (!data.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON data
      let parsedData = await data.json();

      setProgress(70); // Inform parent component about the loading progress (30%)

      // Update the state with fetched data
      setArticles((prevArticles) => {
        // If it's the first page, return the new articles
        if (nextPage === 1) {
          return parsedData.articles.map((article) => ({
            ...article,
            id: `${article.url}-${Math.random()}`,
          }));
        }

        // If it's not the first page, concatenate the new articles with the previous ones
        return [...prevArticles, ...parsedData.articles.map((article) => ({
          ...article,
          id: `${article.url}-${Math.random()}`,
        }))];
      });

      setTotalPage(Math.ceil(parsedData.totalResults / pageSize));
      setLoading(false); // Set loading to false after data is fetched

      setProgress(80); // Inform parent component about the loading progress (70%)
    } catch (error) {
      // Log and handle errors
      console.error("Error fetching data:", error);

      // Set loading to false in case of an error
      setLoading(false);

      // Inform parent component about the loading progress (100% in case of an error)
      setProgress(100);
    }

    // Inform parent component that the loading is complete (100%)
    setProgress(100);
  };

  // Load more news articles when the user scrolls to the bottom
  const handleInfiniteScroll = () => {
    // Check if there are more pages to load
    if (page < totalPage) {
      // Increment the page and fetch more news
      setPage((prevPage) => prevPage + 1);
      fetchNews(category, country, page + 1);
    }
  };

  // useEffect to fetch news when 'category' or 'country' props change
  useEffect(() => {
    const defaultCategory = "general";
    const defaultCountry = "in";

    // Update the state with default values and then fetch news
    setPage(1);
    fetchNews(defaultCategory, defaultCountry, 1);
  }, [category, country]);

  // Render method to render the component
  return (
    <>
      {/* Section for displaying a heading */}
      <div
        className="container-fluid text-white text-center"
        style={{ backgroundColor: "dark", padding: "20px" }}
      >
        <div className="main-container">
          {/* Use capitalFirstLetter method for category */}
          <h2
            className="text-center"
            style={{ marginTop: "2rem" }}
          >{`${capitalFirstLetter(category)} - Top Headlines `}</h2>
        </div>

        {/* Container for displaying news articles */}
        <InfiniteScroll
          dataLength={articles.length} // This is an important field to render the next data
          next={handleInfiniteScroll}
          hasMore={page < totalPage}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No more articles to load</b>
            </p>
          }
        >
          {/* Grid layout for displaying news articles */}
          <div className="row">
            {articles.map((elem) => (
              <div className="col-md-4" key={elem.id}>
                {/* Render the NewsItems component for each news article */}
                <NewsItems
                  title={elem.title ? elem.title.slice(0, 45) : ""}
                  description={
                    elem.description ? elem.description.slice(0, 85) : ""
                  }
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
      </div>
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
  setProgress: PropTypes.func.isRequired, // Ensure setProgress is a required function
  category: PropTypes.string.isRequired, // Ensure category is a required string
  country: PropTypes.string.isRequired, // Ensure country is a required string
};

// Export the News component as the default export
export default News;
