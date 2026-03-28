import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getAvatarIcon, getAvatarColor } from '../../utils/avatarUtils';

const ManageGroupsScreen = () => {
  const router = useRouter();
  const players = useStore((state) => state.players);
  const addPlayer = useStore((state) => state.addPlayer);
  const removePlayer = useStore((state) => state.removePlayer);

  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    if (newName.trim()) {
      addPlayer(newName.trim());
      setNewName('');
    }
  };

  const canConfirmSquad = players.length >= 3;

  const handleConfirmSquad = () => {
    if (canConfirmSquad) {
      router.push('/game-config');
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
                    <MaterialCommunityIcons name={getAvatarIcon(index)} size={32} color={getAvatarColor(index)} />
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

        <View className="mb-32">
          <Button 
            label="CONFIRM SQUAD" 
            variant="tertiary"
            onPress={handleConfirmSquad} 
            disabled={!canConfirmSquad}
            className={!canConfirmSquad ? 'opacity-50' : ''}
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
