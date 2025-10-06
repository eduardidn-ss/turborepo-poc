#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const {
  RELEASE_CONFIG,
  getCurrentEnvironment,
} = require("../release-config.js");

/**
 * Get the current environment from NODE_ENV or RELEASE_ENV
 * Priority: RELEASE_ENV > NODE_ENV > development (default)
 */
function getCurrentEnvironmentWithFallback() {
  const releaseEnv = process.env.RELEASE_ENV;
  const nodeEnv = process.env.NODE_ENV;
  
  if (releaseEnv) {
    return releaseEnv;
  }
  
  if (nodeEnv) {
    return nodeEnv;
  }
  
  return "development";
}

/**
 * Update package.json dependencies based on environment
 */
function updatePackageDependencies(packagePath, config) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    let updated = false;
    const updates = [];

    // Check and update dependencies
    if (packageJson.dependencies) {
      for (const [depName, newVersion] of Object.entries(config)) {
        if (packageJson.dependencies[depName]) {
          const oldVersion = packageJson.dependencies[depName];
          packageJson.dependencies[depName] = newVersion;
          updates.push(`${depName}: ${oldVersion} → ${newVersion}`);
          updated = true;
        }
      }
    }

    if (updated) {
      fs.writeFileSync(
        packagePath,
        JSON.stringify(packageJson, null, 2) + "\n"
      );
      console.log(`✓ Updated dependencies in ${packagePath}:`);
      updates.forEach((update) => console.log(`  - ${update}`));
    }

    return updated;
  } catch (error) {
    console.error(
      `✗ Failed to update dependencies in ${packagePath}: ${error.message}`
    );
    return false;
  }
}

/**
 * Find all package.json files in the workspace
 */
function findPackageJsonFiles() {
  const packagePaths = {};

  // Search in packages/*/package.json
  const packagesDir = path.join(__dirname, "../packages");
  if (fs.existsSync(packagesDir)) {
    const packageDirs = fs.readdirSync(packagesDir);
    packageDirs.forEach((dir) => {
      const packageJsonPath = path.join(packagesDir, dir, "package.json");
      if (fs.existsSync(packageJsonPath)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
          packagePaths[pkg.name] = packageJsonPath;
        } catch (error) {
          console.warn(
            `⚠️  Could not read ${packageJsonPath}: ${error.message}`
          );
        }
      }
    });
  }

  // Search in apps/*/package.json
  const appsDir = path.join(__dirname, "../apps");
  if (fs.existsSync(appsDir)) {
    const appDirs = fs.readdirSync(appsDir);
    appDirs.forEach((dir) => {
      const packageJsonPath = path.join(appsDir, dir, "package.json");
      if (fs.existsSync(packageJsonPath)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
          packagePaths[pkg.name] = packageJsonPath;
        } catch (error) {
          console.warn(
            `⚠️  Could not read ${packageJsonPath}: ${error.message}`
          );
        }
      }
    });
  }

  return packagePaths;
}

/**
 * Install the updated dependencies using pnpm
 * Note: This function is not used in postinstall to avoid infinite loops
 */
function installDependencies() {
  try {
    console.log("📦 Installing updated dependencies...");
    execSync("pnpm install", { 
      stdio: "inherit",
      cwd: path.join(__dirname, "..")
    });
    console.log("✅ Dependencies installed successfully");
  } catch (error) {
    console.error("❌ Failed to install dependencies:", error.message);
    process.exit(1);
  }
}

/**
 * Main function to handle package version selection
 */
function main() {
  const environment = getCurrentEnvironmentWithFallback();
  console.log("🔍 Detected environment:", environment);
  
  // Verify that the environment exists in the configuration
  if (!RELEASE_CONFIG[environment]) {
    console.error(
      `❌ Environment "${environment}" not found in release config`
    );
    console.log(
      "Available environments:",
      Object.keys(RELEASE_CONFIG).join(", ")
    );
    process.exit(1);
  }

  console.log(`🚀 Updating versions for environment: ${environment}`);
  console.log("---");

  const config = RELEASE_CONFIG[environment];
  let updatesCount = 0;

  const packagePaths = findPackageJsonFiles();
  console.log("📦 Found packages:", Object.keys(packagePaths));

  // Update dependencies in each found package.json
  for (const [packageName, packagePath] of Object.entries(packagePaths)) {
    console.log(`\n🔍 Checking dependencies in ${packageName}...`);

    if (updatePackageDependencies(packagePath, config)) {
      updatesCount++;
    } else {
      console.log(`  ⏭️  No matching dependencies found in ${packageName}`);
    }
  }

  console.log("---");
  
  if (updatesCount > 0) {
    console.log(
      `✅ Completed: ${updatesCount} packages updated for ${environment} environment`
    );
    console.log("ℹ️  Dependencies will be installed with the correct versions");
  } else {
    console.log("ℹ️  No packages needed updates");
  }
}

// Execute only if called directly (not imported)
if (require.main === module) {
  main();
}

module.exports = { 
  main, 
  updatePackageDependencies, 
  getCurrentEnvironmentWithFallback 
};
