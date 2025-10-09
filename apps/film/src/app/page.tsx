import { FilmComponent } from "@sumer/film-core";
import { FilmFeatureComponent } from "@sumer/film-feature";

export default function Home() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Film Micro-Frontend</h1>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        This is a simple showcase of a micro-frontend component.
      </p>

      <a
        href="/"
        style={{
          marginBottom: "2rem",
          color: "#666",
          textDecoration: "underline",
          fontSize: "1rem",
          fontWeight: "bold",
          display: "block",
          textAlign: "center",
          transition: "all 0.3s ease",
          border: "1px solid #ddd",
          padding: "1rem",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        Back to Home
      </a>

      <div
        style={{
          border: "2px dashed #ddd",
          padding: "2rem",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: "1rem" }}>
          Micro-Frontend Component:
        </h2>
        <FilmComponent />
      </div>

      <FilmFeatureComponent />

      <div style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#888" }}>
        <p>
          This component is loaded from the <code>@sumer/film</code> package.
        </p>
      </div>
    </div>
  );
}
