const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure proper web scaling
config.web = {
  ...config.web,
  template: {
    ...config.web?.template,
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
  }
};

module.exports = config;