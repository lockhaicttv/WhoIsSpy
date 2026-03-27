import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#e0fee1]">
      <View className="w-full flex-row items-center justify-between px-6 py-4 bg-[#e0fee1]">
        <TouchableOpacity className="p-2 -ml-2">
          <Ionicons name="menu" size={28} color="#006b1b" />
        </TouchableOpacity>
        <Text className="font-extrabold tracking-tighter uppercase text-2xl text-[#006b1b]">
          WHO IS SPY?
        </Text>
        <View className="w-10 h-10 rounded-full bg-[#bee7c1] items-center justify-center overflow-hidden border-2 border-[#006b1b]/10">
          <Ionicons name="person" size={20} color="#006b1b" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Hero Image Section */}
        <View className="w-full mb-12 -rotate-1">
          <View className="absolute inset-0 bg-[#c6ecc8] rounded-xl rotate-2 translate-x-2 translate-y-2 opacity-50" style={{ width: '100%', height: '100%' }} />
          <View className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-white" 
                style={{ 
                  shadowColor: '#1b3420',
                  shadowOffset: { width: 12, height: 12 },
                  shadowOpacity: 0.08,
                  shadowRadius: 24,
                  elevation: 8
                }}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=800&q=80' }}
              className="w-full h-full"
              resizeMode="cover"
            >
              <LinearGradient
                colors={['transparent', 'rgba(27, 52, 32, 0.4)']}
                className="absolute inset-0"
              />
              <View className="absolute bottom-4 left-4 flex-row items-center gap-2 bg-[#f9e534] px-4 py-2 rounded-full -rotate-2"
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 6
                    }}>
                <Ionicons name="alert-circle" size={16} color="#5b5300" />
                <Text className="font-bold text-[10px] tracking-widest text-[#5b5300] uppercase">TOP SECRET INTEL</Text>
              </View>
            </ImageBackground>
          </View>
        </View>

        {/* Headline Area */}
        <View className="items-center mb-12 relative">
          <View className="absolute -top-8 -left-8 -rotate-[15deg] opacity-20">
            <Ionicons name="finger-print" size={80} color="#1b3420" />
          </View>
          <Text className="font-black text-5xl text-[#1b3420] text-center leading-tight uppercase tracking-tighter">
            WHO IS <Text className="text-[#006b1b] italic">SPY?</Text>
          </Text>
          <Text className="text-lg text-[#47624b] mt-4 text-center max-w-sm">
            Trust no one. Question everything. Find the infiltrator before they reveal your location.
          </Text>
        </View>

        {/* Action Grid */}
        <View className="w-full gap-6 pb-32">
          <Button 
            label="START MISSION" 
            onPress={() => router.push('/manage-groups')}
            icon="play"
          />

          <Card variant="secondary" rotated className="mt-2">
            <View className="absolute top-4 right-6 opacity-10">
              <Ionicons name="people" size={64} color="#5b5300" />
            </View>
            <View className="flex-col gap-4">
              <View className="w-12 h-12 rounded-full bg-[#5b5300]/10 items-center justify-center">
                <Ionicons name="people" size={24} color="#5b5300" />
              </View>
              <View>
                <Text className="font-bold text-xl text-[#5b5300] uppercase tracking-tight">
                  PLAY WITH FRIENDS
                </Text>
                <Text className="text-sm text-[#5b5300]/70 mt-1">
                  Create a room and invite your squad for local or remote play.
                </Text>
              </View>
            </View>
          </Card>

          <Card variant="container-high" rotated={false} className="-rotate-1">
            <View className="absolute top-4 right-6 opacity-10">
              <Ionicons name="book" size={64} color="#1b3420" />
            </View>
            <View className="flex-col gap-4">
              <View className="w-12 h-12 rounded-full bg-[#47624b]/10 items-center justify-center">
                <Ionicons name="help-circle" size={24} color="#47624b" />
              </View>
              <View>
                <Text className="font-bold text-xl text-[#1b3420] uppercase tracking-tight">
                  RULES & HOW TO PLAY
                </Text>
                <Text className="text-sm text-[#47624b] mt-1">
                  New recruit? Learn the basics of espionage and deduction.
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 w-full flex-row justify-around items-center px-4 pb-6 pt-3 bg-[#e0fee1] rounded-t-[32px] border-t-2 border-[#d8f9d9]"
            style={{
              shadowColor: '#1b3420',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 8
            }}>
        <TouchableOpacity className="flex-col items-center justify-center bg-[#006b1b] rounded-full px-5 py-2"
                          style={{ borderBottomWidth: 4, borderBottomColor: '#005d16' }}>
          <Ionicons name="game-controller" size={24} color="#e0fee1" />
          <Text className="text-[10px] font-bold tracking-widest mt-1 text-[#e0fee1] uppercase">Missions</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-col items-center justify-center opacity-70 px-4 py-2">
          <Ionicons name="document-text" size={24} color="#1b3420" />
          <Text className="text-[10px] font-bold tracking-widest mt-1 text-[#1b3420] uppercase">Intel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-col items-center justify-center opacity-70 px-4 py-2">
          <Ionicons name="settings" size={24} color="#1b3420" />
          <Text className="text-[10px] font-bold tracking-widest mt-1 text-[#1b3420] uppercase">Briefing</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
