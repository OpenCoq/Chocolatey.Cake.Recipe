/**
 * Manages package source configurations and authentication
 */
const { getSourceConfig, getAuthConfig } = require('../utils/environmentUtils');

class SourceManager {
  constructor() {
    this.sourceConfig = getSourceConfig();
    this.authConfig = getAuthConfig();
  }

  getPublishSource(isPreRelease) {
    const config = isPreRelease ? this.sourceConfig.preRelease : this.sourceConfig.release;
    return {
      url: config.source,
      apiKey: config.apiKey || this.authConfig.apiKey,
      credentials: this._getCredentials()
    };
  }

  _getCredentials() {
    if (this.authConfig.username && this.authConfig.password) {
      return {
        username: this.authConfig.username,
        password: this.authConfig.password
      };
    }
    return null;
  }
}

module.exports = SourceManager;