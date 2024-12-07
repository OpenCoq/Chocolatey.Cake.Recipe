/**
 * Main entry point for the Chocolatey.Cake.Recipe
 */
const PackageBuilder = require('./builders/packageBuilder');
const PackagePublisher = require('./publishers/packagePublisher');
const defaultConfig = require('./config/defaultConfig');
const { generateNuSpec } = require('./templates/nuspec');

class ChocolateyCakeRecipe {
  constructor(config = {}) {
    this.config = { ...defaultConfig, ...config };
    this.builder = new PackageBuilder(this.config);
    this.publisher = new PackagePublisher();
  }

  async buildAndPublish(packageInfo, options = {}) {
    const nuspec = generateNuSpec(packageInfo);
    const buildResult = await this.builder.buildPackage(packageInfo);
    const testResult = await this.builder.testPackage(buildResult);
    
    if (testResult.success) {
      return await this.publisher.publishPackage(buildResult, options.isPreRelease);
    }
    
    throw new Error('Package build or test failed');
  }
}

module.exports = ChocolateyCakeRecipe;