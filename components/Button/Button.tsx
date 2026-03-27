import React from 'react';
import { Text, Pressable, PressableProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string; // nativewind
  icon?: keyof typeof Ionicons.glyphMap;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  variant = 'primary', 
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

  return (
    <Pressable {...props}>
      {({ pressed }) => (
        <View 
          className={`w-full py-6 px-12 rounded-full flex flex-row items-center justify-center gap-4 ${getVariantStyles()} ${className}`}
          style={[
            {
              borderBottomWidth: pressed ? 0 : 4,
              borderBottomColor: shadowColor(),
              transform: [{ translateY: pressed ? 4 : 0 }],
              opacity: props.disabled ? 0.5 : 1
            }
          ]}
        >
          {icon && <Ionicons name={icon} size={32} color={getIconColor()} />}
          <Text className={`font-bold text-2xl tracking-tight uppercase ${getTextColor()}`}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
};
export default Button;
