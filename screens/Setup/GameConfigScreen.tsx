import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { useStore } from '../../store';
import { t } from '../../utils/i18n';

const GameConfigScreen = () => {
  const router = useRouter();
  const players = useStore((state) => state.players);
  const setPhase = useStore((state) => state.setPhase);
  const setDiscussionTime = useStore((state) => state.setDiscussionTime);
  const language = useStore((state) => state.language);

  const [numSpies, setNumSpies] = useState(1);
  const [numBlanks, setNumBlanks] = useState(0);
  const [discussionMinutes, setDiscussionMinutes] = useState<number | null>(null); // null = infinity

  // Calculate civilians (remaining players after spies and blanks)
  const numCivilians = players.length - numSpies - numBlanks;
  
  // Validation: Spies must be less than civilians
  const isValidConfiguration = numSpies > 0 && numSpies < numCivilians && numBlanks >= 0;
  const canContinue = players.length >= 3 && isValidConfiguration;

  const handleContinue = () => {
    if (canContinue) {
      setPhase('setup');
      // Convert minutes to seconds (null stays null for infinity)
      setDiscussionTime(discussionMinutes ? discussionMinutes * 60 : null);
      router.push({
        pathname: '/import-keywords',
        params: { numSpies: numSpies.toString(), numBlanks: numBlanks.toString() }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#e0fee1]" edges={['bottom']}>
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        
        {/* Game Configuration Card */}
        <Card variant="primary" className="mb-8">
          <View className="flex-row items-center gap-3 mb-6">
            <Ionicons name="settings" size={24} color="#005d16" />
            <Text className="text-2xl font-black text-[#00480f] tracking-tight uppercase">{t('gameConfig.title')}</Text>
          </View>

          <View className="bg-[#c7f0cd]/40 rounded-xl p-4 mb-6">
            <Text className="text-sm font-bold text-[#47624b] text-center">
              {t('gameConfig.totalPlayers')} <Text className="text-[#006b1b] text-xl font-black">{players.length}</Text>
            </Text>
          </View>

          {/* Spies Configuration */}
          <View className="mb-6">
            <Text className="font-bold text-[12px] tracking-widest text-[#00691a] uppercase mb-3">{t('gameConfig.numSpies')}</Text>
            <View className="flex-row items-center gap-4">
              <TouchableOpacity 
                onPress={() => setNumSpies(Math.max(1, numSpies - 1))}
                className="w-12 h-12 rounded-full bg-[#006b1b] items-center justify-center"
                style={{ 
                  borderBottomWidth: 4, 
                  borderBottomColor: '#005d16',
                  opacity: numSpies <= 1 ? 0.5 : 1
                }}
                disabled={numSpies <= 1}
              >
                <Ionicons name="remove" size={24} color="#d1ffc8" />
              </TouchableOpacity>

              <View className="flex-1 bg-white rounded-2xl px-6 py-4 items-center border-2 border-[#91f78e]">
                <Text className="text-4xl font-black text-[#006b1b]">{numSpies}</Text>
                <Text className="text-xs font-bold text-[#47624b] uppercase tracking-wider mt-1">
                  {numSpies === 1 ? t('gameConfig.spy') : t('gameConfig.spies')}
                </Text>
              </View>

              <TouchableOpacity 
                onPress={() => setNumSpies(Math.min(Math.floor(players.length / 2), numSpies + 1))}
                className="w-12 h-12 rounded-full bg-[#006b1b] items-center justify-center"
                style={{ 
                  borderBottomWidth: 4, 
                  borderBottomColor: '#005d16',
                  opacity: numSpies >= Math.floor(players.length / 2) ? 0.5 : 1
                }}
                disabled={numSpies >= Math.floor(players.length / 2)}
              >
                <Ionicons name="add" size={24} color="#d1ffc8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Blank Cards Configuration */}
          <View className="mb-6">
            <Text className="font-bold text-[12px] tracking-widest text-[#00691a] uppercase mb-3">{t('gameConfig.numBlanks')}</Text>
            <View className="flex-row items-center gap-4">
              <TouchableOpacity 
                onPress={() => setNumBlanks(Math.max(0, numBlanks - 1))}
                className="w-12 h-12 rounded-full bg-[#006b1b] items-center justify-center"
                style={{ 
                  borderBottomWidth: 4, 
                  borderBottomColor: '#005d16',
                  opacity: numBlanks <= 0 ? 0.5 : 1
                }}
                disabled={numBlanks <= 0}
              >
                <Ionicons name="remove" size={24} color="#d1ffc8" />
              </TouchableOpacity>

              <View className="flex-1 bg-white rounded-2xl px-6 py-4 items-center border-2 border-[#91f78e]">
                <Text className="text-4xl font-black text-[#006b1b]">{numBlanks}</Text>
                <Text className="text-xs font-bold text-[#47624b] uppercase tracking-wider mt-1">{t('gameConfig.blanks')}</Text>
              </View>

              <TouchableOpacity 
                onPress={() => setNumBlanks(Math.min(players.length - numSpies - 1, numBlanks + 1))}
                className="w-12 h-12 rounded-full bg-[#006b1b] items-center justify-center"
                style={{ 
                  borderBottomWidth: 4, 
                  borderBottomColor: '#005d16',
                  opacity: numBlanks >= players.length - numSpies - 1 ? 0.5 : 1
                }}
                disabled={numBlanks >= players.length - numSpies - 1}
              >
                <Ionicons name="add" size={24} color="#d1ffc8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Discussion Time Configuration */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="font-bold text-[12px] tracking-widest text-[#00691a] uppercase">{t('gameConfig.discussionTime')}</Text>
              <TouchableOpacity 
                onPress={() => setDiscussionMinutes(null)}
                className={`px-3 py-1 rounded-full ${discussionMinutes === null ? 'bg-[#006b1b]' : 'bg-[#c6ecc8]'}`}
              >
                <Text className={`text-[10px] font-bold uppercase ${discussionMinutes === null ? 'text-[#d1ffc8]' : 'text-[#47624b]'}`}>
                  {t('gameConfig.infinity')}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center gap-4">
              <TouchableOpacity 
                onPress={() => setDiscussionMinutes(Math.max(1, (discussionMinutes || 1) - 1))}
                className="w-12 h-12 rounded-full bg-[#006b1b] items-center justify-center"
                style={{ 
                  borderBottomWidth: 4, 
                  borderBottomColor: '#005d16',
                  opacity: discussionMinutes === null || discussionMinutes <= 1 ? 0.5 : 1
                }}
                disabled={discussionMinutes === null || discussionMinutes <= 1}
              >
                <Ionicons name="remove" size={24} color="#d1ffc8" />
              </TouchableOpacity>

              <View className="flex-1 bg-white rounded-2xl px-6 py-4 items-center border-2 border-[#91f78e]">
                <Text className="text-4xl font-black text-[#006b1b]">
                  {discussionMinutes === null ? '∞' : discussionMinutes}
                </Text>
                <Text className="text-xs font-bold text-[#47624b] uppercase tracking-wider mt-1">
                  {discussionMinutes === null ? t('gameConfig.noLimit') : discussionMinutes === 1 ? t('gameConfig.minute') : t('gameConfig.minutes')}
                </Text>
              </View>

              <TouchableOpacity 
                onPress={() => setDiscussionMinutes((discussionMinutes || 0) + 1)}
                className="w-12 h-12 rounded-full bg-[#006b1b] items-center justify-center"
                style={{ 
                  borderBottomWidth: 4, 
                  borderBottomColor: '#005d16',
                  opacity: discussionMinutes !== null && discussionMinutes >= 10 ? 0.5 : 1
                }}
                disabled={discussionMinutes !== null && discussionMinutes >= 10}
              >
                <Ionicons name="add" size={24} color="#d1ffc8" />
              </TouchableOpacity>
            </View>
            <Text className="text-xs text-[#47624b] text-center mt-2">
              {discussionMinutes === null 
                ? t('gameConfig.discussionTimeDesc')
                : `${t('gameConfig.discussionTimeLimitDesc').replace('{{minutes}}', String(discussionMinutes)).replace('{{unit}}', discussionMinutes === 1 ? t('gameConfig.minute') : t('gameConfig.minutes'))}`
              }
            </Text>
          </View>

          {/* Role Summary */}
          <View className="bg-[#d8f9d9] rounded-xl p-4">
            <Text className="font-bold text-[10px] tracking-widest text-[#47624b] uppercase mb-3">{t('gameConfig.roleDistribution')}</Text>
            <View className="flex-row justify-between items-center">
              <View className="flex-col items-center">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="shield-checkmark" size={20} color="#006b1b" />
                  <Text className="text-2xl font-black text-[#006b1b]">{numCivilians}</Text>
                </View>
                <Text className="text-[10px] font-bold text-[#47624b] uppercase mt-1">{t('gameConfig.civilians')}</Text>
              </View>
              
              <View className="w-px h-12 bg-[#47624b]/20" />
              
              <View className="flex-col items-center">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="eye" size={20} color="#ff9800" />
                  <Text className="text-2xl font-black text-[#ff9800]">{numSpies}</Text>
                </View>
                <Text className="text-[10px] font-bold text-[#47624b] uppercase mt-1">
                  {numSpies === 1 ? t('gameConfig.spy') : t('gameConfig.spies')}
                </Text>
              </View>

              {numBlanks > 0 && (
                <>
                  <View className="w-px h-12 bg-[#47624b]/20" />
                  <View className="flex-col items-center">
                    <View className="flex-row items-center gap-2">
                      <Ionicons name="help-circle" size={20} color="#627d65" />
                      <Text className="text-2xl font-black text-[#627d65]">{numBlanks}</Text>
                    </View>
                    <Text className="text-[10px] font-bold text-[#47624b] uppercase mt-1">{t('gameConfig.blanks')}</Text>
                  </View>
                </>
              )}
            </View>

            {/* Validation Message */}
            {!isValidConfiguration && players.length >= 3 && (
              <View className="mt-4 bg-[#f95630]/10 rounded-lg p-3 flex-row items-start gap-2">
                <Ionicons name="warning" size={16} color="#b02500" />
                <Text className="flex-1 text-xs font-bold text-[#b02500]">
                  {t('gameConfig.spyValidation')}
                </Text>
              </View>
            )}
          </View>
        </Card>

        <View className="mb-32">
          <Button 
            label={t('gameConfig.startGame')}
            variant="tertiary"
            onPress={handleContinue} 
            disabled={!canContinue}
            className={!canContinue ? 'opacity-50' : ''}
          />
          {players.length < 3 && (
            <Text className="text-center text-[#b02500] font-bold text-sm mt-4 uppercase tracking-wide">
              {t('gameConfig.needMinPlayers')}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameConfigScreen;
