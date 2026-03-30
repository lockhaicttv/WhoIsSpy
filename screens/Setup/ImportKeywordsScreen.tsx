import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useStore } from '../../store';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { Ionicons } from '@expo/vector-icons';
import { getKeywordStats } from '../../db/keywordService';

const ImportKeywordsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ numSpies?: string; numBlanks?: string }>();
  const getRandomKeyword = useStore((state) => state.getRandomKeyword);
  const loadKeywords = useStore((state) => state.loadKeywords);
  const setWords = useStore((state) => state.setWords);
  const assignRoles = useStore((state) => state.assignRoles);
  const setPhase = useStore((state) => state.setPhase);

  const [civWord, setCivWord] = useState('');
  const [spyWord, setSpyWord] = useState('');
  const [stats, setStats] = useState({ total: 0, available: 0, locked: 0, free: 0, premium: 0 });

  // Get the configured number of spies and blanks
  const numSpies = params.numSpies ? parseInt(params.numSpies) : 1;
  const numBlanks = params.numBlanks ? parseInt(params.numBlanks) : 0;

  useEffect(() => {
    // Load keywords and stats
    loadKeywords();
    const keywordStats = getKeywordStats();
    setStats(keywordStats);
  }, []);

  const startGameWithWord = (civ: string, spy: string) => {
    setWords(civ, spy);
    assignRoles(numSpies, numBlanks); 
    setPhase('role_distribution');
    router.push('/role-distribution');
  };

  const handleRandom = () => {
    const random = getRandomKeyword();
    if (random) startGameWithWord(random.civilian, random.spy);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#e0fee1]" edges={['bottom']}>
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        
        {/* Stats Card */}
        <Card variant="secondary" className="mb-6">
          <View className="flex-row items-center gap-3 mb-4">
            <Ionicons name="stats-chart" size={24} color="#5b5300" />
            <Text className="text-xl font-black text-[#5b5300] tracking-tight uppercase">Keyword Pool</Text>
          </View>
          
          <View className="flex-row justify-between items-center bg-[#f9e534]/30 rounded-xl p-4">
            <View className="flex-col items-center flex-1">
              <Text className="text-3xl font-black text-[#006b1b]">{stats.available}</Text>
              <Text className="text-[10px] font-bold text-[#47624b] uppercase mt-1">Available</Text>
            </View>
            
            <View className="w-px h-12 bg-[#5b5300]/20" />
            
            <View className="flex-col items-center flex-1">
              <Text className="text-3xl font-black text-[#ff9800]">{stats.locked}</Text>
              <Text className="text-[10px] font-bold text-[#47624b] uppercase mt-1">Locked</Text>
            </View>
            
            <View className="w-px h-12 bg-[#5b5300]/20" />
            
            <View className="flex-col items-center flex-1">
              <Text className="text-3xl font-black text-[#1b3420]">{stats.total}</Text>
              <Text className="text-[10px] font-bold text-[#47624b] uppercase mt-1">Total</Text>
            </View>
          </View>

          {stats.locked > 0 && (
            <TouchableOpacity 
              onPress={() => router.push('/store' as any)}
              className="mt-3 bg-[#ff9800] px-4 py-3 rounded-full flex-row items-center justify-center gap-2"
              style={{ borderBottomWidth: 3, borderBottomColor: '#874e00' }}
            >
              <Ionicons name="lock-open" size={16} color="#4a2800" />
              <Text className="text-xs font-bold text-[#4a2800] uppercase">
                Unlock {stats.locked} More Keywords
              </Text>
            </TouchableOpacity>
          )}
        </Card>

        <Card variant="primary" className="mb-8 items-center bg-[#91f78e]">
          <View className="w-16 h-16 rounded-full bg-[#006b1b]/10 items-center justify-center mb-4">
            <Ionicons name="shuffle" size={32} color="#005d16" />
          </View>
          <Text className="text-3xl font-black mb-2 text-center text-[#00480f] tracking-tight">RANDOM TOPIC</Text>
          <Text className="text-center text-[#00691a] mb-8 text-sm font-bold opacity-80">
            Let HQ assign a classified keyword pair from the secured vault.
          </Text>
          <Button
            label="RANDOMIZE"
            variant="primary"
            icon="shuffle"
            className="w-full"
            onPress={handleRandom}
          />
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
