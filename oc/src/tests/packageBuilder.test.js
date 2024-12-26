/**
 * Tests for PackageBuilder
 */
const PackageBuilder = require('../builders/packageBuilder');
const { ValidationError } = require('../validators/packageValidator');
const defaultConfig = require('../config/defaultConfig');

describe('PackageBuilder', () => {
  let builder;

  beforeEach(() => {
    builder = new PackageBuilder(defaultConfig);
  });

  test('builds package successfully', async () => {
    const packageInfo = {
      name: 'test-package',
      version: '1.0.0',
      dependencies: []
    };

    const result = await builder.buildPackage(packageInfo);
    expect(result.status).toBe('built');
    expect(result.name).toBe(packageInfo.name);
  });

  test('validates package info', async () => {
    const invalidPackage = {
      name: 'test-package',
      version: 'invalid'
    };

    await expect(builder.buildPackage(invalidPackage))
      .rejects
      .toThrow(ValidationError);
  });

  test('tests package successfully', async () => {
    const packageInfo = {
      name: 'test-package',
      version: '1.0.0'
    };

    const result = await builder.testPackage(packageInfo);
    expect(result.success).toBe(true);
    expect(result.testDate).toBeDefined();
  });
});