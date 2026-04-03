import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { PACKAGE_NAMES, PREMIUM_PACKAGES } from '../../constants/defaultKeywords';
import {
    getKeywordStats,
    getUserPurchases,
    unlockPackage
} from '../../db/keywordService';

interface PackageInfo {
  id: string;
  name: string;
  description: string;
  keywordCount: number;
  price: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const PACKAGES: PackageInfo[] = [
  {
    id: PREMIUM_PACKAGES.ADVANCED,
    name: PACKAGE_NAMES[PREMIUM_PACKAGES.ADVANCED],
    description: 'Challenging keywords for experienced players',
    keywordCount: 200,
    price: '$2.99',
    icon: 'trophy',
    color: '#ff9800',
  },
  {
    id: PREMIUM_PACKAGES.CULTURE,
    name: PACKAGE_NAMES[PREMIUM_PACKAGES.CULTURE],
    description: 'Historical figures, landmarks, and cultural terms',
    keywordCount: 250,
    price: '$2.99',
    icon: 'globe',
    color: '#006b1b',
  },
  {
    id: PREMIUM_PACKAGES.SCIENCE,
    name: PACKAGE_NAMES[PREMIUM_PACKAGES.SCIENCE],
    description: 'Science, math, astronomy, and educational keywords',
    keywordCount: 200,
    price: '$2.99',
    icon: 'flask',
    color: '#874e00',
  },
  {
    id: PREMIUM_PACKAGES.ENTERTAINMENT,
    name: PACKAGE_NAMES[PREMIUM_PACKAGES.ENTERTAINMENT],
    description: 'Movies, TV shows, games, music, and pop culture',
    keywordCount: 300,
    price: '$3.99',
    icon: 'film',
    color: '#b02500',
  },
  {
    id: PREMIUM_PACKAGES.ULTIMATE,
    name: PACKAGE_NAMES[PREMIUM_PACKAGES.ULTIMATE],
    description: 'Get ALL premium packs (950 keywords) at best value!',
    keywordCount: 950, // All 4 packs combined
    price: '$9.99',
    icon: 'diamond',
    color: '#665c00',
  },
  {
    id: PREMIUM_PACKAGES.CUSTOM_KEYWORDS,
    name: PACKAGE_NAMES[PREMIUM_PACKAGES.CUSTOM_KEYWORDS],
    description: 'Import your own keyword pairs from Excel files',
    keywordCount: 0,
    price: '$1.99',
    icon: 'create',
    color: '#006b1b',
  },
];

const StoreScreen = () => {
  const [stats, setStats] = useState({ total: 0, available: 0, locked: 0, free: 0, premium: 0 });
  const [unlockedPackages, setUnlockedPackages] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const keywordStats = getKeywordStats();
    setStats(keywordStats);
    
    const purchases = getUserPurchases();
    setUnlockedPackages(purchases.map(p => p.packageId));
  };

