/**
 * Tests for hash utilities
 */
const { generatePackageHash, verifyPackageHash } = require('../../utils/hashUtils');

describe('hashUtils', () => {
  test('generates consistent hash for same content', () => {
    const content = 'test content';
    const hash1 = generatePackageHash(content);
    const hash2 = generatePackageHash(content);
    expect(hash1).toBe(hash2);
  });

  test('generates different hash for different content', () => {
    const hash1 = generatePackageHash('content1');
    const hash2 = generatePackageHash('content2');
    expect(hash1).not.toBe(hash2);
  });

  test('verifies hash correctly', () => {
    const content = 'test content';
    const hash = generatePackageHash(content);
    expect(verifyPackageHash(content, hash)).toBe(true);
    expect(verifyPackageHash(content, 'wrong-hash')).toBe(false);
  });
});