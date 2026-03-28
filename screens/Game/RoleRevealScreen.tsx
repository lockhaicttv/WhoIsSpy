import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  const isSpy = player.role === 'spy';

  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1 flex-col">
      {/* Header */}
      <View className="flex-row items-center gap-3 px-6 py-4">
        <Ionicons name="menu" size={28} color="#006b1b" />
        <Text className="font-bold tracking-tight uppercase text-sm text-[#006b1b]">WHO IS SPY?</Text>
        <View className="flex-1" />
        <View className="w-8 h-8 rounded-full bg-[#bee7c1] border-2 border-[#91f78e] overflow-hidden">
          <Ionicons name="person" size={16} color="#006b1b" />
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Decorative Background Blurs */}
        <View className="absolute top-1/4 -left-12 w-48 h-48 bg-[#d8f9d9] rounded-full opacity-50" style={{ filter: 'blur(48px)' }} />
        <View className="absolute bottom-1/4 -right-12 w-64 h-64 bg-[#91f78e] rounded-full opacity-20" style={{ filter: 'blur(48px)' }} />

        <View className="w-full max-w-md flex-col items-center">
          {/* Badge */}
          <View className="mb-8 text-center">
            <View className="bg-[#c6ecc8] px-4 py-1.5 rounded-full">
              <Text className="font-bold text-xs tracking-widest text-[#47624b] uppercase">
                MISSION ASSIGNED
              </Text>
            </View>
          </View>

          {/* The Sticky Note */}
          <Card 
            variant="secondary" 
            className="w-full aspect-square p-8 items-center justify-center -rotate-1"
          >
            {!revealed ? (
              <>
                <View className="mb-6">
                  <Ionicons name="eye-off" size={64} color="#5b5300" style={{ opacity: 0.2 }} />
                </View>
                <Text className="font-bold text-[#5b5300]/60 tracking-tighter text-lg mb-2 uppercase">
                  TAP TO REVEAL
                </Text>
                <Text className="text-[#5b5300] font-medium text-sm max-w-[200px] leading-relaxed text-center">
                  Ensure perimeter is secure before viewing.
                </Text>
              </>
            ) : (
              <>
                <View className="mb-6">
                  <Ionicons name="eye" size={64} color="#5b5300" style={{ opacity: 0.2 }} />
                </View>
                <Text className="font-bold text-[#5b5300]/60 tracking-tighter text-lg mb-2 uppercase">
                  YOU ARE THE
                </Text>
                <Text className="font-black text-5xl md:text-6xl text-[#5b5300] tracking-tight leading-none mb-6 uppercase">
                  {isSpy ? 'SPY' : 'CIVILIAN'}
                </Text>
                <View className="w-16 h-1 bg-[#5b5300]/10 rounded-full mb-8" />
                <Text className="text-4xl font-black text-[#006b1b] text-center mb-6 tracking-tighter uppercase">
                  {getRoleWord()}
                </Text>
                <Text className="text-[#5b5300] font-medium text-sm max-w-[200px] leading-relaxed text-center">
                  {isSpy 
                    ? 'Blend in with the civilians and discover the secret location before they find you.' 
                    : 'Work with other civilians to identify the spy among you.'}
                </Text>
              </>
            )}
          </Card>

          {/* Hint Cards */}
          {revealed && (
            <View className="mt-8 w-full grid grid-cols-2 gap-4 flex-row">
              <View className="flex-1 bg-[#d8f9d9] p-4 rounded-lg flex-col gap-2 mr-2">
                <Ionicons name="bulb" size={20} color="#006b1b" />
                <Text className="text-[10px] font-bold text-[#47624b] uppercase">Strategy</Text>
                <Text className="text-xs font-semibold text-[#1b3420]">
                  {isSpy ? 'Be vague but confident.' : 'Ask specific questions.'}
                </Text>
              </View>
              <View className="flex-1 bg-[#d8f9d9] p-4 rounded-lg flex-col gap-2 ml-2">
                <Ionicons name="warning" size={20} color="#ff9800" />
                <Text className="text-[10px] font-bold text-[#47624b] uppercase">Caution</Text>
                <Text className="text-xs font-semibold text-[#1b3420]">
                  {isSpy ? 'Watch your wording.' : 'Stay alert to lies.'}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Footer */}
      <View className="w-full flex-col items-center px-6 pb-24 gap-6">
        {!revealed ? (
          <Button 
            label="TAP TO SHOW INTEL" 
            variant="secondary" 
            onPress={() => setRevealed(true)} 
          />
        ) : (
          <>
            <Button 
              label="READY" 
              variant="primary" 
              onPress={handleUnderstand}
              icon="arrow-forward"
            />
            <Text className="text-[10px] text-[#47624b]/60 uppercase tracking-widest text-center">
              Wait for others to confirm their roles
            </Text>
          </>
        )}
      </View>

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
          <Text className="text-[10px] font-medium tracking-wide mt-0.5 text-[#e0fee1] uppercase">Game</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-col items-center justify-center opacity-70 px-4 py-2">
          <Ionicons name="people" size={24} color="#1b3420" />
          <Text className="text-[10px] font-medium tracking-wide mt-1 text-[#1b3420] uppercase">Players</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-col items-center justify-center opacity-70 px-4 py-2">
          <Ionicons name="document-text" size={24} color="#1b3420" />
          <Text className="text-[10px] font-medium tracking-wide mt-1 text-[#1b3420] uppercase">Rules</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default RoleRevealScreen;
