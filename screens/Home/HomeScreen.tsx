import React from 'react';
import { View, ScrollView, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { Text } from 'react-native';
import { t } from '../../utils/i18n';
import { useStore } from '../../store';

const HomeScreen = () => {
  const router = useRouter();
  // Subscribe to language changes to trigger re-render
  const language = useStore((state) => state.language);

  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1" edges={['bottom']}>
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Hero Image Section */}
        <View className="w-full mb-12 -rotate-1">
          <View className="absolute inset-0 bg-[#c6ecc8] rounded-xl rotate-2 translate-x-2 translate-y-2 opacity-50" style={{ width: '100%', height: '100%' }} />
          <View className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-white" 
                style={{ 
                  shadowColor: '#1b3420',
                  shadowOffset: { width: 12, height: 12 },
                  shadowOpacity: 0.08,
                  shadowRadius: 24,
                  elevation: 8
                }}>
            <ImageBackground
              source={require('../../assets/images/hero-detective-scene.jpg')}
              className="w-full h-full"
              resizeMode="cover"
            >
              <LinearGradient
                colors={['transparent', 'rgba(27, 52, 32, 0.4)']}
                className="absolute inset-0"
              />
              <View className="absolute bottom-4 left-4 flex-row items-center gap-2 bg-[#f9e534] px-4 py-2 rounded-full -rotate-2"
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 6
                    }}>
                <Ionicons name="alert-circle" size={16} color="#5b5300" />
                <Text className="font-bold text-[10px] tracking-widest text-[#5b5300] uppercase">{t('home.topSecretIntel')}</Text>
              </View>
            </ImageBackground>
          </View>
        </View>

        {/* Headline Area */}
        <View className="items-center mb-12 relative">
          <View className="absolute -top-8 -left-8 -rotate-[15deg] opacity-20">
            <Ionicons name="finger-print" size={80} color="#1b3420" />
          </View>
          <Text className="font-black text-5xl text-[#1b3420] text-center leading-tight uppercase tracking-tighter">
            {t('home.title')} <Text className="text-[#006b1b] italic">{t('home.titleSpy')}</Text>
          </Text>
          <Text className="text-lg text-[#47624b] mt-4 text-center max-w-sm">
            {t('home.subtitle')}
          </Text>
        </View>

        {/* Action Grid */}
        <View className="w-full gap-6 pb-32">
          <Button 
            label={t('home.startMission')}
            onPress={() => router.push('/manage-groups')}
            icon="play"
          />

          <Card variant="secondary" rotated className="mt-2">
            <View className="absolute top-4 right-6 opacity-10">
              <Ionicons name="people" size={64} color="#5b5300" />
            </View>
            <View className="flex-col gap-4">
              <View className="w-12 h-12 rounded-full bg-[#5b5300]/10 items-center justify-center">
                <Ionicons name="people" size={24} color="#5b5300" />
              </View>
              <View>
                <Text className="font-bold text-xl text-[#5b5300] uppercase tracking-tight">
                  {t('home.playWithFriends')}
                </Text>
                <Text className="text-sm text-[#5b5300]/70 mt-1">
                  {t('home.playWithFriendsDesc')}
                </Text>
              </View>
            </View>
          </Card>

          <Card variant="container-high" rotated={false} className="-rotate-1">
            <View className="absolute top-4 right-6 opacity-10">
              <Ionicons name="book" size={64} color="#1b3420" />
            </View>
            <View className="flex-col gap-4">
              <View className="w-12 h-12 rounded-full bg-[#47624b]/10 items-center justify-center">
                <Ionicons name="help-circle" size={24} color="#47624b" />
              </View>
              <View>
                <Text className="font-bold text-xl text-[#1b3420] uppercase tracking-tight">
                  {t('home.rulesHowToPlay')}
                </Text>
                <Text className="text-sm text-[#47624b] mt-1">
                  {t('home.rulesHowToPlayDesc')}
                </Text>
              </View>
            </View>
          </Card>

          {/* Language Selector */}
          <View className="mt-4">
            <LanguageSelector />
          </View>
        </View>
      </ScrollView>

      </SafeAreaView>
      
      {/* Bottom Navigation - Fixed at bottom */}
      <BottomNavigation />
    </View>
  );
};
export default HomeScreen;
