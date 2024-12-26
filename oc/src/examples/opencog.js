/**
 * Example implementation for building OpenCog packages
 */
const ChocolateyCakeRecipe = require('../index');

const packages = [
  {
    id: 'cogutil',
    version: '2.0.0',
    title: 'OpenCog CogUtil',
    authors: 'OpenCog Foundation',
    description: 'OpenCog Utilities Library',
    dependencies: [
      { id: 'boost-vc142', version: '1.73.0' }
    ]
  },
  {
    id: 'atomspace',
    version: '5.0.0',
    title: 'OpenCog AtomSpace',
    authors: 'OpenCog Foundation',
    description: 'OpenCog AtomSpace - Hypergraph Database',
    dependencies: [
      { id: 'cogutil', version: '2.0.0' }
    ]
  },
  // Additional packages defined here
];

async function buildOpenCogPackages() {
  const recipe = new ChocolateyCakeRecipe();
  
  for (const pkg of packages) {
    try {
      const result = await recipe.buildAndPublish(pkg);
      console.log(`Successfully built and published ${pkg.id} v${pkg.version}`);
    } catch (error) {
      console.error(`Failed to build ${pkg.id}: ${error.message}`);
    }
  }
}

module.exports = {
  buildOpenCogPackages,
  packages
};