import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button/Button';
import { useStore } from '../../store';
import { t } from '../../utils/i18n';
import { soundManager } from '../../utils/soundManager';

const RoleDistributionScreen = () => {
  const router = useRouter();
  const players = useStore((state) => state.players);
  const setPhase = useStore((state) => state.setPhase);
  const language = useStore((state) => state.language);

  const allSeen = useMemo(() => players.every(p => p.hasSeenRole), [players]);

  // Play start game sound when screen loads
  useEffect(() => {
    soundManager.playSound('start-game', 0.7);
  }, []);

  const handleStartDiscussion = () => {
    setPhase('discussion');
    router.push('/discussion-voting');
  };

  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1" edges={['bottom']}>
      <ScrollView className="flex-1 px-6 pt-8" showsVerticalScrollIndicator={false}>
        {/* Instructions Header */}
        <View className="mb-10 text-center items-center">
          <View className="bg-[#91f78e] px-4 py-1.5 rounded-full mb-2">
            <Text className="font-bold text-xs tracking-widest text-[#006b1b] uppercase">{t('roleDistribution.subtitle')}</Text>
          </View>
          <Text className="text-3xl font-black text-[#1b3420] mb-4 leading-snug tracking-tight text-center uppercase">
            {t('roleDistribution.tapToReveal')}
          </Text>
          <Text className="text-[#47624b] font-medium text-center max-w-sm">
            {t('roleDistribution.description')}
          </Text>
        </View>

        {/* Operative Grid */}
        <View className="flex-row flex-wrap justify-between gap-6 mb-12">
          {players.map((item, index) => {
            const isSeen = item.hasSeenRole;
            const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-2', 'rotate-2'];
            const rotation = rotations[index % rotations.length];
            
            return (
              <TouchableOpacity 
                key={item.id}
                onPress={() => !isSeen && router.push({ pathname: '/role-reveal', params: { id: item.id } })}
                disabled={isSeen}
                className={`w-[45%] bg-${isSeen ? '[#d8f9d9]' : '[#f9e534]'} p-6 rounded-xl ${rotation}`}
                style={{
                  shadowColor: '#1b3420',
                  shadowOffset: { width: 8, height: 8 },
                  shadowOpacity: 0.1,
                  shadowRadius: 0,
                  elevation: 4,
                  borderBottomRightRadius: 48,
                }}
              >
                {isSeen && (
                  <View className="absolute top-3 right-3 bg-[#006b1b] rounded-full p-1">
                    <Ionicons name="checkmark-circle" size={16} color="#d1ffc8" />
                  </View>
                )}
                
                <View className="w-20 h-20 mx-auto mb-4 bg-[#b3dfb8] rounded-full flex items-center justify-center">
                  {isSeen ? (
                    <Ionicons name="checkmark-done" size={32} color="#47624b" />
                  ) : (
                    <Ionicons name="lock-closed" size={32} color="#98b499" />
                  )}
                </View>
                
                <View className="text-center items-center">
                  <Text className={`font-bold ${isSeen ? 'text-[#47624b]' : 'text-[#5b5300]'}`}>
                    {item.name}
                  </Text>
                  <Text className={`text-xs font-black uppercase tracking-tighter mt-1 ${isSeen ? 'text-[#47624b]/60' : 'text-[#5b5300]/60'}`}>
                    {isSeen ? `✓ ${t('roleDistribution.revealed')}` : t('roleDistribution.tapToView')}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Area */}
        <View className="mb-32 items-center">
          <Button 
            label={t('roleDistribution.startDiscussion')}
            variant="primary"
            onPress={handleStartDiscussion} 
            disabled={!allSeen}
            className={!allSeen ? 'opacity-50' : ''}
          />
          <Text className="text-xs font-bold text-[#006b1b]/60 uppercase tracking-widest mt-4">
            {players.filter(p => p.hasSeenRole).length} / {players.length} {t('common.ready')}
          </Text>
        </View>
      </ScrollView>

      </SafeAreaView>
    </View>
  );
};
export default RoleDistributionScreen;
