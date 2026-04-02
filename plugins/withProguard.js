const { withGradleProperties } = require("expo/config-plugins");

/**
 * Config plugin to configure Android release build optimizations.
 *
 * R8 minification and resource shrinking are DISABLED for now because
 * they strip classes and assets needed by Expo native modules at runtime,
 * causing immediate crashes on launch.
 *
 * TODO: Re-enable minification once a complete set of keep-rules has been
 * validated against the full dependency tree.
 */
const withProguard = (config) => {
  config = withGradleProperties(config, (cfg) => {
    const props = cfg.modResults;

    const setProperty = (key, value) => {
      const existing = props.find(
        (p) => p.type === "property" && p.key === key
      );
      if (existing) {
        existing.value = value;
      } else {
        props.push({ type: "property", key, value });
      }
    };

    // Disable R8 minification — it strips classes loaded via reflection / JSI
    setProperty("android.enableMinifyInReleaseBuilds", "false");

    // Disable resource shrinking — it removes dynamically loaded assets
    setProperty("android.enableShrinkResourcesInReleaseBuilds", "false");

    return cfg;
  });

  return config;
};

module.exports = withProguard;
