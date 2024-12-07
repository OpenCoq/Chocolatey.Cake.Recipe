/**
 * Utility functions for handling environment variables
 */
const getEnvironmentVariable = (name, defaultValue = '') => {
    return process.env[name] || defaultValue;
  };
  
  const getSourceConfig = () => {
    return {
      release: {
        source: getEnvironmentVariable('CHOCO_RELEASE_SOURCE'),
        apiKey: getEnvironmentVariable('CHOCO_RELEASE_API_KEY')
      },
      preRelease: {
        source: getEnvironmentVariable('CHOCO_PRERELEASE_SOURCE'),
        apiKey: getEnvironmentVariable('CHOCO_PRERELEASE_API_KEY')
      }
    };
  };
  
  const getAuthConfig = () => {
    return {
      apiKey: getEnvironmentVariable('CHOCO_SOURCE_API_KEY'),
      username: getEnvironmentVariable('CHOCO_SOURCE_USER'),
      password: getEnvironmentVariable('CHOCO_SOURCE_PASS')
    };
  };
  
  module.exports = {
    getEnvironmentVariable,
    getSourceConfig,
    getAuthConfig
  };