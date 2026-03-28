import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { Ionicons } from '@expo/vector-icons';

const ManageGroupsScreen = () => {
  const router = useRouter();
  const players = useStore((state) => state.players);
  const addPlayer = useStore((state) => state.addPlayer);
  const removePlayer = useStore((state) => state.removePlayer);
  const setPhase = useStore((state) => state.setPhase);

  const [newName, setNewName] = useState('');
  const [numSpies, setNumSpies] = useState(1);
  const [numBlanks, setNumBlanks] = useState(0);

  const handleAdd = () => {
    if (newName.trim()) {
      addPlayer(newName.trim());
      setNewName('');
    }
  };

  // Calculate civilians (remaining players after spies and blanks)
  const numCivilians = players.length - numSpies - numBlanks;
  
  // Validation: Spies must be less than civilians
  const isValidConfiguration = numSpies > 0 && numSpies < numCivilians && numBlanks >= 0;
  const canStartGame = players.length >= 3 && isValidConfiguration;

  const handleConfirm = () => {
    if (canStartGame) {
      setPhase('setup');
      router.push({
        pathname: '/import-keywords',
        params: { numSpies: numSpies.toString(), numBlanks: numBlanks.toString() }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#e0fee1]">
      <View className="flex-row justify-between items-center px-6 py-4 z-40 bg-[#e0fee1]">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={28} color="#006b1b" />
        </TouchableOpacity>
        <Text className="font-black tracking-tight uppercase text-2xl text-[#1b3420]">OPERATIVES</Text>
        <View className="w-10 h-10 rounded-full bg-[#91f78e] border-2 border-[#006b1b] items-center justify-center overflow-hidden">
          <Ionicons name="person" size={20} color="#006b1b" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        
        <View className="mb-8">
          <View className="mb-4 bg-white rounded-full px-6 py-4 shadow-sm border-2 border-[#bee7c1] flex-row items-center">
            <TextInput 
              className="flex-1 text-xl text-[#1b3420] font-bold"
              placeholder="Enter operative name..."
              placeholderTextColor="#88a48a"
              value={newName}
              onChangeText={setNewName}
              onSubmitEditing={handleAdd}
            />
          </View>
          <Button 
            label="ADD NEW PLAYER" 
            onPress={handleAdd} 
            disabled={!newName.trim()}
            icon="add-circle"
          />
        </View>

        <Card variant="secondary" rotated className="mb-8">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Text className="font-bold text-3xl text-[#5b5300] leading-tight">Active Squad</Text>
              <Text className="font-black text-[12px] tracking-widest uppercase opacity-80 text-[#5b5300] mt-1">{players.length} Players Total</Text>
            </View>
          </View>

          <View className="bg-[#b3dfb8]/30 rounded-xl p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="font-black text-[11px] uppercase text-[#47624b]">Currently Deployed</Text>
            </View>

            <View className="flex-row flex-wrap gap-5">
              {players.length === 0 && (
                <Text className="text-sm font-bold text-[#47624b] py-4">No operatives added yet.</Text>
              )}
              {players.map((item, index) => (
                <View key={item.id} className="flex-col items-center gap-1">
                  <View className="w-16 h-16 bg-[#e0fee1] rounded-full items-center justify-center border-2 border-[#005d16]/20 shadow-sm relative">
                    <Text className="text-[#005d16] font-black text-xl">{index + 1}</Text>
                    <TouchableOpacity 
                      onPress={() => removePlayer(item.id)}
                      className="absolute -top-1 -right-1 bg-[#b02500] rounded-full w-6 h-6 items-center justify-center border-2 border-[#f9e534]"
                    >
                      <Ionicons name="close" size={14} color="white" />
                    </TouchableOpacity>
                  </View>
                  <Text className="text-sm font-bold text-[#1b3420]">{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>

        {/* Game Configuration Card */}
        <Card variant="primary" className="mb-8 rotate-1">
          <View className="flex-row items-center gap-3 mb-6">
            <Ionicons name="settings" size={24} color="#005d16" />
            <Text className="text-2xl font-black text-[#00480f] tracking-tight uppercase">Game Setup</Text>
          </View>

          {/* Spies Configuration */}
          <View className="mb-6">
            <Text className="font-bold text-[12px] tracking-widest text-[#00691a] uppercase mb-3">Number of Spies</Text>
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
                  {numSpies === 1 ? 'Spy' : 'Spies'}
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
            <Text className="font-bold text-[12px] tracking-widest text-[#00691a] uppercase mb-3">Blank Cards (Optional)</Text>
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
                <Text className="text-xs font-bold text-[#47624b] uppercase tracking-wider mt-1">Blanks</Text>
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

          {/* Role Summary */}
          <View className="bg-[#d8f9d9] rounded-xl p-4">
            <Text className="font-bold text-[10px] tracking-widest text-[#47624b] uppercase mb-3">Role Distribution</Text>
            <View className="flex-row justify-between items-center">
              <View className="flex-col items-center">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="shield-checkmark" size={20} color="#006b1b" />
                  <Text className="text-2xl font-black text-[#006b1b]">{numCivilians}</Text>
                </View>
                <Text className="text-[10px] font-bold text-[#47624b] uppercase mt-1">Civilians</Text>
              </View>
              
              <View className="w-px h-12 bg-[#47624b]/20" />
              
              <View className="flex-col items-center">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="eye" size={20} color="#ff9800" />
                  <Text className="text-2xl font-black text-[#ff9800]">{numSpies}</Text>
                </View>
                <Text className="text-[10px] font-bold text-[#47624b] uppercase mt-1">
                  {numSpies === 1 ? 'Spy' : 'Spies'}
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
                    <Text className="text-[10px] font-bold text-[#47624b] uppercase mt-1">Blanks</Text>
                  </View>
                </>
              )}
            </View>

            {/* Validation Message */}
            {!isValidConfiguration && players.length >= 3 && (
              <View className="mt-4 bg-[#f95630]/10 rounded-lg p-3 flex-row items-start gap-2">
                <Ionicons name="warning" size={16} color="#b02500" />
                <Text className="flex-1 text-xs font-bold text-[#b02500]">
                  Spies must be less than civilians. Adjust the numbers.
                </Text>
              </View>
            )}
          </View>
        </Card>

        <View className="mb-32">
          <Button 
            label="CONFIRM SQUAD" 
            variant="tertiary"
            onPress={handleConfirm} 
            disabled={!canStartGame}
            className={!canStartGame ? 'opacity-50' : ''}
          />
          {players.length < 3 && (
            <Text className="text-center text-[#b02500] font-bold text-sm mt-4 uppercase tracking-wide">
              Need at least 3 players
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ManageGroupsScreen;
