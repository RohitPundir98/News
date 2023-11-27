// Import necessary modules from React and external dependencies
import React, { Component } from "react";
import NewsItems from "./NewsItems"; // Import the NewsItems component
import PropTypes from "prop-types"; // Import PropTypes for prop validation

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
    document.title=`${this.capitalFirstLetter(this.props.category)} Top Headlines `;
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
      this.setState({
        articles: parsedData.articles,
        totalPage: Math.ceil(parsedData.totalResults / this.props.pageSize),
        loading: false, // Set loading to false after data is fetched
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false }); // Set loading to false in case of an error
    }
  }

  // Event handler for clicking the 'Previous' button
  handlePrevClick = async () => {
    if (this.state.page > 1) {
      await this.setState({ page: this.state.page - 1 });
      await this.fetchNews(this.props.category, this.props.country);
    }
  };

  // Event handler for clicking the 'Next' button
  handleNextClick = async () => {
    if (this.state.page < this.state.totalPage) {
      await this.setState({ page: this.state.page + 1 });
      await this.fetchNews(this.props.category, this.props.country);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top after loading new content
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
      await this.setState({ page: 1 }); // Reset page to 1 when the country changes
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

        {/* Empty container for spacing */}
        <div className="container my-3" style={{ marginTop: "70px" }}></div>

        {/* Container for displaying news articles */}
        <div className="container my-3">
          {this.state.loading ? ( // Show a loading message if data is still being fetched
            <div className="text-center">
              <p>Loading...</p>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div>
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

              {/* Pagination controls */}
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handlePrevClick}
                >
                  Previous &larr;
                </button>
                <p style={{ color: "#b2ac88", margin: "0" }}>
                  Page {this.state.page} of {this.state.totalPage}
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handleNextClick}
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

// Default props for the News c omponent
News.defaultProps = {
  pageSize: 9, // Default number of articles per page
};

// Prop types for the News component
News.propTypes = {
  pageSize: PropTypes.number, // Validate that pageSize is a number
};

// Export the News component as the default export
export default News;