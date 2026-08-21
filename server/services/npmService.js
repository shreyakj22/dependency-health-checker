const axios = require("axios");

async function getLatestVersion(packageName) {
  try {
    const response = await axios.get(
      `https://registry.npmjs.org/${packageName}/latest`,
      {
        timeout: 5000,
      }
    );

    return response.data.version;
  } catch (error) {
    console.error(`Failed to check ${packageName}:`, error.message);

    return null;
  }
}

module.exports = {
  getLatestVersion,
};