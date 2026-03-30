import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store';
import { t } from '../../utils/i18n';
import Card from '../../components/Card/Card';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

const ProfileScreen = () => {
  const language = useStore((state) => state.language);
  const soundEnabled = useStore((state) => state.soundEnabled);
  const toggleSound = useStore((state) => state.toggleSound);

  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1" edges={['bottom']}>
        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 rounded-full bg-[#006b1b] items-center justify-center mb-4"
                  style={{
                    shadowColor: '#1b3420',
                    shadowOffset: { width: 8, height: 8 },
                    shadowOpacity: 0.15,
                    shadowRadius: 16,
                    elevation: 6
                  }}>
              <Ionicons name="person" size={48} color="#d1ffc8" />
            </View>
            
            <Text className="font-black text-4xl text-[#1b3420] text-center leading-tight uppercase tracking-tighter mb-2">
              {t('profile.title')}
            </Text>
            
            <Text className="text-base text-[#47624b] text-center max-w-sm">
              {t('profile.subtitle')}
            </Text>
          </View>

          {/* User Info Section */}
          <Card variant="primary" className="mb-6 rotate-1">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#006b1b]/10 items-center justify-center">
                <Ionicons name="person-circle" size={24} color="#006b1b" />
              </View>
              <Text className="font-bold text-2xl text-[#00480f] uppercase tracking-tight">
                {t('profile.userInfo')}
              </Text>
            </View>
            
            <View className="gap-3">
              <View className="flex-row items-center justify-between p-3 bg-white/50 rounded-lg">
                <View className="flex-row items-center gap-3">
                  <Ionicons name="game-controller" size={20} color="#006b1b" />
                  <Text className="text-sm font-bold text-[#47624b] uppercase">
                    {t('profile.gamesPlayed')}
                  </Text>
                </View>
                <Text className="text-xl font-black text-[#006b1b]">0</Text>
              </View>
              
              <View className="flex-row items-center justify-between p-3 bg-white/50 rounded-lg">
                <View className="flex-row items-center gap-3">
                  <Ionicons name="trophy" size={20} color="#006b1b" />
                  <Text className="text-sm font-bold text-[#47624b] uppercase">
                    {t('profile.wins')}
                  </Text>
                </View>
                <Text className="text-xl font-black text-[#006b1b]">0</Text>
              </View>
            </View>
          </Card>

          {/* Settings Section */}
          <Card variant="secondary" className="mb-6 -rotate-1">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#5b5300]/10 items-center justify-center">
                <Ionicons name="settings" size={24} color="#5b5300" />
              </View>
              <Text className="font-bold text-2xl text-[#5b5300] uppercase tracking-tight">
                {t('settings.title')}
              </Text>
            </View>
            
            <View className="gap-4">
              {/* Language Setting */}
              <View>
                <Text className="text-xs font-bold text-[#5b5300] uppercase tracking-wider mb-2">
                  {t('settings.language')}
                </Text>
                <LanguageSelector />
              </View>

              {/* Sound Setting */}
              <View>
                <Text className="text-xs font-bold text-[#5b5300] uppercase tracking-wider mb-2">
                  {t('settings.sound')}
                </Text>
                <View className="flex-row items-center justify-between bg-[#fff8e5] p-4 rounded-xl"
                      style={{
                        shadowColor: '#1b3420',
                        shadowOffset: { width: 4, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 3,
                      }}>
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 rounded-full bg-[#5b5300]/10 items-center justify-center">
                      <Ionicons 
                        name={soundEnabled ? "volume-high" : "volume-mute"} 
                        size={20} 
                        color="#5b5300" 
                      />
                    </View>
                    <View>
                      <Text className="text-sm font-bold text-[#5b5300] uppercase">
                        {t('settings.soundEffects')}
                      </Text>
                      <Text className="text-xs text-[#5b5300]/70">
                        {soundEnabled ? t('settings.soundOn') : t('settings.soundOff')}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={soundEnabled}
                    onValueChange={toggleSound}
                    trackColor={{ false: '#c6c6c6', true: '#91f78e' }}
                    thumbColor={soundEnabled ? '#006b1b' : '#f4f3f4'}
                    ios_backgroundColor="#c6c6c6"
                  />
                </View>
              </View>
            </View>
          </Card>

          {/* About Section */}
          <Card variant="container-high" className="mb-32 rotate-1">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#47624b]/10 items-center justify-center">
                <Ionicons name="information-circle" size={24} color="#47624b" />
              </View>
              <Text className="font-bold text-2xl text-[#1b3420] uppercase tracking-tight">
                {t('profile.about')}
              </Text>
            </View>
            
            <View className="gap-3">
              <View className="flex-row items-center justify-between p-3 bg-white/50 rounded-lg">
                <Text className="text-sm font-bold text-[#47624b] uppercase">
                  {t('profile.version')}
                </Text>
                <Text className="text-sm font-black text-[#1b3420]">1.0.0</Text>
              </View>
              
              <TouchableOpacity className="flex-row items-center justify-between p-3 bg-white/50 rounded-lg">
                <Text className="text-sm font-bold text-[#47624b] uppercase">
                  {t('profile.rateApp')}
                </Text>
                <Ionicons name="star" size={20} color="#ff9800" />
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-row items-center justify-between p-3 bg-white/50 rounded-lg">
                <Text className="text-sm font-bold text-[#47624b] uppercase">
                  {t('profile.shareApp')}
                </Text>
                <Ionicons name="share-social" size={20} color="#006b1b" />
              </TouchableOpacity>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
};

export default ProfileScreen;
