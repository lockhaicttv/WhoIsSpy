import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../../store';

interface HeaderConfig {
  title: string;
  showBackButton: boolean;
  rightIcon?: 'avatar' | 'victory-avatar';
}

const routeConfigs: Record<string, HeaderConfig> = {
  '/': {
    title: 'THE LAST SIGNAL',
    showBackButton: false,
    rightIcon: 'avatar',
  },
  '/profile': {
    title: 'PROFILE',
    showBackButton: false,
    rightIcon: 'avatar',
  },
  '/manage-groups': {
    title: 'OPERATIVES',
    showBackButton: true,
    rightIcon: 'avatar',
  },
  '/store': {
    title: 'STORE',
    showBackButton: false,
    rightIcon: 'avatar',
  },
  '/rules': {
    title: 'RULES',
    showBackButton: false,
    rightIcon: 'avatar',
  },
  '/game-config': {
    title: 'GAME SETUP',
    showBackButton: true,
    rightIcon: 'avatar',
  },
  '/import-keywords': {
    title: 'KEYWORDS',
    showBackButton: true,
    rightIcon: 'avatar',
  },
  '/role-distribution': {
    title: 'The Last Signal',
    showBackButton: true,
    rightIcon: 'avatar',
  },
  '/role-reveal': {
    title: 'THE LAST SIGNAL',
    showBackButton: false,
    rightIcon: 'avatar',
  },
  '/discussion-voting': {
    title: 'THE LAST SIGNAL',
    showBackButton: false,
    rightIcon: 'avatar',
  },
  '/victory': {
    title: 'THE LAST SIGNAL',
    showBackButton: false,
    rightIcon: 'victory-avatar',
  },
};

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const winner = useStore((state) => state.winner);
  
  const config = routeConfigs[pathname] || {
    title: 'THE LAST SIGNAL',
    showBackButton: true,
    rightIcon: 'avatar' as const,
  };

  const renderRightIcon = () => {
    const baseClass = "w-10 h-10 rounded-full items-center justify-center overflow-hidden border-2";
    
    // Default avatar - same display style as victory avatar
    return (
      <TouchableOpacity 
        onPress={() => router.push('/profile')}
        className={`${baseClass} bg-[#bee7c1] border-[#91f78e]`}
      >
        <Image 
          source={require('../../assets/images/victory-civs-avatar.png')} 
          className="w-full h-full object-cover"
          resizeMode="cover"
        />
      </TouchableOpacity>
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
    
    // Home icon instead of menu
    return (
      <TouchableOpacity onPress={() => router.push('/')} className="p-2 -ml-2">
        <Ionicons name="home" size={28} color="#006b1b" />
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
        <TouchableOpacity onPress={() => router.push('/')} className="p-2 -ml-2">
          <Ionicons name="home" size={28} color="#006b1b" />
        </TouchableOpacity>
        <Text className={getTitleClass()}>{config.title}</Text>
        <View className="flex-1" />
        {renderRightIcon()}
      </View>
    );
  }

  // For role-reveal, add flex-1 spacer
  if (isRoleReveal) {
    return (
      <View className={getContainerClass()}>
        <TouchableOpacity onPress={() => router.push('/')} className="p-2 -ml-2">
          <Ionicons name="home" size={28} color="#006b1b" />
        </TouchableOpacity>
        <Text className={getTitleClass()}>{config.title}</Text>
        <View className="flex-1" />
        {renderRightIcon()}
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
