const RELEASE_CONFIG = {
  development: {
    "@eduardidn-ss/repo-ui": "workspace:*",
  },
  production: {
    "@eduardidn-ss/repo-ui": "workspace:1.0.2",
  },
};

const getCurrentEnvironment = () => {
  return process.env.RELEASE_ENV;
};

module.exports = { RELEASE_CONFIG, getCurrentEnvironment };
