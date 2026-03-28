import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import Button from '../../components/Button/Button';
import { Ionicons } from '@expo/vector-icons';

const DiscussionVotingScreen = () => {
  const router = useRouter();
  const players = useStore((state) => state.players);
  const eliminatePlayer = useStore((state) => state.eliminatePlayer);
  const setWinner = useStore((state) => state.setWinner);
  const setPhase = useStore((state) => state.setPhase);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const checkWinCondition = (updatedPlayers: any[]) => {
    const alive = updatedPlayers.filter(p => p.isAlive);
    const spies = alive.filter(p => p.role === 'spy');
    const civs = alive.filter(p => p.role !== 'spy'); 
    
    if (spies.length === 0) {
      setWinner('civilians');
      setPhase('victory');
      router.push('/victory');
      return true;
    }
    if (spies.length >= civs.length) {
      setWinner('spies');
      setPhase('victory');
      router.push('/victory');
      return true;
    }
    return false;
  };

  const handleVote = () => {
    if (!selectedId) return;
    const playerToEliminate = players.find(p => p.id === selectedId);
    
    Alert.alert(
      "Eliminate Player",
      `Are you sure you want to vote out ${playerToEliminate?.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm", 
          style: "destructive",
          onPress: () => {
            eliminatePlayer(selectedId);
            const updatedPlayers = players.map(p => p.id === selectedId ? { ...p, isAlive: false} : p);
            const gameEnded = checkWinCondition(updatedPlayers);
            if (!gameEnded) {
              setSelectedId(null);
            }
          }
        }
      ]
    );
  };

  const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];

  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1 flex-col">
      {/* TopAppBar */}
      <View className="w-full flex-row items-center gap-3 px-6 py-4 h-16">
        <Ionicons name="menu" size={28} color="#006b1b" />
        <Text className="text-2xl font-black text-[#006b1b] tracking-tighter uppercase">WHO IS SPY?</Text>
        <View className="flex-1" />
        <View className="w-10 h-10 rounded-full bg-[#bee7c1] items-center justify-center overflow-hidden border-2 border-[#006b1b]">
          <Ionicons name="person" size={20} color="#006b1b" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4 pb-32" showsVerticalScrollIndicator={false}>
        {/* Countdown Section */}
        <View className="flex-col items-center mb-10">
          <View className="bg-[#d8f9d9] px-8 py-4 rounded-xl flex-col items-center justify-center">
            <Text className="font-bold text-xs tracking-[0.2em] text-[#47624b] uppercase mb-1">DISCUSSION TIME</Text>
            <View className="flex-row items-baseline gap-1">
              <Text className="text-6xl font-black text-[#006b1b] tracking-tighter leading-none">∞</Text>
            </View>
          </View>
          <Text className="mt-4 text-[#47624b] font-medium text-center max-w-xs">
            Discuss with others and find out who doesn't belong!
          </Text>
        </View>

        {/* Player Grid */}
        <View className="flex-row flex-wrap justify-between gap-6">
          {players.map((item, index) => {
            const isDead = !item.isAlive;
            const isSelected = selectedId === item.id;
            const rotation = rotations[index % rotations.length];
            
            return (
              <TouchableOpacity 
                key={item.id}
                onPress={() => !isDead && setSelectedId(item.id)}
                disabled={isDead}
                className={`w-[45%] bg-[#f9e534] p-4 rounded-xl ${rotation} ${isDead ? 'opacity-40' : ''} ${isSelected ? 'border-4 border-[#006b1b]' : ''}`}
                style={{
                  shadowColor: '#1b3420',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0,
                  shadowRadius: 0,
                  elevation: 0,
                  borderBottomLeftRadius: index % 2 === 0 ? 12 : 48,
                  borderBottomRightRadius: index % 2 === 0 ? 48 : 12,
                }}
              >
                {isSelected && !isDead && (
                  <View className="absolute -top-3 -right-2 bg-[#006b1b] text-[#e0fee1] text-[10px] font-bold px-2 py-1 rounded-full">
                    <Text className="text-[10px] font-bold uppercase tracking-tighter text-[#e0fee1]">You</Text>
                  </View>
                )}
                
                <View className="flex-col items-center text-center gap-3">
                  <View className="w-16 h-16 rounded-full bg-[#b3dfb8] flex items-center justify-center">
                    <Text className="text-3xl">{index === 0 ? '🦊' : index === 1 ? '🐻' : index === 2 ? '🐼' : index === 3 ? '🐨' : index === 4 ? '🐯' : '🦁'}</Text>
                  </View>
                  <View>
                    <Text className={`font-bold text-lg text-[#5b5300] leading-tight ${isDead ? 'line-through' : ''}`}>
                      {item.name}
                    </Text>
                    <Text className="text-[10px] font-bold text-[#5b5300]/60 uppercase tracking-widest">
                      {isDead ? (item.role === 'spy' ? '🕵️ SPY' : '👤 CIVILIAN') : 'READY'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      </SafeAreaView>

      {/* Sticky Vote Button */}
      <View className="w-full px-6 py-3 bg-[#e0fee1]">
        <Button 
          label="VOTE NOW"
          variant="primary"
          onPress={handleVote} 
          disabled={!selectedId}
          icon="checkmark-circle"
          className={!selectedId ? 'opacity-50' : ''}
        />
      </View>

      {/* BottomNavBar - Fixed at bottom */}
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
          <Text className="text-[10px] font-medium tracking-wide uppercase text-[#e0fee1]">Game</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-col items-center justify-center opacity-70">
          <Ionicons name="people" size={24} color="#1b3420" />
          <Text className="text-[10px] font-medium tracking-wide uppercase text-[#1b3420]">Players</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-col items-center justify-center opacity-70">
          <Ionicons name="document-text" size={24} color="#1b3420" />
          <Text className="text-[10px] font-medium tracking-wide uppercase text-[#1b3420]">Rules</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DiscussionVotingScreen;
