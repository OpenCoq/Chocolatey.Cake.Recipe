/**
 * NuSpec template generator
 */
const generateNuSpec = ({ id, version, title, authors, description, dependencies }) => {
    const dependenciesXml = dependencies
      .map(dep => `      <dependency id="${dep.id}" version="${dep.version}" />`)
      .join('\n');
  
    return `<?xml version="1.0"?>
  <package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
    <metadata>
      <id>${id}</id>
      <version>${version}</version>
      <title>${title}</title>
      <authors>${authors}</authors>
      <description>${description}</description>
      <dependencies>
  ${dependenciesXml}
      </dependencies>
    </metadata>
  </package>`;
  };
  
  module.exports = {
    generateNuSpec
  };