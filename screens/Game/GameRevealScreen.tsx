import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { useStore } from '../../store';
import { getAvatarBgColor, getAvatarColor, getAvatarIcon } from '../../utils/avatarUtils';
import { t } from '../../utils/i18n';

const GameRevealScreen = () => {
  const router = useRouter();
  const players = useStore((state) => state.players);
  const civWord = useStore((state) => state.civilianWord);
  const spyWord = useStore((state) => state.spyWord);
  const resetPlayers = useStore((state) => state.resetPlayers);
  const language = useStore((state) => state.language);

  const handlePlayAgain = () => {
    resetPlayers();
    router.replace('/manage-groups');
  };

  const handleHome = () => {
    resetPlayers();
    router.replace('/');
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'spy': return t('gameReveal.infiltrator');
      case 'blank': return t('gameReveal.interceptor');
      default: return t('gameReveal.agent');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'spy': return '#ff9800';
      case 'blank': return '#f9a825';
      default: return '#006b1b';
    }
  };

  const getRoleIcon = (role: string): keyof typeof Ionicons.glyphMap => {
    switch (role) {
      case 'spy': return 'eye';
      case 'blank': return 'help-circle';
      default: return 'shield-checkmark';
    }
  };

  const getKeyword = (role: string) => {
    switch (role) {
      case 'spy': return spyWord;
      case 'blank': return '—';
      default: return civWord;
    }
  };

  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1" edges={['bottom']}>
        <ScrollView 
          className="flex-1 px-6 pt-8" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Header Section */}
          <View className="items-center mb-8">
            <View className="bg-[#ff9800]/20 px-4 py-1.5 rounded-full mb-3">
              <Text className="font-bold text-xs tracking-widest text-[#874e00] uppercase">
                {t('gameReveal.subtitle')}
              </Text>
            </View>
            <Text className="text-3xl font-black text-[#1b3420] tracking-tight text-center uppercase leading-snug">
              {t('gameReveal.title')}
            </Text>
            <Text className="text-[#47624b] font-medium text-center max-w-sm mt-2">
              {t('gameReveal.description')}
            </Text>
          </View>

          {/* Keywords Reveal */}
          <View className="w-full gap-4 mb-8">
            <Text className="text-center font-black uppercase tracking-widest text-[12px] text-[#1b3420]">
              {t('gameReveal.theKeywords')}
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
                <Text className="text-[10px] font-black tracking-widest text-[#47624b] mb-1 uppercase">{t('gameReveal.agentKeyword')}</Text>
                <Text className="text-2xl font-black text-[#006b1b] uppercase leading-snug text-center">{civWord}</Text>
              </View>
              <View className="flex-1 items-center bg-white py-4 rounded-xl border-2 border-[#ff9800]/30"
                    style={{
                      shadowColor: '#1b3420',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      elevation: 2
                    }}>
                <Text className="text-[10px] font-black tracking-widest text-[#874e00] mb-1 uppercase">{t('gameReveal.spyKeyword')}</Text>
                <Text className="text-2xl font-black text-[#ff9800] uppercase leading-snug text-center">{spyWord}</Text>
              </View>
            </View>
          </View>

          {/* All Players Reveal */}
          <Text className="text-center font-black uppercase tracking-widest text-[12px] text-[#1b3420] mb-4">
            {t('gameReveal.allPlayers')}
          </Text>
          
          <View className="gap-3 mb-8">
            {players.map((player, index) => (
              <Card key={player.id} variant="primary" className="p-4">
                <View className="flex-row items-center gap-4">
                  {/* Avatar */}
                  <View 
                    className="w-14 h-14 rounded-full items-center justify-center border-2"
                    style={{ 
                      backgroundColor: getAvatarBgColor(index),
                      borderColor: getAvatarColor(index),
                      opacity: player.isAlive ? 1 : 0.5
                    }}
                  >
                    <MaterialCommunityIcons 
                      name={getAvatarIcon(index)} 
                      size={28} 
                      color={getAvatarColor(index)} 
                    />
                  </View>

                  {/* Player Info */}
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2">
                      <Text className={`font-black text-lg text-[#1b3420] leading-snug ${!player.isAlive ? 'line-through opacity-50' : ''}`}>
                        {player.name}
                      </Text>
                      {!player.isAlive && (
                        <View className="bg-[#f95630]/20 px-2 py-0.5 rounded-full">
                          <Text className="text-[8px] font-black text-[#f95630] uppercase">{t('gameReveal.eliminated')}</Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-xs font-medium text-[#47624b] mt-0.5">
                      {t('gameReveal.keyword')}: <Text className="font-black text-[#1b3420]">{getKeyword(player.role)}</Text>
                    </Text>
                  </View>

                  {/* Role Badge */}
                  <View className="items-center gap-1">
                    <View 
                      className="w-10 h-10 rounded-full items-center justify-center"
                      style={{ backgroundColor: getRoleColor(player.role) + '20' }}
                    >
                      <Ionicons name={getRoleIcon(player.role)} size={20} color={getRoleColor(player.role)} />
                    </View>
                    <Text className="text-[8px] font-black uppercase tracking-wider" style={{ color: getRoleColor(player.role) }}>
                      {getRoleLabel(player.role)}
                    </Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          {/* Action Buttons */}
          <View className="gap-4 mb-8">
            <Button 
              label={t('gameReveal.playAgain')}
              variant="primary"
              onPress={handlePlayAgain}
              icon="refresh"
            />
            <TouchableOpacity onPress={handleHome}>
              <Text className="text-[#47624b] font-bold text-sm uppercase tracking-widest text-center">
                {t('gameReveal.backToLobby')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default GameRevealScreen;
