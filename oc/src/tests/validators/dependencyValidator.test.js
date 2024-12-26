/**
 * Tests for dependency validation
 */
const { 
    validateDependencyChain, 
    validateSingleDependency, 
    DependencyValidationError 
  } = require('../../validators/dependencyValidator');
  
  describe('dependencyValidator', () => {
    test('validates valid dependency chain', async () => {
      const deps = [
        { id: 'pkg1', version: '1.0.0' },
        { id: 'pkg2', version: '2.0.0' }
      ];
      await expect(validateDependencyChain(deps)).resolves.toBe(true);
    });
  
    test('throws on invalid dependency', async () => {
      const deps = [
        { id: 'pkg1', version: 'invalid' }
      ];
      await expect(validateDependencyChain(deps))
        .rejects
        .toThrow(DependencyValidationError);
    });
  
    test('validates optional dependency', async () => {
      const dep = { id: 'pkg1', optional: true };
      await expect(validateSingleDependency(dep)).resolves.toBe(true);
    });
  });