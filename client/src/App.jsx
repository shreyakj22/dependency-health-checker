import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [jsonText, setJsonText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const [result, setResult] = useState(null);

const [search, setSearch] = useState("");
const [filter, setFilter] = useState("all");
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleAnalyze = async () => {
    setError("");

    try {
      setLoading(true);

      let packageData;

      // If user pasted JSON
      if (jsonText.trim()) {
        packageData = JSON.parse(jsonText);
      }

      // If user uploaded a file
      else if (file) {
        const text = await file.text();
        packageData = JSON.parse(text);
      }

      // Nothing provided
      else {
        setError("Please upload or paste a package.json file.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/dependencies/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(packageData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      console.log("Analysis result:", data);
setResult(data);

    } catch (error) {
      console.error(error);

      if (error instanceof SyntaxError) {
        setError("Invalid JSON. Please provide a valid package.json.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Dependency Health Checker</h1>

        <p className="subtitle">
          Analyze your project's dependencies and identify outdated packages.
        </p>

        <div className="card">
          <h2>Upload package.json</h2>

          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
          />

          {file && (
            <p className="file-name">
              Selected: {file.name}
            </p>
          )}
        </div>

        <div className="or">OR</div>

        <div className="card">
          <h2>Paste package.json</h2>

          <textarea
            value={jsonText}
            onChange={(event) => setJsonText(event.target.value)}
            placeholder="Paste your package.json content here..."
            rows="12"
          />
        </div>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <button
          className="analyze-button"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Dependencies"}
        </button>
        {result && (
  <div className="results">

    <div className="card">
      <h2>Dependency Health</h2>

      <div className="score">
        {result.summary.healthScore ?? 0}/100
      </div>
<div className={`health-status ${result.summary.healthStatus?.toLowerCase().replace(" ", "-")}`}>
  {result.summary.healthStatus}
</div>
      <div className="stats">
        <div>
          <strong>{result.summary.total}</strong>
          <span>Total</span>
        </div>

        <div>
          <strong>{result.summary.current}</strong>
          <span>Current</span>
        </div>

        <div>
          <strong>{result.summary.outdated}</strong>
          <span>Outdated</span>
        </div>
      </div>
    </div>

    <div className="card">
      <h2>Dependency Analysis</h2>

     <div className="dependency-controls">
  <input
    type="text"
    placeholder="Search dependencies..."
    value={search}
    onChange={(event) => setSearch(event.target.value)}
  />

  <select
    value={filter}
    onChange={(event) => setFilter(event.target.value)}
  >
    <option value="all">All</option>
    <option value="current">Current</option>
    <option value="outdated">Outdated</option>
  </select>
</div>

<div className="dependency-list">
  {result.dependencies
    .filter((dependency) =>
      dependency.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((dependency) => {
      if (filter === "all") return true;
      return dependency.status === filter;
    })
    .map((dependency) => (
      <div
        className="dependency-row"
        key={dependency.name}
      >
        <div>
          <strong>{dependency.name}</strong>

          <p>
            {dependency.installedVersion} →{" "}
            {dependency.latestVersion}
          </p>
          {dependency.status === "outdated" && (
  <code className="update-command">
    npm install {dependency.name}@{dependency.latestVersion}
  </code>
)}
        </div>

        <span className={`status ${dependency.status}`}>
          {dependency.status}
        </span>
        {dependency.status === "outdated" && (
  <button
    className="copy-button"
    onClick={() =>
      navigator.clipboard.writeText(
        `npm install ${dependency.name}@${dependency.latestVersion}`
      )
    }
  >
    Copy
  </button>
)}
      </div>
    ))}
</div>
    </div>

  </div>
)}
      </div>
    </div>
  );
}

export default App;