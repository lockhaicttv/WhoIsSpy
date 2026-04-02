const { withAppBuildGradle } = require("expo/config-plugins");

/**
 * Config plugin to enable ProGuard minification and resource shrinking
 * for Android release builds. This reduces APK/AAB size significantly.
 */
const withProguard = (config) => {
  return withAppBuildGradle(config, (config) => {
    const buildGradle = config.modResults.contents;

    // Enable minification (ProGuard/R8) for release builds
    if (!buildGradle.includes("shrinkResources")) {
      config.modResults.contents = buildGradle.replace(
        /buildTypes\s*\{[\s\S]*?release\s*\{/,
        (match) =>
          match +
          `\n            minifyEnabled true\n            shrinkResources true\n`
      );
    }

    return config;
  });
};

module.exports = withProguard;
