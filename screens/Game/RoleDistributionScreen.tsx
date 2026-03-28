import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { Ionicons } from '@expo/vector-icons';

const RoleDistributionScreen = () => {
  const router = useRouter();
  const players = useStore((state) => state.players);
  const setPhase = useStore((state) => state.setPhase);

  const allSeen = useMemo(() => players.every(p => p.hasSeenRole), [players]);

  const handleStartDiscussion = () => {
    setPhase('discussion');
    router.push('/discussion-voting');
  };

  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="flex-row items-center gap-4 px-6 py-4 bg-[#e0fee1]">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="menu" size={28} color="#006b1b" />
        </TouchableOpacity>
        <Text className="font-bold tracking-tight text-[#006b1b] text-xl">Who is Spy</Text>
        <View className="flex-1" />
        <View className="w-10 h-10 rounded-full bg-[#bee7c1] border-2 border-[#006b1b] items-center justify-center overflow-hidden">
          <Ionicons name="person" size={20} color="#006b1b" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-8" showsVerticalScrollIndicator={false}>
        {/* Instructions Header */}
        <View className="mb-10 text-center items-center">
          <View className="bg-[#91f78e] px-4 py-1.5 rounded-full mb-2">
            <Text className="font-bold text-xs tracking-widest text-[#006b1b] uppercase">Mission Briefing</Text>
          </View>
          <Text className="text-3xl font-black text-[#1b3420] mb-4 leading-tight tracking-tight text-center uppercase">
            TAP TO VIEW{'\n'}YOUR KEYWORD
          </Text>
          <Text className="text-[#47624b] font-medium text-center max-w-sm">
            Each player will receive a keyword. Tap your card to see yours privately. Keep it secret from others!
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
                  <Text className={`text-xs font-black uppercase tracking-tighter mb-1 ${isSeen ? 'text-[#47624b]/60' : 'text-[#5b5300]/60'}`}>
                    Operative {String(index + 1).padStart(2, '0')}
                  </Text>
                  <Text className={`font-bold ${isSeen ? 'text-[#47624b]' : 'text-[#5b5300]'}`}>
                    {isSeen ? item.name : '???'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Area */}
        <View className="mb-32 items-center">
          <Button 
            label="START DISCUSSION"
            variant="primary"
            onPress={handleStartDiscussion} 
            disabled={!allSeen}
            className={!allSeen ? 'opacity-50' : ''}
          />
          <Text className="text-xs font-bold text-[#006b1b]/60 uppercase tracking-widest mt-4">
            {players.filter(p => p.hasSeenRole).length} of {players.length} Ready
          </Text>
        </View>
      </ScrollView>

      </SafeAreaView>

      {/* Bottom Navigation - Fixed at bottom */}
      <View className="w-full flex-row justify-around items-center px-4 pb-6 pt-3 bg-[#e0fee1] rounded-t-[32px]"
            style={{
              shadowColor: '#1b3420',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 8
            }}>
        <TouchableOpacity className="flex-col items-center justify-center bg-[#006b1b] rounded-full px-6 py-2"
                          style={{ borderBottomWidth: 4, borderBottomColor: '#005d16' }}>
          <Ionicons name="game-controller" size={24} color="#e0fee1" />
          <Text className="text-[10px] font-bold tracking-widest mt-1 text-[#e0fee1] uppercase">Game</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-col items-center justify-center opacity-70 px-4 py-2">
          <Ionicons name="people" size={24} color="#1b3420" />
          <Text className="text-[10px] font-bold tracking-widest mt-1 text-[#1b3420] uppercase">Players</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-col items-center justify-center opacity-70 px-4 py-2">
          <Ionicons name="document-text" size={24} color="#1b3420" />
          <Text className="text-[10px] font-bold tracking-widest mt-1 text-[#1b3420] uppercase">Rules</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default RoleDistributionScreen;
