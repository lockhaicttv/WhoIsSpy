import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../../utils/i18n';
import { useStore } from '../../store';

const BottomNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  // Subscribe to language changes to trigger re-render
  const language = useStore((state) => state.language);

  const navItems = [
    {
      route: '/',
      icon: 'game-controller' as keyof typeof Ionicons.glyphMap,
      label: t('navigation.missions'),
    },
    {
      route: '/manage-groups',
      icon: 'people' as keyof typeof Ionicons.glyphMap,
      label: t('navigation.players'),
    },
    {
      route: '/rules',
      icon: 'book' as keyof typeof Ionicons.glyphMap,
      label: t('navigation.rules'),
    },
    {
      route: '/store',
      icon: 'cart' as keyof typeof Ionicons.glyphMap,
      label: t('navigation.store'),
    },
  ];

  const isActive = (route: string) => pathname === route;

  return (
    <View 
      className="w-full flex-row justify-around items-center px-4 pb-6 pt-3 bg-[#e0fee1] rounded-t-[32px] border-t-2 border-[#d8f9d9]"
      style={{
        shadowColor: '#1b3420',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      {navItems.map((item) => {
        const active = isActive(item.route);
        
        return (
          <TouchableOpacity
            key={item.route}
            onPress={() => router.push(item.route as any)}
            className={`flex-col items-center justify-center px-5 py-2 ${
              active ? 'bg-[#006b1b] rounded-full' : 'opacity-70'
            }`}
            style={active ? { borderBottomWidth: 4, borderBottomColor: '#005d16' } : {}}
          >
            <Ionicons 
              name={item.icon} 
              size={24} 
              color={active ? '#e0fee1' : '#1b3420'} 
            />
            <Text 
              className={`text-[8px] font-bold mt-0.5 uppercase ${
                active ? 'text-[#e0fee1]' : 'text-[#1b3420]'
              }`}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;
