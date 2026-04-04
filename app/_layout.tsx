import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

import Header from "@/components/Header/Header";
import { initDatabase } from "@/db";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useStore } from "@/store";
import { soundManager } from "@/utils/soundManager";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  // Initialize database, sounds, and i18n on app start
  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize database (must be first — creates tables)
        initDatabase();
      } catch (error) {
        console.error("❌ Failed to initialize database:", error);
      }

      try {
        // Load keywords and settings from DB — this also loads the saved language
        useStore.getState().loadKeywords();
        await useStore.getState().initializeSettings();
      } catch (error) {
        console.error("❌ Failed to load store data:", error);
      }

      try {
        // Load all game sounds
        await soundManager.loadAllSounds();
      } catch (error) {
        console.error("❌ Failed to load sounds:", error);
      }

      // Language is now loaded; allow the UI to render
      setIsReady(true);
    };

    initialize();

    // Cleanup on unmount
    return () => {
      try {
        soundManager.unloadAll();
      } catch (error) {
        console.error("❌ Failed to unload sounds:", error);
      }
    };
  }, []);

  // Hold off rendering until the saved language is loaded so the home screen
  // never flashes in the wrong language on first open.
  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => (
            <SafeAreaView edges={["top"]} className="bg-[#e0fee1]">
              <Header />
            </SafeAreaView>
          ),
        }}
      />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
