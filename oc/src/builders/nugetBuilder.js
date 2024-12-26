/**
 * Specialized builder for NuGet package creation
 */
class NugetBuilder {
    constructor(config) {
      this.config = config;
    }
  
    async createNuGetPackage(packageInfo) {
      const { name, version } = packageInfo;
      return {
        name,
        version,
        format: 'nupkg',
        status: 'created'
      };
    }
  }
  
  module.exports = NugetBuilder;