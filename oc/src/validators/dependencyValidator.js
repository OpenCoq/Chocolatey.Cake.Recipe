/**
 * Dependency validation functionality
 */
const { isValidVersion } = require('../utils/versionUtils');
const logger = require('../utils/logger');

class DependencyValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DependencyValidationError';
  }
}

async function validateDependencyChain(dependencies) {
  logger.debug('Validating dependency chain', { dependencies });

  const validatedDeps = new Set();
  const errors = [];

  for (const dep of dependencies) {
    try {
      await validateSingleDependency(dep);
      validatedDeps.add(dep.id);
    } catch (error) {
      errors.push(`${dep.id}: ${error.message}`);
    }
  }

  if (errors.length > 0) {
    throw new DependencyValidationError(
      `Dependency validation failed:\n${errors.join('\n')}`
    );
  }

  return true;
}

async function validateSingleDependency(dependency) {
  const { id, version, optional = false } = dependency;

  if (!id) {
    throw new DependencyValidationError('Dependency ID is required');
  }

  if (!optional && !version) {
    throw new DependencyValidationError('Version is required for non-optional dependencies');
  }

  if (version && !isValidVersion(version)) {
    throw new DependencyValidationError(`Invalid version format: ${version}`);
  }

  return true;
}

module.exports = {
  validateDependencyChain,
  validateSingleDependency,
  DependencyValidationError
};