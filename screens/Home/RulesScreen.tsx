import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card/Card';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import { t } from '../../utils/i18n';
import { useStore } from '../../store';

const RulesScreen = () => {
  const language = useStore((state) => state.language);

  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1" edges={['bottom']}>
        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 rounded-full bg-[#d8f9d9] items-center justify-center mb-6"
                  style={{
                    shadowColor: '#1b3420',
                    shadowOffset: { width: 8, height: 8 },
                    shadowOpacity: 0.1,
                    shadowRadius: 16,
                    elevation: 4
                  }}>
              <Ionicons name="book" size={48} color="#006b1b" />
            </View>
            
            <Text className="font-black text-4xl text-[#1b3420] text-center leading-tight uppercase tracking-tighter mb-3">
              {t('rules.title')}
            </Text>
            
            <Text className="text-base text-[#47624b] text-center max-w-sm">
              {t('rules.subtitle')}
            </Text>
          </View>

          {/* Game Overview */}
          <Card variant="primary" className="mb-6 rotate-1">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#006b1b]/10 items-center justify-center">
                <Ionicons name="information-circle" size={24} color="#006b1b" />
              </View>
              <Text className="font-bold text-2xl text-[#00480f] uppercase tracking-tight">
                {t('rules.overview')}
              </Text>
            </View>
            <Text className="text-base text-[#47624b] leading-relaxed">
              {t('rules.overviewText')}
            </Text>
          </Card>

          {/* Setup */}
          <Card variant="secondary" className="mb-6 -rotate-1">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#5b5300]/10 items-center justify-center">
                <Ionicons name="settings" size={24} color="#5b5300" />
              </View>
              <Text className="font-bold text-2xl text-[#5b5300] uppercase tracking-tight">
                {t('rules.setup')}
              </Text>
            </View>
            <View className="gap-3">
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#5b5300] text-lg">1.</Text>
                <Text className="flex-1 text-base text-[#5b5300]/80 leading-relaxed">
                  {t('rules.setup1')}
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#5b5300] text-lg">2.</Text>
                <Text className="flex-1 text-base text-[#5b5300]/80 leading-relaxed">
                  {t('rules.setup2')}
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#5b5300] text-lg">3.</Text>
                <Text className="flex-1 text-base text-[#5b5300]/80 leading-relaxed">
                  {t('rules.setup3')}
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#5b5300] text-lg">4.</Text>
                <Text className="flex-1 text-base text-[#5b5300]/80 leading-relaxed">
                  {t('rules.setup4')}
                </Text>
              </View>
            </View>
          </Card>

          {/* Roles */}
          <Card variant="container-high" className="mb-6 rotate-2">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#47624b]/10 items-center justify-center">
                <Ionicons name="people" size={24} color="#47624b" />
              </View>
              <Text className="font-bold text-2xl text-[#1b3420] uppercase tracking-tight">
                {t('rules.roles')}
              </Text>
            </View>
            
            {/* Civilian */}
            <View className="bg-[#d8f9d9] rounded-xl p-4 mb-3">
              <View className="flex-row items-center gap-2 mb-2">
                <Ionicons name="shield-checkmark" size={20} color="#006b1b" />
                <Text className="font-black text-lg text-[#006b1b] uppercase">{t('rules.civilianRole')}</Text>
              </View>
              <Text className="text-sm text-[#47624b] leading-relaxed">
                {t('rules.civilianDesc')}
              </Text>
            </View>

            {/* Spy */}
            <View className="bg-[#fff0e5] rounded-xl p-4 mb-3">
              <View className="flex-row items-center gap-2 mb-2">
                <Ionicons name="eye" size={20} color="#ff9800" />
                <Text className="font-black text-lg text-[#ff9800] uppercase">{t('rules.spyRole')}</Text>
              </View>
              <Text className="text-sm text-[#874e00] leading-relaxed">
                {t('rules.spyDesc')}
              </Text>
            </View>

            {/* Blank */}
            <View className="bg-[#f9e534]/20 rounded-xl p-4">
              <View className="flex-row items-center gap-2 mb-2">
                <Ionicons name="help-circle" size={20} color="#5b5300" />
                <Text className="font-black text-lg text-[#5b5300] uppercase">{t('rules.blankRole')}</Text>
              </View>
              <Text className="text-sm text-[#5b5300]/80 leading-relaxed">
                {t('rules.blankDesc')}
              </Text>
            </View>
          </Card>

          {/* Gameplay */}
          <Card variant="primary" className="mb-6 -rotate-1">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#006b1b]/10 items-center justify-center">
                <Ionicons name="game-controller" size={24} color="#006b1b" />
              </View>
              <Text className="font-bold text-2xl text-[#00480f] uppercase tracking-tight">
                {t('rules.gameplay')}
              </Text>
            </View>
            <View className="gap-3">
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#00480f] text-lg">1.</Text>
                <Text className="flex-1 text-base text-[#47624b] leading-relaxed">
                  <Text className="font-bold">{t('rules.gameplay1')}</Text> {t('rules.gameplay1Desc')}
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#00480f] text-lg">2.</Text>
                <Text className="flex-1 text-base text-[#47624b] leading-relaxed">
                  <Text className="font-bold">{t('rules.gameplay2')}</Text> {t('rules.gameplay2Desc')}
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#00480f] text-lg">3.</Text>
                <Text className="flex-1 text-base text-[#47624b] leading-relaxed">
                  <Text className="font-bold">{t('rules.gameplay3')}</Text> {t('rules.gameplay3Desc')}
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#00480f] text-lg">4.</Text>
                <Text className="flex-1 text-base text-[#47624b] leading-relaxed">
                  <Text className="font-bold">{t('rules.gameplay4')}</Text> {t('rules.gameplay4Desc')}
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#00480f] text-lg">5.</Text>
                <Text className="flex-1 text-base text-[#47624b] leading-relaxed">
                  <Text className="font-bold">{t('rules.gameplay5')}</Text> {t('rules.gameplay5Desc')}
                </Text>
              </View>
            </View>
          </Card>

          {/* Winning Conditions */}
          <Card variant="tertiary" className="mb-6 rotate-1">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#4a2800]/10 items-center justify-center">
                <Ionicons name="trophy" size={24} color="#4a2800" />
              </View>
              <Text className="font-bold text-2xl text-[#4a2800] uppercase tracking-tight">
                {t('rules.howToWin')}
              </Text>
            </View>
            
            <View className="gap-3">
              <View className="bg-white/50 rounded-lg p-3">
                <Text className="font-black text-sm text-[#4a2800] uppercase mb-1">
                  {t('rules.civiliansWin')}
                </Text>
                <Text className="text-sm text-[#4a2800]/80">
                  {t('rules.civiliansWinDesc')}
                </Text>
              </View>
              
              <View className="bg-white/50 rounded-lg p-3">
                <Text className="font-black text-sm text-[#4a2800] uppercase mb-1">
                  {t('rules.spiesWin')}
                </Text>
                <Text className="text-sm text-[#4a2800]/80">
                  {t('rules.spiesWinDesc')}
                </Text>
              </View>
              
              <View className="bg-white/50 rounded-lg p-3">
                <Text className="font-black text-sm text-[#4a2800] uppercase mb-1">
                  {t('rules.blankWins')}
                </Text>
                <Text className="text-sm text-[#4a2800]/80">
                  {t('rules.blankWinsDesc')}
                </Text>
              </View>
            </View>
          </Card>

          {/* Tips */}
          <Card variant="secondary" className="mb-32 -rotate-1">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#5b5300]/10 items-center justify-center">
                <Ionicons name="bulb" size={24} color="#5b5300" />
              </View>
              <Text className="font-bold text-2xl text-[#5b5300] uppercase tracking-tight">
                {t('rules.proTips')}
              </Text>
            </View>
            <View className="gap-3">
              <View className="flex-row items-start gap-3">
                <Text className="text-[#5b5300]">💡</Text>
                <Text className="flex-1 text-sm text-[#5b5300]/80 leading-relaxed">
                  {t('rules.tip1')}
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="text-[#5b5300]">💡</Text>
                <Text className="flex-1 text-sm text-[#5b5300]/80 leading-relaxed">
                  {t('rules.tip2')}
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="text-[#5b5300]">💡</Text>
                <Text className="flex-1 text-sm text-[#5b5300]/80 leading-relaxed">
                  {t('rules.tip3')}
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="text-[#5b5300]">💡</Text>
                <Text className="flex-1 text-sm text-[#5b5300]/80 leading-relaxed">
                  {t('rules.tip4')}
                </Text>
              </View>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
      
      {/* Bottom Navigation - Fixed at bottom */}
      <BottomNavigation />
    </View>
  );
};

export default RulesScreen;
