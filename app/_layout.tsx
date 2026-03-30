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

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Initialize database, sounds, and i18n on app start
  useEffect(() => {
    const initialize = async () => {
      // Initialize database
      initDatabase();
      
      // Load all game sounds
      soundManager.loadAllSounds();
      
      // Load saved language or device locale
      await loadLanguage();
    };
    
    initialize();

    // Cleanup on unmount
    return () => {
      soundManager.unloadAll();
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
