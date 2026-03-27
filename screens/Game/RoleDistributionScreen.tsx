import React, { useMemo } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
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
    <SafeAreaView className="flex-1 bg-[#e0fee1]">
      <View className="flex-row justify-between items-center px-6 py-4 z-40 bg-[#e0fee1]">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={28} color="#006b1b" />
        </TouchableOpacity>
        <Text className="font-black tracking-tight uppercase text-2xl text-[#1b3420]">BRIEFING</Text>
        <View className="w-10 h-10 rounded-full bg-[#ff9800] border-2 border-[#874e00] items-center justify-center overflow-hidden">
          <Ionicons name="folder" size={20} color="#874e00" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-2" showsVerticalScrollIndicator={false}>
        <View className="items-center mb-8 mt-2">
          <View className="w-20 h-20 rounded-full bg-[#c6ecc8] border-4 border-[#e0fee1] shadow-sm items-center justify-center mb-4">
            <Ionicons name="lock-closed" size={32} color="#006b1b" />
          </View>
          <Text className="text-4xl font-black text-[#1b3420] text-center tracking-tight uppercase">Top Secret</Text>
          <Text className="text-sm font-bold text-[#47624b] mt-2 text-center">Pass the device to each operative secretly.</Text>
        </View>

        <Card className="mb-8" rotated>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="font-bold text-2xl text-[#1b3420] uppercase tracking-tight">Operatives</Text>
            <View className="bg-[#91f78e] px-3 py-1 rounded-full border border-[#006b1b]">
              <Text className="font-black text-[10px] tracking-widest text-[#006b1b] uppercase">
                {players.filter(p => p.hasSeenRole).length} / {players.length} READY
              </Text>
            </View>
          </View>

          <View className="flex-col">
            {players.map((item, index) => {
              const isSeen = item.hasSeenRole;
              return (
                <TouchableOpacity 
                  key={item.id}
                  onPress={() => !isSeen && router.push({ pathname: '/role-reveal', params: { id: item.id } })}
                  disabled={isSeen}
                  className={`flex-row items-center py-4 border-b-2 border-dashed border-[#c6ecc8] ${isSeen ? 'opacity-50' : ''}`}
                >
                  <View className={`w-12 h-12 rounded-full ${isSeen ? 'bg-[#c6ecc8] border-[#98b499]' : 'bg-[#91f78e] border-[#006b1b]'} border-2 flex items-center justify-center mr-4 shadow-sm relative`}>
                    {isSeen ? (
                      <Ionicons name="checkmark-done" size={20} color="#47624b" />
                    ) : (
                      <Text className="text-[#005d16] font-black text-xl">{index + 1}</Text>
                    )}
                  </View>
                  <View className="flex-1 pr-2">
                    <Text className={`text-2xl font-bold tracking-tight uppercase ${isSeen ? 'text-[#47624b] line-through' : 'text-[#1b3420]'}`}>{item.name}</Text>
                    {isSeen && <Text className="text-[10px] font-black tracking-widest uppercase text-[#47624b] mt-1">Briefing Received</Text>}
                  </View>
                  {!isSeen && (
                    <View className="bg-[#1b3420] px-4 py-2 rounded-full shadow-sm">
                      <Text className="text-white font-black text-[10px] tracking-widest uppercase">REVEAL</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        <View className="mb-12 mt-4">
          <Button 
            label="COMMENCE MISSION"
            variant="tertiary"
            onPress={handleStartDiscussion} 
            disabled={!allSeen}
            className={!allSeen ? 'opacity-50' : ''}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default RoleDistributionScreen;
