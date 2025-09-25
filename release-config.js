const RELEASE_CONFIG = {
  development: {
    "@repo/ui": "workspace:*",
  },
  production: {
    "@repo/ui": "workspace:1.1.0",
  },
};

const getCurrentEnvironment = () => {
  return process.env.RELEASE_ENV;
};

module.exports = { RELEASE_CONFIG, getCurrentEnvironment };
