const RELEASE_CONFIG = {
  development: {
    "@eduardidn-ss/repo-ui": "1.0.9",
  },
  production: {
    "@eduardidn-ss/repo-ui": "1.0.6",
  },
};

const getCurrentEnvironment = () => {
  return process.env.RELEASE_ENV;
};

module.exports = { RELEASE_CONFIG, getCurrentEnvironment };
