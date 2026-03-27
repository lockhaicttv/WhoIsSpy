import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  className?: string; // nativewind prop
}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <View className={`bg-white rounded-full px-6 py-4 shadow-sm border border-gray-100 ${className}`}>
      <TextInput 
        className="text-lg text-black"
        placeholderTextColor="#a8aeac"
        {...props} 
      />
    </View>
  );
};
export default Input;
