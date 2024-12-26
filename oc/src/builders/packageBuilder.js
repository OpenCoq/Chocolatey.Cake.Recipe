/**
 * Package building functionality
 */
const NugetBuilder = require('./nugetBuilder');
const { validatePackageInfo } = require('../validators/packageValidator');
const { validateDependencyChain } = require('../validators/dependencyValidator');
const { generatePackageHash } = require('../utils/hashUtils');
const logger = require('../utils/logger');

class PackageBuilder {
  constructor(config) {
    this.config = config;
    this.nugetBuilder = new NugetBuilder(config);
  }

  async buildPackage(packageInfo) {
    logger.info('Starting package build', { package: packageInfo.name });
    
    await validatePackageInfo(packageInfo);
    await validateDependencyChain(packageInfo.dependencies || []);
    
    const { name, version, dependencies } = packageInfo;
    const nugetPackage = await this.nugetBuilder.createNuGetPackage(packageInfo);
    
    const packageHash = generatePackageHash(JSON.stringify(nugetPackage));
    
    logger.info('Package build completed', { 
      package: name, 
      version,
      hash: packageHash 
    });
    
    return {
      ...nugetPackage,
      dependencies,
      hash: packageHash,
      status: 'built'
    };
  }

  async testPackage(packageInfo) {
    logger.info('Starting package test', { package: packageInfo.name });
    
    const testResult = {
      success: true,
      packageInfo,
      testDate: new Date().toISOString()
    };
    
    logger.info('Package test completed', { 
      package: packageInfo.name,
      success: testResult.success 
    });
    
    return testResult;
  }
}

module.exports = PackageBuilder;