/**
 * Package validation functionality
 */
const { isValidVersion } = require('../utils/versionUtils');
const logger = require('../utils/logger');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

async function validatePackageInfo(packageInfo) {
  const { name, version, dependencies = [] } = packageInfo;

  logger.debug('Validating package info', { name, version });

  if (!name) {
    throw new ValidationError('Package name is required');
  }

  if (!version) {
    throw new ValidationError('Package version is required');
  }

  if (!isValidVersion(version)) {
    throw new ValidationError('Invalid semantic version format');
  }

  for (const dep of dependencies) {
    if (!dep.id || !dep.version) {
      throw new ValidationError('Dependencies must have both id and version');
    }
    
    if (!isValidVersion(dep.version)) {
      throw new ValidationError(`Invalid version format for dependency ${dep.id}`);
    }
  }

  logger.debug('Package validation successful');
  return true;
}

module.exports = {
  validatePackageInfo,
  ValidationError
};