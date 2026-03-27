import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
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

  return (
    <SafeAreaView className="flex-1 bg-[#e0fee1]">
      <View className="flex-row justify-between items-center px-6 py-4 z-40 bg-[#e0fee1]">
        <View className="w-10 h-10 border-2 border-transparent" />
        <Text className="font-black tracking-tight uppercase text-2xl text-[#1b3420]">VOTING</Text>
        <View className="w-10 h-10 rounded-full bg-[#f9e534] border-2 border-[#665c00] items-center justify-center shadow-sm">
          <Ionicons name="chatbubbles" size={20} color="#665c00" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-2" showsVerticalScrollIndicator={false}>
        <View className="items-center mb-8 mt-4">
          <Text className="text-4xl font-black text-[#b02500] text-center tracking-tight uppercase">ELIMINATION</Text>
          <Text className="text-sm font-bold text-[#47624b] mt-2 text-center">Vote out the suspected spy.</Text>
        </View>

        <Card className="mb-8 p-6" rotated>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="font-bold text-2xl text-[#1b3420] uppercase tracking-tight">Suspects</Text>
          </View>

          <View className="space-y-4">
            {players.map((item) => {
              const isDead = !item.isAlive;
              const isSelected = selectedId === item.id;
              
              return (
                <TouchableOpacity 
                  key={item.id}
                  onPress={() => !isDead && setSelectedId(item.id)}
                  disabled={isDead}
                  className={`flex-row justify-between items-center py-4 border-b-2 border-dashed border-[#c6ecc8] ${isDead ? 'opacity-40' : ''}`}
                >
                  <View className="flex-row items-center flex-1">
                    <View className={`w-8 h-8 rounded-full border-4 mr-4 items-center justify-center shadow-sm ${isSelected ? 'border-[#ff9800] bg-[#fff0e5]' : 'border-[#98b499] bg-[#e0fee1]'}`}>
                      {isSelected && <View className="w-4 h-4 rounded-full bg-[#ff9800]" />}
                    </View>
                    <Text className={`text-2xl font-bold uppercase tracking-tight ${isDead ? 'line-through text-[#47624b]' : 'text-[#1b3420]'}`}>{item.name}</Text>
                  </View>
                  {isDead && (
                    <View className="bg-[#b3dfb8] px-3 py-1 rounded-full border border-[#627d65]">
                      <Text className={`font-black tracking-widest text-[10px] uppercase ${item.role === 'spy' ? 'text-[#ff9800]' : 'text-[#006b1b]'}`}>
                        {item.role.toUpperCase()}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        <View className="mb-12 mt-4">
          <Button 
            label={selectedId ? "VOTE TO ELIMINATE" : "SELECT A SUSPECT"}
            variant={selectedId ? "tertiary" : "secondary"}
            onPress={handleVote} 
            disabled={!selectedId}
            className={!selectedId ? 'opacity-50' : ''}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default DiscussionVotingScreen;
