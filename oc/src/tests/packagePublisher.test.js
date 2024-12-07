/**
 * Tests for PackagePublisher
 */
const PackagePublisher = require('../publishers/packagePublisher');

describe('PackagePublisher', () => {
  let publisher;

  beforeEach(() => {
    publisher = new PackagePublisher();
  });

  test('publishes package successfully', async () => {
    const packageInfo = {
      name: 'test-package',
      version: '1.0.0'
    };

    const result = await publisher.publishPackage(packageInfo);
    expect(result.success).toBe(true);
    expect(result.publishDate).toBeDefined();
  });

  test('handles pre-release publishing', async () => {
    const packageInfo = {
      name: 'test-package',
      version: '1.0.0-beta'
    };

    const result = await publisher.publishPackage(packageInfo, true);
    expect(result.success).toBe(true);
  });
});