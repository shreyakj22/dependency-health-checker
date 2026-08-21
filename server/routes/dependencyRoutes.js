const express = require("express");
const { getLatestVersion } = require("../services/npmService");
const semver = require("semver");

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const packageData = req.body;

    if (!packageData || typeof packageData !== "object") {
      return res.status(400).json({
        error: "Invalid package.json data",
      });
    }

    const dependencies = packageData.dependencies || {};
    const devDependencies = packageData.devDependencies || {};

    const allDependencies = {
      ...dependencies,
      ...devDependencies,
    };

    const dependencyList = [];

    for (const [name, versionRange] of Object.entries(allDependencies)) {
      const installedVersion = semver.minVersion(versionRange)?.version;
      const latestVersion = await getLatestVersion(name);

      let status = "unknown";

      if (installedVersion && latestVersion) {
        if (semver.lt(installedVersion, latestVersion)) {
          status = "outdated";
        } else {
          status = "current";
        }
      }

      dependencyList.push({
        name,
        versionRange,
        installedVersion,
        latestVersion,
        status,
      });
    }

    const total = dependencyList.length;

    const current = dependencyList.filter(
      (dependency) => dependency.status === "current"
    ).length;

    const outdated = dependencyList.filter(
      (dependency) => dependency.status === "outdated"
    ).length;

    const healthScore =
      total === 0 ? 100 : Math.round((current / total) * 100);

      let healthStatus;

if (healthScore >= 80) {
  healthStatus = "Healthy";
} else if (healthScore >= 50) {
  healthStatus = "Needs Attention";
} else {
  healthStatus = "Critical";
}

    res.json({
      success: true,
      summary: {
        total,
        current,
        outdated,
        healthScore,
      },
      dependencies: dependencyList,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to analyze dependencies",
    });
  }
});

module.exports = router;