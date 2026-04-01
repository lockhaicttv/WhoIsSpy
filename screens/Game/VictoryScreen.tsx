import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { useStore } from '../../store';
import { t } from '../../utils/i18n';
import { soundManager } from '../../utils/soundManager';

const VictoryScreen = () => {
  const router = useRouter();
  const winner = useStore((state) => state.winner);
  const players = useStore((state) => state.players);
  const civWord = useStore((state) => state.civilianWord);
  const spyWord = useStore((state) => state.spyWord);
  const resetPlayers = useStore((state) => state.resetPlayers);
  const language = useStore((state) => state.language);

  const spies = players.filter(p => p.role === 'spy');
  const blanks = players.filter(p => p.role === 'blank');
  const isCivsWin = winner === 'civilians';
  const isBlankWin = winner === 'blank';
  const isSpyWin = winner === 'spies';

  // Play victory sound based on winner
  useEffect(() => {
    if (winner === 'civilians') {
      soundManager.playSound('civilian-win', 0.8);
    } else if (winner === 'spies') {
      soundManager.playSound('spy-win', 0.8);
    } else if (winner === 'blank') {
      soundManager.playSound('blank-caught', 0.8);
    }

    // Cleanup - stop all sounds when leaving screen
    return () => {
      soundManager.stopAllSounds();
    };
  }, [winner]);

  const handlePlayAgain = () => {
    resetPlayers(); 
    router.replace('/manage-groups');
  };

  const handleHome = () => {
    resetPlayers();
    router.replace('/');
  };

  return (
    <View className={`flex-1 ${isBlankWin ? 'bg-[#fff8e5]' : isCivsWin ? 'bg-[#e0fee1]' : 'bg-[#fff0e5]'}`}>
      <SafeAreaView className="flex-1 flex-col items-center" edges={['bottom']}>
      {/* Main Victory Content */}
      <ScrollView className="flex-1 w-full max-w-md px-6 py-8" showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', gap: 48 }}>
        {/* Victory Headline Section */}
        <View className="items-center gap-2">
          <Text className="text-xs font-black tracking-[0.2em] text-[#47624b] opacity-60 uppercase">
            {isBlankWin ? t('victory.brilliantDeduction') : t('victory.deductionComplete')}
          </Text>
          <Text className="text-5xl font-black tracking-tighter text-[#1b3420] leading-none text-center">
            {isBlankWin ? (
              <>{t('victory.blankPlayerWins').split('\n')[0]}{'\n'}<Text className="text-[#f9a825]">{t('victory.blankPlayerWins').split('\n')[1]}</Text></>
            ) : (
              <>{t('victory.theSpyWas')}{'\n'}
                <Text className={isCivsWin ? 'text-[#ff9800]' : 'text-[#006b1b]'}>
                  {isCivsWin ? t('victory.caught') : t('victory.victorious')}
                </Text>
              </>
            )}
          </Text>
        </View>

        {/* The "Sticky Note" Hero Card */}
        <View className="relative w-full max-w-sm -rotate-1">
          <Card 
            variant="secondary"
            className="p-8 items-center gap-8"
          >
            {/* Hero Illustration Container */}
            <View className="w-full aspect-square rounded-xl bg-white/40 p-4 relative overflow-hidden">
              <ImageBackground
                source={isBlankWin
                  ? require('../../assets/images/victory-blank-hero.jpg')
                  : isCivsWin 
                    ? require('../../assets/images/victory-civilians-hero.jpg')
                    : require('../../assets/images/victory-spies-hero.jpg')
                }
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              >
                {/* Decorative Element */}
                <View className={`absolute top-2 right-2 px-4 py-1 rounded-full -rotate-6 ${
                  isBlankWin ? 'bg-[#f9a825]' : 'bg-[#006b1b]'
                }`}
                      style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 4
                      }}>
                  <Text className="text-[#d1ffc8] font-bold text-sm">
                    {isBlankWin ? 'GENIUS!' : isCivsWin ? t('victory.missionSuccess') : t('victory.missionFailed')}
                  </Text>
                </View>
              </ImageBackground>
            </View>

            {/* Card Content */}
            <View className="items-center gap-2 mt-2">
              <Text className="text-4xl font-black text-[#5b5300] leading-none uppercase tracking-tight text-center">
                {isBlankWin ? t('victory.interceptorWins') : isCivsWin ? t('victory.agentsWin') : t('victory.infiltratorsWin')}
              </Text>
              <Text className="text-[#5b5300]/70 font-medium italic text-center">
                {isBlankWin
                  ? t('victory.interceptorWinQuote')
                  : isCivsWin 
                    ? t('victory.agentsWinQuote')
                    : t('victory.infiltratorsWinQuote')}
              </Text>
            </View>
          </Card>

          {/* Floating Decorative Elements */}
          <View className="absolute -top-4 -left-2 -rotate-12">
            <Ionicons 
              name={isBlankWin ? "bulb" : isCivsWin ? "star" : "skull"} 
              size={48} 
              color={isBlankWin ? "#f9a825" : isCivsWin ? "#ff9800" : "#b02500"} 
            />
          </View>
          <View className="absolute -bottom-4 -right-2 rotate-12">
            <Ionicons 
              name={isBlankWin ? "trophy" : isCivsWin ? "checkmark-circle" : "close-circle"} 
              size={48} 
              color={isBlankWin ? "#f9a825" : "#006b1b"} 
            />
          </View>
        </View>

        {/* Player Stats Bento Grid */}
        <View className="w-full flex-row gap-4">
          {isBlankWin ? (
            // Show blank winner
            <View className="flex-1 bg-[#f9e534] p-5 rounded-lg items-start gap-2"
                  style={{
                    shadowColor: '#1b3420',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2
                  }}>
              <Ionicons name="bulb" size={24} color="#5b5300" />
              <View>
                <Text className="text-[10px] font-black uppercase text-[#5b5300] opacity-60">{t('victory.theGenius')}</Text>
                <Text className="font-bold text-[#1b3420]">{blanks[0]?.name || 'Unknown'}</Text>
              </View>
            </View>
          ) : (
            // Show spy
            <View className="flex-1 bg-[#d8f9d9] p-5 rounded-lg items-start gap-2"
                  style={{
                    shadowColor: '#1b3420',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2
                  }}>
              <Ionicons name="search" size={24} color="#006b1b" />
              <View>
                <Text className="text-[10px] font-black uppercase text-[#47624b] opacity-60">{t('victory.theSpy')}</Text>
                <Text className="font-bold text-[#1b3420]">{spies[0]?.name || 'Unknown'}</Text>
              </View>
            </View>
          )}
          <View className="flex-1 bg-[#d8f9d9] p-5 rounded-lg items-start gap-2"
                style={{
                  shadowColor: '#1b3420',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 2
                }}>
            <Ionicons name="time" size={24} color="#ff9800" />
            <View>
              <Text className="text-[10px] font-black uppercase text-[#47624b] opacity-60">{t('victory.gameTime')}</Text>
              <Text className="font-bold text-[#1b3420]">--:--</Text>
            </View>
          </View>
        </View>

        {/* Keywords Reveal */}
        <View className="w-full gap-4">
          <Text className="text-center font-black uppercase tracking-widest text-[12px] text-[#1b3420]">
            {t('victory.theIntel')}
          </Text>
          <View className="flex-row gap-4">
            <View className="flex-1 items-center bg-white py-4 rounded-xl border-2 border-[#c6ecc8]"
                  style={{
                    shadowColor: '#1b3420',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2
                  }}>
              <Text className="text-[10px] font-black tracking-widest text-[#47624b] mb-1 uppercase">{t('victory.civilianWord')}</Text>
              <Text className="text-2xl font-black text-[#006b1b] uppercase">{civWord}</Text>
            </View>
            <View className="flex-1 items-center bg-white py-4 rounded-xl border-2 border-[#ff9800]/30"
                  style={{
                    shadowColor: '#1b3420',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2
                  }}>
              <Text className="text-[10px] font-black tracking-widest text-[#874e00] mb-1 uppercase">{t('victory.spyWord')}</Text>
              <Text className="text-2xl font-black text-[#ff9800] uppercase">{spyWord}</Text>
            </View>
          </View>
        </View>

        {/* Action Button Section */}
        <View className="w-full pt-4 pb-20 gap-4">
          <Button 
            label={t('victory.playAgain')}
            variant="primary"
            onPress={handlePlayAgain}
            icon="refresh"
          />
          <TouchableOpacity onPress={handleHome}>
            <Text className="text-[#47624b] font-bold text-sm uppercase tracking-widest text-center">
              {t('victory.backToLobby')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </SafeAreaView>

      {/* Bottom Navigation Shell - Fixed at bottom */}
      <View className="w-full flex-row justify-around items-center px-4 pb-6 pt-3 bg-[#e0fee1] rounded-t-[32px]"
            style={{
              shadowColor: '#1b3420',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 8
            }}>
        <TouchableOpacity className="flex-col items-center justify-center opacity-70">
          <Ionicons name="game-controller" size={24} color="#1b3420" />
          <Text className="text-[10px] font-medium tracking-wide uppercase text-[#1b3420]">Game</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-col items-center justify-center bg-[#006b1b] rounded-full px-6 py-2"
                          style={{ borderBottomWidth: 4, borderBottomColor: '#005d16' }}>
          <Ionicons name="people" size={24} color="#e0fee1" />
          <Text className="text-[10px] font-medium tracking-wide uppercase text-[#e0fee1]">Players</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-col items-center justify-center opacity-70">
          <Ionicons name="document-text" size={24} color="#1b3420" />
          <Text className="text-[10px] font-medium tracking-wide uppercase text-[#1b3420]">Rules</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default VictoryScreen;
