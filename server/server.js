const dependencyRoutes = require("./routes/dependencyRoutes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/dependencies", dependencyRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "Dependency Health Checker API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});