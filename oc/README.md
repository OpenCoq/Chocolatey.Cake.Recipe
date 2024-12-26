# Chocolatey.Cake.Recipe

A powerful and flexible Cake recipe for building and publishing Chocolatey packages, designed to streamline your package automation workflow.

## Overview

Chocolatey.Cake.Recipe is a comprehensive build recipe for Cake that simplifies the process of creating, testing, and publishing Chocolatey packages. It provides a standardized approach to package management while offering extensive customization options.

**Key Benefits:**
- Automated package versioning
- Standardized build processes
- Integrated testing framework
- Flexible publishing options
- Built-in CI/CD support

## Technical Requirements

### Git Version

**Minimum Required Version: 2.22.0**

This version is required because:
- Support for the `--branch` parameter in `git clone`
- Enhanced credential handling
- Improved sparse checkout functionality
- Better handling of repository references

### Additional Prerequisites

- Windows OS (Windows 10 or later recommended)
- PowerShell 5.0 or later
- .NET Framework 4.7.2 or later
- Chocolatey CLI installed
- Administrative privileges for package installations

## Installation

### Standard Installation

Add the following to your `build.cake` file:

```csharp
#load nuget:?package=Chocolatey.Cake.Recipe&version=1.0.0

Build.Run();
```

### Pre-release Version

For testing new features, use the pre-release version:

```csharp
#load nuget:?package=Chocolatey.Cake.Recipe&version=1.1.0-beta&prerelease
```

### Specific Version

Pin to a specific version for stability:

```csharp
#load nuget:?package=Chocolatey.Cake.Recipe&version=1.0.3
```

## Package Source Configuration

### Push Sources Concept

Push sources define where your packages will be published. The recipe supports two types of sources:
- Release (stable packages)
- Pre-release (beta/testing packages)

### Default Configuration

```json
{
  "ReleasePushSource": "https://push.chocolatey.org/",
  "PreReleasePushSource": "https://push.chocolatey.org/"
}
```

### Custom Source Configuration

Set the following environment variables to override defaults:

```powershell
# Release Source
$env:CHOCO_RELEASE_SOURCE="https://your-repo.com/api/v2/package"
$env:CHOCO_RELEASE_API_KEY="your-api-key"

# Pre-release Source
$env:CHOCO_PRERELEASE_SOURCE="https://your-beta-repo.com/api/v2/package"
$env:CHOCO_PRERELEASE_API_KEY="your-beta-api-key"
```

### Authentication Methods

#### API Key (Recommended)
```powershell
$env:CHOCO_SOURCE_API_KEY="your-api-key"
```

#### Username/Password
```powershell
$env:CHOCO_SOURCE_USER="username"
$env:CHOCO_SOURCE_PASS="password"
```

## Build Arguments

| Argument | Description | Type | Default | Example |
|----------|-------------|------|---------|---------|
| `target` | Build target to execute | String | `Default` | `--target=Pack` |
| `configuration` | Build configuration | String | `Release` | `--configuration=Debug` |
| `verbosity` | Log verbosity level | String | `Normal` | `--verbosity=Diagnostic` |
| `exclude` | Patterns to exclude | String[] | `null` | `--exclude="**/test/**"` |
| `version` | Package version | String | `auto` | `--version=1.2.3` |

## Example: Building OpenCog Packages

Here's a detailed example of building Chocolatey packages for the OpenCog ecosystem:

### 1. CogUtil Package

```powershell
# Create package structure
choco new cogutil --version=2.0.0

# Edit cogutil.nuspec
<?xml version="1.0"?>
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
  <metadata>
    <id>cogutil</id>
    <version>2.0.0</version>
    <title>OpenCog CogUtil</title>
    <authors>OpenCog Foundation</authors>
    <description>OpenCog Utilities Library</description>
    <dependencies>
      <dependency id="boost-vc142" version="1.73.0" />
    </dependencies>
  </metadata>
</package>

# Build and test
choco pack
choco test cogutil --version=2.0.0
```

### 2. AtomSpace Package

```powershell
# Create package structure
choco new atomspace --version=5.0.0

# Edit atomspace.nuspec
<?xml version="1.0"?>
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
  <metadata>
    <id>atomspace</id>
    <version>5.0.0</version>
    <title>OpenCog AtomSpace</title>
    <authors>OpenCog Foundation</authors>
    <description>OpenCog AtomSpace - Hypergraph Database</description>
    <dependencies>
      <dependency id="cogutil" version="2.0.0" />
    </dependencies>
  </metadata>
</package>

# Build and test
choco pack
choco test atomspace --version=5.0.0
```

### 3. CogServer Package

```powershell
# Create package structure
choco new cogserver --version=3.0.0

# Edit cogserver.nuspec
<?xml version="1.0"?>
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
  <metadata>
    <id>cogserver</id>
    <version>3.0.0</version>
    <title>OpenCog CogServer</title>
    <authors>OpenCog Foundation</authors>
    <description>OpenCog Network Server</description>
    <dependencies>
      <dependency id="atomspace" version="5.0.0" />
    </dependencies>
  </metadata>
</package>

# Build and test
choco pack
choco test cogserver --version=3.0.0
```

### 4. MOSES Package

```powershell
# Create package structure
choco new moses --version=3.6.0

# Edit moses.nuspec
<?xml version="1.0"?>
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
  <metadata>
    <id>moses</id>
    <version>3.6.0</version>
    <title>OpenCog MOSES</title>
    <authors>OpenCog Foundation</authors>
    <description>Meta-Optimizing Semantic Evolutionary Search</description>
    <dependencies>
      <dependency id="cogutil" version="2.0.0" />
      <dependency id="boost-vc142" version="1.73.0" />
    </dependencies>
  </metadata>
</package>

# Build and test
choco pack
choco test moses --version=3.6.0
```

### Publishing Workflow

```powershell
# Set environment variables
$env:CHOCO_RELEASE_API_KEY="your-api-key"

# Build and publish sequence
foreach ($package in @("cogutil", "atomspace", "cogserver", "moses")) {
    choco pack $package.nuspec
    choco push $package.nupkg --source="https://push.chocolatey.org/"
}
```

## Best Practices

1. **Version Management**
   - Follow semantic versioning
   - Keep dependencies up to date
   - Test all version upgrades thoroughly

2. **Package Dependencies**
   - Clearly specify all dependencies
   - Use version ranges appropriately
   - Test dependency chains

3. **Testing**
   - Test installation on clean systems
   - Verify uninstallation process
   - Check for common configuration issues

4. **Documentation**
   - Include detailed package descriptions
   - Document all configuration options
   - Provide usage examples

## Support

For issues and feature requests, please use the GitHub issue tracker. For urgent support, contact the maintainers directly through the provided channels.

## License

This project is licensed under the MIT License - see the LICENSE file for details.