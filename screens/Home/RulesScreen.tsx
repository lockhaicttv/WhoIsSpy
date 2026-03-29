import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card/Card';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';

const RulesScreen = () => {
  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1" edges={['bottom']}>
        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 rounded-full bg-[#d8f9d9] items-center justify-center mb-6"
                  style={{
                    shadowColor: '#1b3420',
                    shadowOffset: { width: 8, height: 8 },
                    shadowOpacity: 0.1,
                    shadowRadius: 16,
                    elevation: 4
                  }}>
              <Ionicons name="book" size={48} color="#006b1b" />
            </View>
            
            <Text className="font-black text-4xl text-[#1b3420] text-center leading-tight uppercase tracking-tighter mb-3">
              HOW TO PLAY
            </Text>
            
            <Text className="text-base text-[#47624b] text-center max-w-sm">
              Master the art of deception and deduction
            </Text>
          </View>

          {/* Game Overview */}
          <Card variant="primary" className="mb-6 rotate-1">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#006b1b]/10 items-center justify-center">
                <Ionicons name="information-circle" size={24} color="#006b1b" />
              </View>
              <Text className="font-bold text-2xl text-[#00480f] uppercase tracking-tight">
                Overview
              </Text>
            </View>
            <Text className="text-base text-[#47624b] leading-relaxed">
              Who Is Spy is a social deduction game where players receive secret keywords. Most players get the same word (civilians), but some get a different word (spies). The goal is to find the spies through discussion without revealing your own word.
            </Text>
          </Card>

          {/* Setup */}
          <Card variant="secondary" className="mb-6 -rotate-1">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#5b5300]/10 items-center justify-center">
                <Ionicons name="settings" size={24} color="#5b5300" />
              </View>
              <Text className="font-bold text-2xl text-[#5b5300] uppercase tracking-tight">
                Setup
              </Text>
            </View>
            <View className="gap-3">
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#5b5300] text-lg">1.</Text>
                <Text className="flex-1 text-base text-[#5b5300]/80 leading-relaxed">
                  Add at least 3 players to start the game
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#5b5300] text-lg">2.</Text>
                <Text className="flex-1 text-base text-[#5b5300]/80 leading-relaxed">
                  Configure the number of spies (must be less than civilians)
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#5b5300] text-lg">3.</Text>
                <Text className="flex-1 text-base text-[#5b5300]/80 leading-relaxed">
                  Optionally add blank cards for advanced gameplay
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#5b5300] text-lg">4.</Text>
                <Text className="flex-1 text-base text-[#5b5300]/80 leading-relaxed">
                  Choose or randomly select a keyword pair
                </Text>
              </View>
            </View>
          </Card>

          {/* Roles */}
          <Card variant="container-high" className="mb-6 rotate-2">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#47624b]/10 items-center justify-center">
                <Ionicons name="people" size={24} color="#47624b" />
              </View>
              <Text className="font-bold text-2xl text-[#1b3420] uppercase tracking-tight">
                Roles
              </Text>
            </View>
            
            {/* Civilian */}
            <View className="bg-[#d8f9d9] rounded-xl p-4 mb-3">
              <View className="flex-row items-center gap-2 mb-2">
                <Ionicons name="shield-checkmark" size={20} color="#006b1b" />
                <Text className="font-black text-lg text-[#006b1b] uppercase">Civilian</Text>
              </View>
              <Text className="text-sm text-[#47624b] leading-relaxed">
                Receives the majority keyword. Goal: Find and eliminate all spies through discussion and voting.
              </Text>
            </View>

            {/* Spy */}
            <View className="bg-[#fff0e5] rounded-xl p-4 mb-3">
              <View className="flex-row items-center gap-2 mb-2">
                <Ionicons name="eye" size={20} color="#ff9800" />
                <Text className="font-black text-lg text-[#ff9800] uppercase">Spy</Text>
              </View>
              <Text className="text-sm text-[#874e00] leading-relaxed">
                Receives a different keyword. Goal: Blend in with civilians and avoid detection. Spies win if they equal or outnumber civilians.
              </Text>
            </View>

            {/* Blank */}
            <View className="bg-[#f9e534]/20 rounded-xl p-4">
              <View className="flex-row items-center gap-2 mb-2">
                <Ionicons name="help-circle" size={20} color="#5b5300" />
                <Text className="font-black text-lg text-[#5b5300] uppercase">Blank</Text>
              </View>
              <Text className="text-sm text-[#5b5300]/80 leading-relaxed">
                Receives NO keyword. Goal: Listen carefully and guess the civilian word when eliminated. Wins alone if guess is correct!
              </Text>
            </View>
          </Card>

          {/* Gameplay */}
          <Card variant="primary" className="mb-6 -rotate-1">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#006b1b]/10 items-center justify-center">
                <Ionicons name="game-controller" size={24} color="#006b1b" />
              </View>
              <Text className="font-bold text-2xl text-[#00480f] uppercase tracking-tight">
                Gameplay
              </Text>
            </View>
            <View className="gap-3">
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#00480f] text-lg">1.</Text>
                <Text className="flex-1 text-base text-[#47624b] leading-relaxed">
                  <Text className="font-bold">View Keywords:</Text> Each player secretly views their keyword by tapping their card
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#00480f] text-lg">2.</Text>
                <Text className="flex-1 text-base text-[#47624b] leading-relaxed">
                  <Text className="font-bold">Discussion:</Text> Players take turns describing their word without being too obvious
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#00480f] text-lg">3.</Text>
                <Text className="flex-1 text-base text-[#47624b] leading-relaxed">
                  <Text className="font-bold">Voting:</Text> After discussion, vote to eliminate a suspected spy
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#00480f] text-lg">4.</Text>
                <Text className="flex-1 text-base text-[#47624b] leading-relaxed">
                  <Text className="font-bold">Blank Guess:</Text> If a blank player is eliminated, they can guess the civilian word to win
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="font-black text-[#00480f] text-lg">5.</Text>
                <Text className="flex-1 text-base text-[#47624b] leading-relaxed">
                  <Text className="font-bold">Repeat:</Text> Continue until a team wins
                </Text>
              </View>
            </View>
          </Card>

          {/* Winning Conditions */}
          <Card variant="tertiary" className="mb-6 rotate-1">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#4a2800]/10 items-center justify-center">
                <Ionicons name="trophy" size={24} color="#4a2800" />
              </View>
              <Text className="font-bold text-2xl text-[#4a2800] uppercase tracking-tight">
                How to Win
              </Text>
            </View>
            
            <View className="gap-3">
              <View className="bg-white/50 rounded-lg p-3">
                <Text className="font-black text-sm text-[#4a2800] uppercase mb-1">
                  🛡️ Civilians Win
                </Text>
                <Text className="text-sm text-[#4a2800]/80">
                  All spies are eliminated
                </Text>
              </View>
              
              <View className="bg-white/50 rounded-lg p-3">
                <Text className="font-black text-sm text-[#4a2800] uppercase mb-1">
                  🕵️ Spies Win
                </Text>
                <Text className="text-sm text-[#4a2800]/80">
                  Spies equal or outnumber civilians
                </Text>
              </View>
              
              <View className="bg-white/50 rounded-lg p-3">
                <Text className="font-black text-sm text-[#4a2800] uppercase mb-1">
                  ❓ Blank Wins
                </Text>
                <Text className="text-sm text-[#4a2800]/80">
                  Blank player correctly guesses the civilian word when eliminated (solo victory!)
                </Text>
              </View>
            </View>
          </Card>

          {/* Tips */}
          <Card variant="secondary" className="mb-32 -rotate-1">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#5b5300]/10 items-center justify-center">
                <Ionicons name="bulb" size={24} color="#5b5300" />
              </View>
              <Text className="font-bold text-2xl text-[#5b5300] uppercase tracking-tight">
                Pro Tips
              </Text>
            </View>
            <View className="gap-3">
              <View className="flex-row items-start gap-3">
                <Text className="text-[#5b5300]">💡</Text>
                <Text className="flex-1 text-sm text-[#5b5300]/80 leading-relaxed">
                  As a civilian, be specific enough to prove you know the word, but vague enough not to help spies
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="text-[#5b5300]">💡</Text>
                <Text className="flex-1 text-sm text-[#5b5300]/80 leading-relaxed">
                  As a spy, listen carefully to others' descriptions and try to blend in
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="text-[#5b5300]">💡</Text>
                <Text className="flex-1 text-sm text-[#5b5300]/80 leading-relaxed">
                  As a blank, gather clues from everyone to make an educated guess
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Text className="text-[#5b5300]">💡</Text>
                <Text className="flex-1 text-sm text-[#5b5300]/80 leading-relaxed">
                  Pay attention to hesitation, vague answers, or suspicious behavior
                </Text>
              </View>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
      
      {/* Bottom Navigation - Fixed at bottom */}
      <BottomNavigation />
    </View>
  );
};

export default RulesScreen;
