# Environment-Based Package Version Management

This document explains how to use the environment-based package version management system in this Turborepo monorepo.

## Overview

The system automatically installs different package versions based on the environment:

- **Development**: Uses the latest version (e.g., `@eduardidn-ss/repo-ui@1.0.9`)
- **Production**: Uses stable versions (e.g., `@eduardidn-ss/repo-ui@1.0.6`)

## Configuration

### 1. GitHub Packages Registry (`.npmrc`)

Since `@eduardidn-ss/repo-ui` is published to GitHub Packages, you need to configure the registry:

```bash
# .npmrc
@eduardidn-ss:registry=https://npm.pkg.github.com/
```

> **Note**: The `@eduardidn-ss/repo-ui` package is [public](https://github.com/users/eduardidn-ss/packages/npm/repo-ui/526366835), so no authentication is required.

### Authentication for Private Packages

If the package is private, you'll need to authenticate:

1. **Create a GitHub Personal Access Token** with `read:packages` permission
2. **Set the token as an environment variable**:
   ```bash
   export GITHUB_TOKEN=your_token_here
   ```
3. **Run the setup script**:
   ```bash
   pnpm run setup-github-auth
   ```
4. **Or add it manually to your `.npmrc`**:
   ```bash
   //npm.pkg.github.com/:_authToken=your_token_here
   ```

### 2. Release Configuration (`release-config.js`)

The system uses `release-config.js` to define which versions to use for each environment:

```javascript
const RELEASE_CONFIG = {
  development: {
    "@eduardidn-ss/repo-ui": "1.0.9",
  },
  production: {
    "@eduardidn-ss/repo-ui": "1.0.6",
  },
};
```

### 2. Package Dependencies

Add the package to your `package.json` dependencies with the development version:

```json
{
  "dependencies": {
    "@eduardidn-ss/repo-ui": "1.0.9"
  }
}
```

## Usage

### Automatic Installation (Recommended)

The system automatically handles version selection when you run `pnpm install`:

```bash
# Development environment (uses latest versions)
NODE_ENV=development pnpm install

# Production environment (uses stable versions)
NODE_ENV=production pnpm install
```

### Manual Scripts

You can also use the provided npm scripts:

```bash
# Development installation
pnpm run install:dev

# Production installation
pnpm run install:prod
```

### Legacy Scripts (Still Available)

```bash
# Using RELEASE_ENV (legacy method)
pnpm run install-dependencies      # Development
pnpm run install-dependencies:prod # Production
```

## How It Works

1. **Environment Detection**: The system checks for environment variables in this order:
   - `RELEASE_ENV` (legacy support)
   - `NODE_ENV`
   - Defaults to `development`

2. **Package Discovery**: Automatically finds all `package.json` files in:
   - `packages/*/package.json`
   - `apps/*/package.json`

3. **Version Updates**: Updates dependencies based on the environment configuration

4. **Automatic Installation**: The `preinstall` script runs before `pnpm install` to ensure the correct versions are installed

## Preinstall Hook

The system includes a `preinstall` script that automatically runs before `pnpm install` to update package.json with the correct versions based on the current environment, then installs the updated dependencies.

## Environment Variables

| Variable      | Description                           | Priority |
| ------------- | ------------------------------------- | -------- |
| `RELEASE_ENV` | Legacy environment variable           | 1        |
| `NODE_ENV`    | Standard Node.js environment variable | 2        |
| Default       | Falls back to `development`           | 3        |

## Examples

### Development Setup

```bash
# Set environment and install
export NODE_ENV=development
pnpm install

# Or use the script
pnpm run install:dev
```

### Production Setup

```bash
# Set environment and install
export NODE_ENV=production
pnpm install

# Or use the script
pnpm run install:prod
```

### CI/CD Pipeline

```yaml
# GitHub Actions example
- name: Install dependencies
  run: |
    export NODE_ENV=production
    pnpm install
```

## Troubleshooting

### Common Issues

1. **Wrong versions installed**: Check that `NODE_ENV` is set correctly
2. **Script not running**: Ensure the `postinstall` script is in your root `package.json`
3. **Package not found**: Verify the package name in `release-config.js` matches your dependency
4. **GitHub Packages 404 Error**:
   - Ensure `.npmrc` is configured with `@eduardidn-ss:registry=https://npm.pkg.github.com/`
   - Check if you have access to the GitHub repository
   - Verify the package name and version exist in GitHub Packages
   - For private packages, ensure you're authenticated with a GitHub token
   - **Note**: `@eduardidn-ss/repo-ui` is public, so no authentication needed

### Debug Mode

To see what the system is doing, check the console output:

```bash
NODE_ENV=development pnpm install
# Look for messages like:
# 🔍 Detected environment: development
# 🚀 Updating versions for environment: development
# ✓ Updated dependencies in /path/to/package.json
```

## Adding New Packages

To add a new package to the environment management system:

1. **Add to `release-config.js`**:

   ```javascript
   const RELEASE_CONFIG = {
     development: {
       "@eduardidn-ss/repo-ui": "1.0.9",
       "@your-org/your-package": "latest", // or specific version
     },
     production: {
       "@eduardidn-ss/repo-ui": "1.0.6",
       "@your-org/your-package": "^1.0.0",
     },
   };
   ```

2. **Add to your package's `package.json`**:

   ```json
   {
     "dependencies": {
       "@your-org/your-package": "latest"
     }
   }
   ```

3. **Test the setup**:
   ```bash
   NODE_ENV=development pnpm install
   NODE_ENV=production pnpm install
   ```

## Best Practices

1. **Use semantic versioning** for production versions
2. **Test both environments** before deploying
3. **Document version changes** in your release notes
4. **Use the latest stable version** for development
5. **Pin production versions** to avoid breaking changes

## Edge Cases and Improvements

### Edge Case Handling

1. **Missing Environment**: Falls back to `development`
2. **Invalid Environment**: Shows error with available options
3. **Package Not Found**: Skips silently (non-breaking)
4. **Installation Failure**: Exits with error code

### Suggested Improvements

1. **Version Validation**: Add checks to ensure versions exist in registry
2. **Lock File Management**: Automatically update `pnpm-lock.yaml`
3. **Dry Run Mode**: Add `--dry-run` flag to preview changes
4. **Logging**: Add more detailed logging for debugging
5. **Rollback**: Add ability to revert to previous versions

### Advanced Configuration

For more complex scenarios, you can extend the system:

```javascript
// Custom environment detection
const getCurrentEnvironmentWithFallback = () => {
  // Your custom logic here
  return process.env.CUSTOM_ENV || process.env.NODE_ENV || "development";
};
```

## Integration with Turborepo

This system works seamlessly with Turborepo:

- **Build caching**: Different environments create separate cache keys
- **Task dependencies**: Environment changes trigger rebuilds
- **Filtering**: Use `--filter` to target specific packages

```bash
# Build specific package in production mode
NODE_ENV=production turbo run build --filter=@sumer/film
```
