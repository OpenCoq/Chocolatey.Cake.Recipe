/**
 * Version management utilities
 */
const semver = require('semver');

function isValidVersion(version) {
  return semver.valid(version) !== null;
}

function compareVersions(version1, version2) {
  return semver.compare(version1, version2);
}

function incrementVersion(version, type = 'patch') {
  return semver.inc(version, type);
}

function isPreRelease(version) {
  return semver.prerelease(version) !== null;
}

module.exports = {
  isValidVersion,
  compareVersions,
  incrementVersion,
  isPreRelease
};