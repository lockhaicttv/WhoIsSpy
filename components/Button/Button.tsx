import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  className?: string; // nativewind
  icon?: keyof typeof Ionicons.glyphMap;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  variant = 'primary',
  size = 'large',
  className = '', 
  icon,
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-[#f9e534]'; // secondary-container
      case 'tertiary':
        return 'bg-[#ff9800]'; // tertiary-container
      case 'primary':
      default:
        return 'bg-[#006b1b]'; // primary
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'secondary':
        return 'text-[#5b5300]'; // on-secondary-container
      case 'tertiary':
        return 'text-[#4a2800]'; // on-tertiary-container
      case 'primary':
      default:
        return 'text-[#d1ffc8]'; // on-primary
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'secondary':
        return '#5b5300';
      case 'tertiary':
        return '#4a2800';
      case 'primary':
      default:
        return '#d1ffc8';
    }
  };

  const shadowColor = () => {
    switch (variant) {
      case 'secondary': return '#665c00';
      case 'tertiary': return '#874e00';
      case 'primary': default: return '#005d16';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: 'py-3 px-6',
          iconSize: 20,
          textSize: 'text-sm',
          borderWidth: 3,
          gap: 'gap-2'
        };
      case 'medium':
        return {
          padding: 'py-4 px-8',
          iconSize: 24,
          textSize: 'text-lg',
          borderWidth: 3,
          gap: 'gap-3'
        };
      case 'large':
      default:
        return {
          padding: 'py-6 px-12',
          iconSize: 32,
          textSize: 'text-2xl',
          borderWidth: 4,
          gap: 'gap-4'
        };
    }
  };

  const sizeConfig = getSizeStyles();

  return (
    <Pressable className='w-full' {...props}>
      {({ pressed }) => (
        <View 
          className={`${sizeConfig.padding} rounded-full flex flex-row items-center justify-center ${sizeConfig.gap} ${getVariantStyles()} ${className}`}
          style={[
            {
              borderBottomWidth: pressed ? 0 : sizeConfig.borderWidth,
              borderBottomColor: shadowColor(),
              transform: [{ translateY: pressed ? sizeConfig.borderWidth : 0 }],
              opacity: props.disabled ? 0.5 : 1
            }
          ]}
        >
          {icon && <Ionicons name={icon} size={sizeConfig.iconSize} color={getIconColor()} />}
          <Text className={`font-bold ${sizeConfig.textSize} tracking-tight uppercase leading-snug ${getTextColor()}`}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
};
export default Button;
