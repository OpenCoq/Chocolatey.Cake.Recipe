/**
 * Hash utilities for package verification
 */
const crypto = require('crypto');
const logger = require('./logger');

function generatePackageHash(content) {
  try {
    const hash = crypto.createHash('sha256');
    hash.update(content);
    return hash.digest('hex');
  } catch (error) {
    logger.error('Failed to generate hash', { error: error.message });
    throw error;
  }
}

function verifyPackageHash(content, expectedHash) {
  const actualHash = generatePackageHash(content);
  return actualHash === expectedHash;
}

module.exports = {
  generatePackageHash,
  verifyPackageHash
};