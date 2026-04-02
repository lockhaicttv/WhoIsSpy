const { withAppBuildGradle, withDangerousMod, withGradleProperties } = require("expo/config-plugins");
const { writeFileSync, existsSync, mkdirSync } = require("fs");
const path = require("path");

/**
 * ProGuard / R8 keep rules required for React Native + Expo.
 * Without these the release build strips classes used via reflection / JSI
 * and the app crashes on launch.
 */
const PROGUARD_RULES = `
# --- React Native core ---
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }

# --- Expo modules (loaded via reflection / JSI) ---
-keep class expo.modules.** { *; }
-keepclassmembers class expo.modules.** { *; }

# --- Expo Kotlin runtime (referenced by expo-sqlite and others) ---
-dontwarn expo.modules.kotlin.runtime.**
-dontwarn expo.modules.kotlin.**

# --- Keep all native-module providers registered in manifests ---
-keep class * extends com.facebook.react.ReactPackage { *; }
-keep class * extends expo.modules.core.interfaces.Package { *; }

# --- Reanimated ---
-keep class com.swmansion.reanimated.** { *; }

# --- Worklets ---
-keep class com.swmansion.worklets.** { *; }

# --- Safe-area ---
-keep class com.th3rdwave.safeareacontext.** { *; }

# --- Screens ---
-keep class com.swmansion.rnscreens.** { *; }

# --- Gesture Handler ---
-keep class com.swmansion.gesturehandler.** { *; }

# --- SQLite ---
-keep class expo.modules.sqlite.** { *; }

# --- Keep JS-callable native methods ---
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod *;
    @com.facebook.proguard.annotations.DoNotStrip *;
    @com.facebook.proguard.annotations.KeepGettersAndSetters *;
}
-dontwarn com.facebook.**

# --- Suppress R8 missing-class errors for optional/runtime references ---
-dontwarn kotlin.**
-dontwarn kotlinx.**
-dontwarn javax.annotation.**
-dontwarn sun.misc.Unsafe
`;

/**
 * Config plugin that:
 *  1. Enables R8 minification for release builds via Gradle properties.
 *  2. Writes keep-rules into proguard-rules.pro so the build does NOT
 *     strip classes that React Native / Expo need at runtime.
 *
 *  NOTE: shrinkResources is intentionally left OFF because it can remove
 *  dynamically-loaded assets (sounds, images loaded via require()).
 */
const withProguard = (config) => {
  // Step 1 – write proguard-rules.pro with our keep rules
  config = withDangerousMod(config, [
    "android",
    (cfg) => {
      const projectRoot = cfg.modRequest.projectRoot;
      const androidDir = path.join(projectRoot, "android", "app");
      if (!existsSync(androidDir)) {
        mkdirSync(androidDir, { recursive: true });
      }
      const rulesPath = path.join(androidDir, "proguard-rules.pro");
      writeFileSync(rulesPath, PROGUARD_RULES, "utf-8");
      return cfg;
    },
  ]);

  // Step 2 – enable minification via Gradle properties
  // (the Expo template's build.gradle reads these properties)
  config = withGradleProperties(config, (cfg) => {
    const props = cfg.modResults;

    // Enable R8 minification
    const minifyProp = props.find(
      (p) => p.type === "property" && p.key === "android.enableMinifyInReleaseBuilds"
    );
    if (minifyProp) {
      minifyProp.value = "true";
    } else {
      props.push({
        type: "property",
        key: "android.enableMinifyInReleaseBuilds",
        value: "true",
      });
    }

    // Ensure shrinkResources stays OFF
    const shrinkProp = props.find(
      (p) => p.type === "property" && p.key === "android.enableShrinkResourcesInReleaseBuilds"
    );
    if (shrinkProp) {
      shrinkProp.value = "false";
    } else {
      props.push({
        type: "property",
        key: "android.enableShrinkResourcesInReleaseBuilds",
        value: "false",
      });
    }

    return cfg;
  });

  return config;
};

module.exports = withProguard;
