import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { initDatabase } from '@/db';
import Header from '@/components/Header/Header';
import { soundManager } from '@/utils/soundManager';
import { loadLanguage } from '@/utils/i18n';
import { useStore } from '@/store';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Initialize database, sounds, and i18n on app start
  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize database (must be first — creates tables)
        initDatabase();
      } catch (error) {
        console.error('❌ Failed to initialize database:', error);
      }

      try {
        // Load keywords and settings from DB (after tables exist)
        useStore.getState().loadKeywords();
        await useStore.getState().initializeSettings();
      } catch (error) {
        console.error('❌ Failed to load store data:', error);
      }

      try {
        // Load all game sounds
        await soundManager.loadAllSounds();
      } catch (error) {
        console.error('❌ Failed to load sounds:', error);
      }

      try {
        // Load saved language or device locale
        await loadLanguage();
      } catch (error) {
        console.error('❌ Failed to load language:', error);
      }
    };
    
    initialize();

    // Cleanup on unmount
    return () => {
      try {
        soundManager.unloadAll();
      } catch (error) {
        console.error('❌ Failed to unload sounds:', error);
      }
    };
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack 
        screenOptions={{ 
          headerShown: true,
          header: () => (
            <SafeAreaView edges={['top']} className="bg-[#e0fee1]">
              <Header />
            </SafeAreaView>
          ),
        }} 
      />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
