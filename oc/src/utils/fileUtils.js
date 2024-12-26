/**
 * File system utilities for package management
 */
const path = require('path');
const fs = require('fs').promises;
const logger = require('./logger');

async function ensureDirectory(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
    logger.debug('Directory ensured', { path: dirPath });
  } catch (error) {
    logger.error('Failed to create directory', { path: dirPath, error: error.message });
    throw error;
  }
}

async function writePackageFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content, 'utf8');
    logger.debug('File written successfully', { path: filePath });
  } catch (error) {
    logger.error('Failed to write file', { path: filePath, error: error.message });
    throw error;
  }
}

async function readPackageFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    logger.debug('File read successfully', { path: filePath });
    return content;
  } catch (error) {
    logger.error('Failed to read file', { path: filePath, error: error.message });
    throw error;
  }
}

module.exports = {
  ensureDirectory,
  writePackageFile,
  readPackageFile
};