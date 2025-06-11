const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === '@' || moduleName.startsWith('@/')) {
    const updatedModuleName = moduleName.replace('@', '.');
    return context.resolveRequest(context, updatedModuleName, platform);
  }
  
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;