  const handleUnlock = (packageInfo: PackageInfo) => {
    // Skip if keyword count is 0 (not implemented yet), unless it's the custom keywords pack
    if (packageInfo.keywordCount === 0 && packageInfo.id !== PREMIUM_PACKAGES.CUSTOM_KEYWORDS) {
      Alert.alert(
        'Coming Soon',
        `${packageInfo.name} is not yet available. Stay tuned for updates!`,
        [{ text: 'OK' }]
      );
      return;
    }

    // Simulate purchase
    Alert.alert(
      'Unlock Package',
      `Do you want to unlock "${packageInfo.name}" for ${packageInfo.price}?\n\n(Demo: This will unlock for free)`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unlock Now',
          onPress: () => {
            try {
              // If unlocking Ultimate Pack, unlock all premium packs
              if (packageInfo.id === PREMIUM_PACKAGES.ULTIMATE) {
                unlockPackage(PREMIUM_PACKAGES.ADVANCED, PACKAGE_NAMES[PREMIUM_PACKAGES.ADVANCED]);
                unlockPackage(PREMIUM_PACKAGES.CULTURE, PACKAGE_NAMES[PREMIUM_PACKAGES.CULTURE]);
                unlockPackage(PREMIUM_PACKAGES.SCIENCE, PACKAGE_NAMES[PREMIUM_PACKAGES.SCIENCE]);
                unlockPackage(PREMIUM_PACKAGES.ENTERTAINMENT, PACKAGE_NAMES[PREMIUM_PACKAGES.ENTERTAINMENT]);
                unlockPackage(packageInfo.id, packageInfo.name);
              } else {
                unlockPackage(packageInfo.id, packageInfo.name);
              }
              
              Alert.alert('Success!', `${packageInfo.name} has been unlocked!`);
              loadData();
            } catch (error) {
              Alert.alert('Error', 'Failed to unlock package');
            }
          },
        },
      ]
    );
  };

  const isUnlocked = (packageId: string) => unlockedPackages.includes(packageId);

  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1" edges={['bottom']}>
        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
          
          {/* Header Stats */}
          <Card variant="primary" className="mb-8">
            <View className="flex-row items-center gap-3 mb-4">
              <Ionicons name="library" size={28} color="#005d16" />
              <Text className="text-2xl font-black text-[#00480f] tracking-tight uppercase">Your Collection</Text>
            </View>
            
            <View className="bg-[#c7f0cd]/40 rounded-xl p-4">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-sm font-bold text-[#47624b]">Available Keywords</Text>
                <Text className="text-3xl font-black text-[#006b1b]">{stats.available}</Text>
              </View>
              
              <View className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
                <View 
                  className="h-full bg-[#006b1b] rounded-full"
                  style={{ width: `${(stats.available / (stats.total || 1)) * 100}%` }}
                />
              </View>
              
              <Text className="text-xs text-[#47624b] mt-2 text-center">
                {stats.available} of {stats.total} keywords unlocked
              </Text>
            </View>
          </Card>

          {/* Package Cards */}
          <View className="mb-4">
            <Text className="text-xl font-black text-[#1b3420] mb-4 uppercase tracking-tight">
              Premium Packages
            </Text>
          </View>

          <View className="w-full gap-6 pb-32">
            {PACKAGES.map((pkg, index) => {
              const unlocked = isUnlocked(pkg.id);
              
              return (
                <Card 
                  key={pkg.id} 
                  variant="surface" 
                  className={index % 2 === 0 ? 'rotate-1' : '-rotate-1'}
                >
                  <View className="relative">
                    {/* Unlocked Badge */}
                    {unlocked && (
                      <View className="absolute -top-2 -right-2 bg-[#006b1b] rounded-full px-3 py-1 flex-row items-center gap-1 z-10"
                            style={{
                              shadowColor: '#1b3420',
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.2,
                              shadowRadius: 4,
                              elevation: 3
                            }}>
                        <Ionicons name="checkmark-circle" size={14} color="#d1ffc8" />
                        <Text className="text-[10px] font-bold text-[#d1ffc8] uppercase">Unlocked</Text>
                      </View>
                    )}

                    <View className="flex-row items-start gap-4 mb-4">
                      <View 
                        className="w-16 h-16 rounded-2xl items-center justify-center"
                        style={{ backgroundColor: `${pkg.color}20` }}
                      >
                        <Ionicons name={pkg.icon} size={32} color={pkg.color} />
                      </View>
                      
                      <View className="flex-1">
                        <Text className="font-black text-xl text-[#1b3420] mb-1 uppercase tracking-tight">
                          {pkg.name}
                        </Text>
                        <View className="flex-row items-center gap-2">
                          <View className="bg-[#d8f9d9] px-2 py-1 rounded-full">
                            <Text className="text-[10px] font-bold text-[#006b1b] uppercase">
                              {pkg.id === PREMIUM_PACKAGES.CUSTOM_KEYWORDS ? 'Unlimited' : `+${pkg.keywordCount} Keywords`}
                            </Text>
                          </View>
                          {!unlocked && (
                            <View className="bg-[#f9e534] px-2 py-1 rounded-full">
                              <Text className="text-[10px] font-bold text-[#5b5300] uppercase">
                                {pkg.price}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>

                    <Text className="text-sm text-[#47624b] mb-4">
                      {pkg.description}
                    </Text>

                    {!unlocked ? (
                      <Button
                        label={pkg.keywordCount === 0 && pkg.id !== PREMIUM_PACKAGES.CUSTOM_KEYWORDS ? "Coming Soon" : "Unlock Now"}
                        variant="primary"
                        size="small"
                        icon={pkg.keywordCount === 0 && pkg.id !== PREMIUM_PACKAGES.CUSTOM_KEYWORDS ? "time" : "lock-open"}
                        onPress={() => handleUnlock(pkg)}
                        disabled={pkg.keywordCount === 0 && pkg.id !== PREMIUM_PACKAGES.CUSTOM_KEYWORDS}
                        className={pkg.keywordCount === 0 && pkg.id !== PREMIUM_PACKAGES.CUSTOM_KEYWORDS ? 'opacity-50' : ''}
                      />
                    ) : (
                      <View className="bg-[#d8f9d9] px-6 py-3 rounded-full flex-row items-center justify-center gap-2">
                        <Ionicons name="checkmark-circle" size={20} color="#006b1b" />
                        <Text className="font-bold text-sm text-[#006b1b] uppercase">Owned</Text>
                      </View>
                    )}
                  </View>
                </Card>
              );
            })}
          </View>

          {/* Info Card */}
          <Card variant="secondary" className="mb-32 -rotate-1">
            <View className="flex-row items-start gap-3">
              <Ionicons name="information-circle" size={24} color="#5b5300" />
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#5b5300] mb-2">
                  Demo Mode Active
                </Text>
                <Text className="text-xs text-[#5b5300]/70">
                  This is a demonstration. In the full version, packages will be available for purchase through your app store.
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

export default StoreScreen;
