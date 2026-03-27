import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useStore } from '../../store';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { Ionicons } from '@expo/vector-icons';

const RoleRevealScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const player = useStore((state) => state.players.find(p => p.id === id));
  const markRoleSeen = useStore((state) => state.markRoleSeen);
  const civWord = useStore((state) => state.civilianWord);
  const spyWord = useStore((state) => state.spyWord);

  const [revealed, setRevealed] = useState(false);

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

  return (
    <SafeAreaView className="flex-1 bg-[#e0fee1] justify-center px-6">
      <Card className="items-center py-12 px-6 bg-white min-h-[400px] justify-center" rotated>
        <View className="w-16 h-16 rounded-full bg-[#f9e534] border-2 border-[#665c00] items-center justify-center mb-6 shadow-sm">
          <Ionicons name="eye" size={32} color="#665c00" />
        </View>

        <Text className="text-3xl font-black text-[#5b5300] tracking-tight uppercase mb-2 text-center w-full">{player.name}</Text>
        <View className="h-1 w-16 bg-[#f9e534] mb-8 rounded-full" />
        
        {!revealed ? (
          <>
            <Text className="text-sm font-bold tracking-widest uppercase text-[#47624b] text-center mb-12">
              Ensure perimeter is secure before viewing.
            </Text>
            <Button label="TAP TO SHOW INTEL" variant="secondary" onPress={() => setRevealed(true)} />
          </>
        ) : (
          <>
            <Text className="text-[12px] font-black tracking-widest uppercase text-[#47624b] text-center mb-4">
              Your classified objective is:
            </Text>
            <Text className="text-5xl font-black text-[#006b1b] text-center mb-10 tracking-tighter uppercase" style={{textShadowColor: 'rgba(0, 52, 32, 0.1)', textShadowOffset: {width: 0, height: 4}, textShadowRadius: 0}}>
              {getRoleWord()}
            </Text>
            
            {player.role === 'spy' && (
              <View className="bg-[#ffefec] px-6 py-2 rounded-full border border-[#f95630] mb-8 shadow-sm">
                <Text className="text-sm font-black text-[#b02500] uppercase tracking-widest">You are the Spy!</Text>
              </View>
            )}
            
            <Button label="ACKNOWLEDGE" variant="primary" onPress={handleUnderstand} />
          </>
        )}
      </Card>
    </SafeAreaView>
  );
};
export default RoleRevealScreen;
