#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  RELEASE_CONFIG,
  getCurrentEnvironment,
} = require("../release-config.js");

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

// Automatically discover all package.json files in the workspace
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

function main() {
  const environment = getCurrentEnvironment();
  console.log("🔍 Detected RELEASE_ENV:", environment);
  if (!environment) {
    console.log("📦 No RELEASE_ENV defined, skipping version updates");
    return;
  }

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
  console.log(
    `✅ Completed: ${updatesCount} packages updated for ${environment} environment`
  );
}

// Execute only if called directly (not imported)
if (require.main === module) {
  main();
}

module.exports = { main, updatePackageDependencies };
