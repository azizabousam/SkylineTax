export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1
          className="text-6xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)", color: "rgb(48, 101, 152)" }}
        >
          404
        </h1>
        <p className="text-lg text-muted-foreground mb-6" style={{ fontFamily: "var(--font-body)" }}>
          Page not found
        </p>
        <a
          href="/"
          className="text-sm font-medium underline"
          style={{ color: "rgb(48, 101, 152)", fontFamily: "var(--font-body)" }}
        >
          Back to home
        </a>
      </div>
    </div>
  );
}
