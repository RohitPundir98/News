import React from "react";

// Function-based component 'NewsItems'
const NewsItems = ({ imageUrl, title, description, newsUrl, isButtonDisabled, author, date, source }) => {
  // JSX to render the component
  return (
    // Wrapper for each news item with margin
    <div className="container">
      {/* Card for displaying news information */}
      <div className="card p-3 m-3 bg-secondary" style={{ height: "32.5rem" }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>{source}</span>
        {/* News image, default to a placeholder if not available */}
        <img
          src={!imageUrl ? "https://static.thenounproject.com/png/482114-200.png" : imageUrl}
          className="card-img-top border rounded"
          style={{ height: "15rem" }}
          alt={title}
        />

        {/* Card body containing title, description, and published time */}
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <span className="text-muted">
              By {author} on{" "}
              {new Date(date).toLocaleString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </span>
          </p>
        </div>

        {/* Read More button positioned at the bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {/* Link to the full news article */}
          <a
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark"
            disabled={isButtonDisabled}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItems;
