import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { Ionicons } from '@expo/vector-icons';

const VictoryScreen = () => {
  const router = useRouter();
  const winner = useStore((state) => state.winner);
  const players = useStore((state) => state.players);
  const civWord = useStore((state) => state.civilianWord);
  const spyWord = useStore((state) => state.spyWord);
  const resetPlayers = useStore((state) => state.resetPlayers);

  const spies = players.filter(p => p.role === 'spy');
  const isCivsWin = winner === 'civilians';

  const handlePlayAgain = () => {
    resetPlayers(); 
    router.replace('/manage-groups');
  };

  const handleHome = () => {
    resetPlayers();
    router.replace('/');
  };

  return (
    <SafeAreaView className={`flex-1 ${isCivsWin ? 'bg-[#e0fee1]' : 'bg-[#fff0e5]'}`}>
      <ScrollView className="flex-1 px-6 pt-12" showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        
        <View className="items-center mb-8">
          <View className={`w-24 h-24 rounded-full border-4 shadow-sm items-center justify-center mb-6 
            ${isCivsWin ? 'bg-[#91f78e] border-[#006b1b]' : 'bg-[#ff9800] border-[#874e00]'}`}>
            <Ionicons name={isCivsWin ? "shield-checkmark" : "skull"} size={48} color={isCivsWin ? "#006b1b" : "#874e00"} />
          </View>
          <Text className={`text-6xl font-black text-center mb-2 tracking-tighter uppercase leading-[64px]
            ${isCivsWin ? 'text-[#006b1b]' : 'text-[#b02500]'}`} 
            style={{textShadowColor: 'rgba(0,0,0,0.1)', textShadowOffset: {width: 0, height: 4}, textShadowRadius: 0}}>
            {isCivsWin ? 'CIVILIANS\nWIN!' : 'SPIES\nWIN!'}
          </Text>
        </View>
        
        <Card className="my-8" rotated variant={isCivsWin ? 'surface' : 'secondary'}>
          <Text className={`text-center font-black uppercase tracking-widest mb-6 text-[12px] 
            ${isCivsWin ? 'text-[#1b3420]' : 'text-[#874e00]'}`}>The Intel</Text>
          
          <View className="flex-row justify-between items-center mb-8">
            <View className="flex-1 items-center bg-white py-4 rounded-xl border-2 border-[#c6ecc8] shadow-sm">
              <Text className="text-[10px] font-black tracking-widest text-[#47624b] mb-1 uppercase">CIVILIAN</Text>
              <Text className="text-2xl font-black text-[#006b1b] uppercase">{civWord}</Text>
            </View>
            <View className="w-4" />
            <View className="flex-1 items-center bg-white py-4 rounded-xl border-2 border-[#ff9800]/30 shadow-sm">
              <Text className="text-[10px] font-black tracking-widest text-[#874e00] mb-1 uppercase">SPY</Text>
              <Text className="text-2xl font-black text-[#ff9800] uppercase">{spyWord}</Text>
            </View>
          </View>

          <View className="pt-6 border-t-2 border-dashed border-black/10">
            <Text className={`text-center font-black uppercase tracking-widest mb-4 text-[12px] 
              ${isCivsWin ? 'text-[#1b3420]' : 'text-[#874e00]'}`}>The Spies</Text>
            {spies.map(s => (
              <Text key={s.id} className="text-center text-3xl font-black tracking-tight uppercase text-[#b02500] mb-2">{s.name}</Text>
            ))}
          </View>
        </Card>

        <View className="w-full gap-5 mt-4 mb-12">
          <Button label="REMATCH" onPress={handlePlayAgain} variant={isCivsWin ? 'primary' : 'tertiary'} />
          <Button label="RETURN TO HQ" variant="secondary" onPress={handleHome} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default VictoryScreen;
