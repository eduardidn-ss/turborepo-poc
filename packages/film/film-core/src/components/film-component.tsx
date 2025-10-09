import React from "react";

export const FilmComponent = () => {
  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#fff",
      }}
    >
      <h3 style={{ margin: "0 0 1rem 0", color: "#333" }}>Film Component</h3>
      <p style={{ margin: "0 0 1rem 0", color: "#666" }}>
        This is a micro-frontend component from the film package.
      </p>
      <button
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Click me
      </button>
    </div>
  );
};

export default FilmComponent;
