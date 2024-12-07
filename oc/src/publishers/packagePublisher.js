/**
 * Package publishing functionality
 */
const SourceManager = require('./sourceManager');
const logger = require('../utils/logger');
const { isPreRelease } = require('../utils/versionUtils');

class PackagePublisher {
  constructor() {
    this.sourceManager = new SourceManager();
  }

  async publishPackage(packageInfo, forcePreRelease = false) {
    const shouldPublishPreRelease = forcePreRelease || isPreRelease(packageInfo.version);
    const source = this.sourceManager.getPublishSource(shouldPublishPreRelease);
    
    logger.info('Starting package publish', {
      package: packageInfo.name,
      version: packageInfo.version,
      isPreRelease: shouldPublishPreRelease
    });
    
    // Simulate publishing process
    const publishResult = {
      success: true,
      packageInfo,
      source: source.url,
      publishDate: new Date().toISOString()
    };

    logger.info('Package published successfully', {
      package: packageInfo.name,
      source: source.url
    });

    return publishResult;
  }
}

module.exports = PackagePublisher;