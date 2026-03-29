import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card/Card';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';

const StoreScreen = () => {
  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1" edges={['bottom']}>
        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
          {/* Coming Soon Section */}
          <View className="items-center mb-12 pt-12">
            <View className="w-32 h-32 rounded-full bg-[#d8f9d9] items-center justify-center mb-8"
                  style={{
                    shadowColor: '#1b3420',
                    shadowOffset: { width: 8, height: 8 },
                    shadowOpacity: 0.1,
                    shadowRadius: 16,
                    elevation: 4
                  }}>
              <Ionicons name="cart" size={64} color="#006b1b" style={{ opacity: 0.4 }} />
            </View>
            
            <Text className="font-black text-4xl text-[#1b3420] text-center leading-tight uppercase tracking-tighter mb-4">
              STORE
            </Text>
            
            <View className="bg-[#f9e534] px-6 py-2 rounded-full -rotate-1 mb-6"
                  style={{
                    shadowColor: '#1b3420',
                    shadowOffset: { width: 4, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 2
                  }}>
              <Text className="font-bold text-sm text-[#5b5300] uppercase tracking-widest">
                COMING SOON
              </Text>
            </View>
            
            <Text className="text-lg text-[#47624b] text-center max-w-sm px-4">
              Exciting features are in development. Stay tuned for keyword packs, themes, and more!
            </Text>
          </View>

          {/* Feature Cards */}
          <View className="w-full gap-6 pb-32">
            <Card variant="primary" rotated className="rotate-1">
              <View className="flex-row items-center gap-3 mb-4">
                <View className="w-12 h-12 rounded-full bg-[#006b1b]/10 items-center justify-center">
                  <Ionicons name="library" size={24} color="#006b1b" />
                </View>
                <Text className="font-bold text-xl text-[#00480f] uppercase tracking-tight flex-1">
                  Keyword Packs
                </Text>
              </View>
              <Text className="text-sm text-[#47624b]">
                Expand your game with themed keyword collections: Movies, Sports, Food, Technology, and more.
              </Text>
            </Card>

            <Card variant="secondary" rotated className="-rotate-1">
              <View className="flex-row items-center gap-3 mb-4">
                <View className="w-12 h-12 rounded-full bg-[#5b5300]/10 items-center justify-center">
                  <Ionicons name="color-palette" size={24} color="#5b5300" />
                </View>
                <Text className="font-bold text-xl text-[#5b5300] uppercase tracking-tight flex-1">
                  Theme Store
                </Text>
              </View>
              <Text className="text-sm text-[#5b5300]/70">
                Customize your game experience with unique visual themes and color schemes.
              </Text>
            </Card>

            <Card variant="container-high" rotated className="rotate-2">
              <View className="flex-row items-center gap-3 mb-4">
                <View className="w-12 h-12 rounded-full bg-[#47624b]/10 items-center justify-center">
                  <Ionicons name="star" size={24} color="#47624b" />
                </View>
                <Text className="font-bold text-xl text-[#1b3420] uppercase tracking-tight flex-1">
                  Premium Features
                </Text>
              </View>
              <Text className="text-sm text-[#47624b]">
                Unlock exclusive game modes, achievements, and advanced customization options.
              </Text>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
      
      {/* Bottom Navigation - Fixed at bottom */}
      <BottomNavigation />
    </View>
  );
};

export default StoreScreen;
