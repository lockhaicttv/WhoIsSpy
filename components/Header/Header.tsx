import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store';

interface HeaderConfig {
  title: string;
  showBackButton: boolean;
  rightIcon?: 'person' | 'settings' | 'avatar' | 'victory-avatar';
}

const routeConfigs: Record<string, HeaderConfig> = {
  '/': {
    title: 'WHO IS SPY?',
    showBackButton: false,
    rightIcon: 'avatar',
  },
  '/manage-groups': {
    title: 'OPERATIVES',
    showBackButton: true,
    rightIcon: 'person',
  },
  '/game-config': {
    title: 'GAME SETUP',
    showBackButton: true,
    rightIcon: 'settings',
  },
  '/import-keywords': {
    title: 'KEYWORDS',
    showBackButton: true,
    rightIcon: 'settings',
  },
  '/role-distribution': {
    title: 'Who is Spy',
    showBackButton: true,
    rightIcon: 'person',
  },
  '/role-reveal': {
    title: 'WHO IS SPY?',
    showBackButton: false,
    rightIcon: 'person',
  },
  '/discussion-voting': {
    title: 'WHO IS SPY?',
    showBackButton: false,
    rightIcon: 'person',
  },
  '/victory': {
    title: 'WHO IS SPY?',
    showBackButton: false,
    rightIcon: 'victory-avatar',
  },
};

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const winner = useStore((state) => state.winner);
  
  const config = routeConfigs[pathname] || {
    title: 'WHO IS SPY?',
    showBackButton: true,
    rightIcon: 'person' as const,
  };

  const renderRightIcon = () => {
    const baseClass = "w-10 h-10 rounded-full items-center justify-center overflow-hidden border-2";
    
    if (config.rightIcon === 'victory-avatar') {
      const isBlankWin = winner === 'blank';
      const isCivsWin = winner === 'civilians';
      
      return (
        <View className={`${baseClass} bg-[#bee7c1] border-[#91f78e]`}>
          <Image 
            source={isBlankWin
              ? require('../../assets/images/victory-blank-avatar.png')
              : isCivsWin 
                ? require('../../assets/images/victory-civs-avatar.png')
                : require('../../assets/images/victory-spies-avatar.png')
            }
            className="w-full h-full object-cover"
            resizeMode="cover"
          />
        </View>
      );
    }
    
    if (config.rightIcon === 'avatar') {
      return (
        <View className={`${baseClass} bg-[#bee7c1] border-[#006b1b]/10`}>
          <Image 
            source={require('../../assets/images/avatar-user.png')} 
            className="w-full h-full object-cover"
            resizeMode="cover"
          />
        </View>
      );
    }
    
    if (config.rightIcon === 'settings') {
      return (
        <View className={`${baseClass} bg-[#91f78e] border-[#006b1b]`}>
          <Ionicons name="settings" size={20} color="#006b1b" />
        </View>
      );
    }
    
    // person icon (default)
    return (
      <View className={`${baseClass} bg-[#bee7c1] border-[#006b1b]`}>
        <Ionicons name="person" size={20} color="#006b1b" />
      </View>
    );
  };

  const renderLeftButton = () => {
    if (config.showBackButton) {
      return (
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={28} color="#006b1b" />
        </TouchableOpacity>
      );
    }
    
    // Menu icon for home
    return (
      <TouchableOpacity className="p-2 -ml-2">
        <Ionicons name="menu" size={28} color="#006b1b" />
      </TouchableOpacity>
    );
  };

  // Different styles for different screens
  const isHome = pathname === '/';
  const isRoleReveal = pathname === '/role-reveal';
  const isDiscussionVoting = pathname === '/discussion-voting';
  const isVictory = pathname === '/victory';
  
  const getTitleClass = () => {
    if (isHome) {
      return 'font-extrabold tracking-tighter uppercase text-2xl text-[#006b1b]';
    }
    if (isRoleReveal || isVictory) {
      return 'font-bold tracking-tight uppercase text-sm text-[#006b1b]';
    }
    if (isDiscussionVoting) {
      return 'text-2xl font-black text-[#006b1b] tracking-tighter uppercase';
    }
    // Default for setup screens
    return 'font-black tracking-tight uppercase text-2xl text-[#1b3420]';
  };

  const getContainerClass = () => {
    if (isHome) {
      return 'w-full flex-row items-center justify-between px-6 py-4 bg-[#e0fee1]';
    }
    if (isRoleReveal || isDiscussionVoting || isVictory) {
      return 'w-full flex-row items-center gap-3 px-6 py-4 h-16';
    }
    // Default for setup screens
    return 'flex-row justify-between items-center px-6 py-4 z-40 bg-[#e0fee1]';
  };

  // For role-distribution, use a different layout
  if (pathname === '/role-distribution') {
    return (
      <View className="flex-row items-center gap-4 px-6 py-4 bg-[#e0fee1]">
        {renderLeftButton()}
        <Text className="font-bold tracking-tight text-[#006b1b] text-xl">{config.title}</Text>
        <View className="flex-1" />
        {renderRightIcon()}
      </View>
    );
  }

  // For discussion-voting and victory, add flex-1 spacer
  if (isDiscussionVoting || isVictory) {
    return (
      <View className={getContainerClass()}>
        <Ionicons name="menu" size={28} color="#006b1b" />
        <Text className={getTitleClass()}>{config.title}</Text>
        <View className="flex-1" />
        {renderRightIcon()}
      </View>
    );
  }

  // For role-reveal, add flex-1 spacer and different icon size
  if (isRoleReveal) {
    return (
      <View className={getContainerClass()}>
        <Ionicons name="menu" size={28} color="#006b1b" />
        <Text className={getTitleClass()}>{config.title}</Text>
        <View className="flex-1" />
        <View className="w-8 h-8 rounded-full bg-[#bee7c1] border-2 border-[#91f78e] overflow-hidden">
          <Ionicons name="person" size={16} color="#006b1b" />
        </View>
      </View>
    );
  }

  // Default layout for most screens
  return (
    <View className={getContainerClass()}>
      {renderLeftButton()}
      <Text className={getTitleClass()}>{config.title}</Text>
      {renderRightIcon()}
    </View>
  );
};

export default Header;
