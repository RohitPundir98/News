// Import necessary modules from React and external dependencies
import React, { Component } from "react";
import NewsItems from "./NewsItems"; // Import the NewsItems component
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import InfiniteScroll from "react-infinite-scroll-component"; // Import InfiniteScroll component

// Define a class-based component called 'News'
class News extends Component {
  // Constructor to initialize the component's state
  constructor(props) {
    super(props);
    // Initial state with default values
    this.state = {
      articles: [], // Array to store news articles
      loading: true, // Flag to indicate whether data is being loaded
      page: 1, // Current page of news articles
      totalPage: 0, // Total number of pages available
      country: "in", // Default country is 'in'
    };
    document.title = `${this.capitalFirstLetter(this.props.category)} Top Headlines `;
  }

  // Method to capitalize the first letter of a string
  capitalFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Lifecycle method: componentDidMount runs after the component is inserted into the DOM
  async componentDidMount() {
    // Set default values for category and country
    const defaultCategory = "general";
    const defaultCountry = "in";

    // Update the state with default values and then fetch news
    await this.setState({
      page: 1,
      country: defaultCountry,
    });

    await this.fetchNews(defaultCategory, defaultCountry);
  }

  // Method to fetch news data from the API
  async fetchNews(category, country) {
    this.setState({ loading: true }); // Set loading to true before fetching data

    // Construct the API URL based on category, country, page, and pageSize
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=e266f6b0f1d84842b00f9ad13c4541cd&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    try {
      let data = await fetch(url); // Fetch data from the API

      if (!data.ok) {
        throw new Error("Network response was not ok");
      }

      let parsedData = await data.json(); // Parse the JSON data

      // Update the state with fetched data
      this.setState((prevState) => ({
        articles: [...prevState.articles, ...parsedData.articles], // Concatenate new articles with existing ones
        totalPage: Math.ceil(parsedData.totalResults / this.props.pageSize),
        loading: false, // Set loading to false after data is fetched
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false }); // Set loading to false in case of an error
    }
  }

  // Load more news articles when the user scrolls to the bottom
  handleInfiniteScroll = () => {
    if (this.state.page < this.state.totalPage) {
      this.setState((prevState) => ({ page: prevState.page + 1 }));
      this.fetchNews(this.props.category, this.props.country);
    }
  };

  // Lifecycle method: componentDidUpdate runs when the component updates
  async componentDidUpdate(prevProps) {
    // Check if the 'category' prop has changed
    if (prevProps.category !== this.props.category) {
      document.title = `News Monkey ${this.capitalFirstLetter(this.props.category)}`; // Update document title
    }

    // Check if the 'country' prop has changed
    if (prevProps.country !== this.props.country) {
      await this.setState({ page: 1, articles: [] }); // Reset page to 1 and clear articles when the country changes
      await this.fetchNews(this.props.category, this.props.country);
    }
  }

  // Render method to render the component
  render() {
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
          <h2 className="text-center">{`${this.capitalFirstLetter(this.props.category)} - Top Headlines `}</h2>
        </div>

        {/* Container for displaying news articles */}
        <InfiniteScroll
          dataLength={this.state.articles.length} // This is an important field to render the next data
          next={this.handleInfiniteScroll}
          hasMore={this.state.page < this.state.totalPage}
          loader={
            // Display different messages for initial loading and subsequent page loading
            this.state.loading && this.state.page === 1 ? (
              <div className="text-center" key="loader">
                <p>Loading...</p>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : this.state.loading ? (
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
            {this.state.articles.map((elem) => (
              <div className="col-md-4" key={elem.url}>
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
      </>
    );
  }
}

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
