const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// Tambahkan alias sesuai `tsconfig.json`
config.resolver.extraNodeModules = {
  '@': path.resolve(projectRoot),
};

// Optional: jika kamu ingin `@/*` juga dikenali saat import
config.watchFolders = [
  path.resolve(projectRoot),
];

module.exports = config;
