import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { useStore } from '../../store';
import { t } from '../../utils/i18n';

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

          {/* Game Story - THE LAST SIGNAL */}
          <View className="mt-4 mb-2">
            <View className="flex-row items-center gap-2 mb-3">
              <Ionicons name="radio" size={20} color="#006b1b" />
              <Text className="font-black text-xs text-[#006b1b] uppercase tracking-[4px]">{t('home.narrative')}</Text>
            </View>
            <View className="w-16 h-1 bg-[#006b1b] rounded-full mb-1" />
          </View>

          {/* The Blackout */}
          <Card variant="container-high" rotated className="mt-1">
            <View className="absolute top-4 right-4 opacity-10">
              <Ionicons name="flash-off" size={64} color="#1b3420" />
            </View>
            <View className="flex-col gap-3">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-[#1b3420]/10 items-center justify-center">
                  <Ionicons name="flash-off" size={20} color="#1b3420" />
                </View>
                <Text className="font-black text-lg text-[#1b3420] uppercase tracking-tight">{t('home.blackoutTitle')}</Text>
              </View>
              <Text className="text-sm text-[#47624b] leading-5">
                {t('home.blackoutDesc')}
              </Text>
            </View>
          </Card>

          {/* The Breach */}
          <Card variant="secondary" rotated={false} className="-rotate-1">
            <View className="absolute top-4 right-4 opacity-10">
              <Ionicons name="warning" size={64} color="#5b5300" />
            </View>
            <View className="flex-col gap-3">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-[#5b5300]/10 items-center justify-center">
                  <Ionicons name="warning" size={20} color="#5b5300" />
                </View>
                <Text className="font-black text-lg text-[#5b5300] uppercase tracking-tight">{t('home.breachTitle')}</Text>
              </View>
              <Text className="text-sm text-[#5b5300]/80 leading-5">
                {t('home.breachDesc')}
              </Text>
            </View>
          </Card>

          {/* The Ghost Listener */}
          <Card variant="tertiary" rotated className="">
            <View className="absolute top-4 right-4 opacity-10">
              <Ionicons name="ear" size={64} color="#4a2800" />
            </View>
            <View className="flex-col gap-3">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-[#4a2800]/10 items-center justify-center">
                  <Ionicons name="ear" size={20} color="#4a2800" />
                </View>
                <Text className="font-black text-lg text-[#4a2800] uppercase tracking-tight">{t('home.ghostListenerTitle')}</Text>
              </View>
              <Text className="text-sm text-[#4a2800]/80 leading-5">
                {t('home.ghostListenerDesc')}
              </Text>
            </View>
          </Card>

          {/* The Mechanics of Survival */}
          <View className="mt-4 mb-1">
            <View className="flex-row items-center gap-2 mb-3">
              <Ionicons name="cog" size={20} color="#006b1b" />
              <Text className="font-black text-xs text-[#006b1b] uppercase tracking-[4px]">{t('home.survivalMechanics')}</Text>
            </View>
            <View className="w-16 h-1 bg-[#006b1b] rounded-full mb-1" />
          </View>

          <Card variant="primary" rotated={false} className="-rotate-1">
            <View className="flex-col gap-4">
              {/* The Agents */}
              <View className="flex-row items-start gap-3">
                <View className="w-9 h-9 rounded-full bg-[#006b1b]/15 items-center justify-center mt-0.5">
                  <Ionicons name="shield-checkmark" size={18} color="#006b1b" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-sm text-[#006b1b] uppercase tracking-tight">{t('home.agentsTitle')}</Text>
                  <Text className="text-xs text-[#1b3420]/70 leading-4 mt-1">
                    {t('home.agentsDesc')}
                  </Text>
                </View>
              </View>

              <View className="h-px bg-[#006b1b]/15" />

              {/* The Spy */}
              <View className="flex-row items-start gap-3">
                <View className="w-9 h-9 rounded-full bg-[#006b1b]/15 items-center justify-center mt-0.5">
                  <Ionicons name="eye-off" size={18} color="#006b1b" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-sm text-[#006b1b] uppercase tracking-tight">{t('home.spyTitle')}</Text>
                  <Text className="text-xs text-[#1b3420]/70 leading-4 mt-1">
                    {t('home.spyDesc')}
                  </Text>
                </View>
              </View>

              <View className="h-px bg-[#006b1b]/15" />

              {/* The Interceptor */}
              <View className="flex-row items-start gap-3">
                <View className="w-9 h-9 rounded-full bg-[#006b1b]/15 items-center justify-center mt-0.5">
                  <Ionicons name="radio" size={18} color="#006b1b" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-sm text-[#006b1b] uppercase tracking-tight">{t('home.interceptorTitle')}</Text>
                  <Text className="text-xs text-[#1b3420]/70 leading-4 mt-1">
                    {t('home.interceptorDesc')}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>

      </SafeAreaView>
      
      {/* Bottom Navigation - Fixed at bottom */}
      <BottomNavigation />
    </View>
  );
};
export default HomeScreen;
