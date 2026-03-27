import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { Ionicons } from '@expo/vector-icons';

const ImportKeywordsScreen = () => {
  const router = useRouter();
  const getRandomKeyword = useStore((state) => state.getRandomKeyword);
  const setWords = useStore((state) => state.setWords);
  const assignRoles = useStore((state) => state.assignRoles);
  const setPhase = useStore((state) => state.setPhase);

  const [civWord, setCivWord] = useState('');
  const [spyWord, setSpyWord] = useState('');

  const startGameWithWord = (civ: string, spy: string) => {
    setWords(civ, spy);
    assignRoles(1); 
    setPhase('role_distribution');
    router.push('/role-distribution');
  };

  const handleRandom = () => {
    const random = getRandomKeyword();
    if (random) startGameWithWord(random.civilian, random.spy);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#e0fee1]">
      <View className="flex-row justify-between items-center px-6 py-4 z-40 bg-[#e0fee1] shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={28} color="#006b1b" />
        </TouchableOpacity>
        <Text className="font-black tracking-tight uppercase text-2xl text-[#1b3420]">KEYWORDS</Text>
        <View className="w-10 h-10 rounded-full bg-[#91f78e] border-2 border-[#006b1b] items-center justify-center overflow-hidden">
          <Ionicons name="settings" size={20} color="#006b1b" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <Card variant="primary" className="mb-8 items-center bg-[#91f78e]">
          <View className="w-16 h-16 rounded-full bg-[#006b1b]/10 items-center justify-center mb-4">
            <Ionicons name="shuffle" size={32} color="#005d16" />
          </View>
          <Text className="text-3xl font-black mb-2 text-center text-[#00480f] tracking-tight">RANDOM TOPIC</Text>
          <Text className="text-center text-[#00691a] mb-8 text-sm font-bold opacity-80">
            Let HQ assign a classified keyword pair from the secured vault.
          </Text>
          <Button label="RANDOMIZE" variant="primary" className="w-full" onPress={handleRandom} />
        </Card>

        <Card className="mb-8" rotated>
          <View className="flex-row items-center gap-3 mb-6">
            <Ionicons name="pencil" size={24} color="#1b3420" />
            <Text className="text-2xl font-black text-[#1b3420] tracking-tight uppercase">Custom Intel</Text>
          </View>
          
          <Text className="font-bold text-[12px] tracking-widest text-[#47624b] uppercase mb-2 ml-4">Civilian Word</Text>
          <View className="mb-6 bg-white rounded-full px-6 py-4 shadow-sm border border-[#c6ecc8] flex-row items-center">
            <TextInput 
              className="flex-1 text-xl text-[#1b3420] font-bold" 
              placeholder="e.g. Apple" 
              placeholderTextColor="#88a48a"
              value={civWord} 
              onChangeText={setCivWord} 
            />
          </View>

          <Text className="font-bold text-[12px] tracking-widest text-[#47624b] uppercase mb-2 ml-4">Spy Word</Text>
          <View className="mb-8 bg-white rounded-full px-6 py-4 shadow-sm border border-[#c6ecc8] flex-row items-center">
            <TextInput 
              className="flex-1 text-xl text-[#1b3420] font-bold" 
              placeholder="e.g. Pear" 
              placeholderTextColor="#88a48a"
              value={spyWord} 
              onChangeText={setSpyWord} 
            />
          </View>

          <Button 
            label="CONFIRM INTEL" 
            variant="tertiary"
            onPress={() => startGameWithWord(civWord, spyWord)} 
            disabled={!civWord || !spyWord}
            className={(!civWord || !spyWord) ? 'opacity-50' : ''}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ImportKeywordsScreen;
