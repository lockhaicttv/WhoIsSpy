import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { useStore } from '../../store';
import { t } from '../../utils/i18n';

const RoleRevealScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const language = useStore((state) => state.language);
  
  const player = useStore((state) => state.players.find(p => p.id === id));
  const markRoleSeen = useStore((state) => state.markRoleSeen);
  const civWord = useStore((state) => state.civilianWord);
  const spyWord = useStore((state) => state.spyWord);

  const [revealed, setRevealed] = useState(true); // Changed to true - show immediately

  if (!player) return null;

  const handleUnderstand = () => {
    markRoleSeen(player.id);
    router.back();
  };

  const getRoleWord = () => {
    if (player.role === 'civilian') return civWord;
    if (player.role === 'spy') return spyWord;
    return '...'; // Blank
  };

  const isSpy = player.role === 'spy';

  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1 flex-col" edges={['bottom']}>
      {/* Main Content */}
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 48, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Decorative Background Blurs */}
        <View className="absolute top-1/4 -left-12 w-48 h-48 bg-[#d8f9d9] rounded-full opacity-50" style={{ filter: 'blur(48px)' }} />
        <View className="absolute bottom-1/4 -right-12 w-64 h-64 bg-[#91f78e] rounded-full opacity-20" style={{ filter: 'blur(48px)' }} />

        <View className="w-full max-w-md mx-auto flex-col items-center">
          {/* Badge */}
          <View className="mb-8 text-center">
            <View className="bg-[#c6ecc8] px-4 py-1.5 rounded-full">
              <Text className="font-bold text-xs tracking-widest text-[#47624b] uppercase">
                {t('roleReveal.yourKeyword')}
              </Text>
            </View>
          </View>

          {/* The Sticky Note */}
          <Card 
            variant="secondary" 
            className="w-full aspect-square p-8 items-center justify-center -rotate-1"
          >
            <View className="mb-6">
              <Ionicons name="key" size={64} color="#5b5300" style={{ opacity: 0.2 }} />
            </View>
            <Text className="font-bold text-[#5b5300]/60 tracking-tighter text-lg mb-2 uppercase leading-snug">
              {t('roleReveal.yourKeyword')}
            </Text>
            <Text className="text-5xl font-black text-[#006b1b] text-center mb-8 tracking-tighter uppercase leading-snug">
              {getRoleWord()}
            </Text>
            <View className="w-16 h-1 bg-[#5b5300]/10 rounded-full mb-6" />
            <Text className="text-[#5b5300] font-medium text-sm max-w-[240px] leading-relaxed text-center">
              {t('roleReveal.rememberKeyword')}
            </Text>
          </Card>

          {/* Hint Cards */}
          <View className="mt-8 w-full flex-row gap-4 mb-8">
            <View className="flex-1 bg-[#d8f9d9] p-4 rounded-lg flex-col gap-2">
              <Ionicons name="bulb" size={20} color="#006b1b" />
              <Text className="text-[10px] font-bold text-[#47624b] uppercase">{t('roleReveal.strategy')}</Text>
              <Text className="text-xs font-semibold text-[#1b3420]">
                {t('roleReveal.strategyDesc')}
              </Text>
            </View>
            <View className="flex-1 bg-[#d8f9d9] p-4 rounded-lg flex-col gap-2">
              <Ionicons name="warning" size={20} color="#ff9800" />
              <Text className="text-[10px] font-bold text-[#47624b] uppercase">{t('roleReveal.caution')}</Text>
              <Text className="text-xs font-semibold text-[#1b3420]">
                {t('roleReveal.cautionDesc')}
              </Text>
            </View>
          </View>

          {/* Action Button */}
          <View className="w-full flex-col items-center gap-4 mb-8">
            <Button 
              label={t('common.ready')}
              variant="primary" 
              onPress={handleUnderstand}
              icon="arrow-forward"
            />
            <Text className="text-[10px] text-[#47624b]/60 uppercase tracking-widest text-center">
              {t('roleReveal.closePrivatelyDesc')}
            </Text>
          </View>
        </View>
      </ScrollView>

      </SafeAreaView>
    </View>
  );
};
export default RoleRevealScreen;
