export default function DemoPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "3rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
          border: "1px solid #e2e8f0",
          maxWidth: "700px",
          width: "100%",
          textAlign: "left",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              margin: "0 0 0.5rem 0",
              color: "#1e293b",
              letterSpacing: "-0.025em",
            }}
          >
            Application Demo
          </h1>
          <div
            style={{
              width: "40px",
              height: "3px",
              background: "#10b981",
              borderRadius: "2px",
            }}
          />
        </div>

        <p
          style={{
            fontSize: "1rem",
            color: "#64748b",
            margin: "0 0 2.5rem 0",
            lineHeight: "1.6",
          }}
        >
          Demonstration environment for micro-frontend integration testing. This
          module validates cross-application communication protocols and shared
          component libraries.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              background: "#3b82f6",
              color: "white",
              padding: "12px 20px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "0.95rem",
              transition: "all 0.2s ease",
              border: "1px solid #2563eb",
            }}
          >
            <span style={{ marginRight: "8px" }}>←</span>
            Return to Main Application
          </a>

          <a
            href="/demo-zone"
            style={{
              display: "flex",
              alignItems: "center",
              background: "white",
              color: "#374151",
              padding: "12px 20px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "0.95rem",
              transition: "all 0.2s ease",
              border: "1px solid #d1d5db",
            }}
          >
            <span style={{ marginRight: "8px" }}>→</span>
            Navigate to Demo Zone
          </a>
        </div>

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#f0fdf4",
            borderRadius: "6px",
            border: "1px solid #bbf7d0",
          }}
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: "#166534",
              margin: "0",
              fontFamily: "ui-monospace, 'SF Mono', Monaco, monospace",
            }}
          >
            <strong>Demo Environment:</strong> Active - All systems operational
          </p>
        </div>
      </div>
    </div>
  );
}
