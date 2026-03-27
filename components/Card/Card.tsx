import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'surface' | 'container-high';
  rotated?: boolean;
}

const Card: React.FC<CardProps> = ({ className = '', children, variant = 'surface', rotated = false, ...props }) => {
  const getBgClass = () => {
    switch (variant) {
      case 'secondary': return 'bg-[#f9e534]'; // secondary-container
      case 'tertiary': return 'bg-[#ff9800]'; // tertiary-container
      case 'primary': return 'bg-[#91f78e]'; // primary-container
      case 'container-high': return 'bg-[#c6ecc8]'; // surface-container-high
      case 'surface': default: return 'bg-[#e0fee1]'; // surface
    }
  };

  return (
    <View 
      className={`p-6 rounded-2xl curled-corner ${getBgClass()} ${rotated ? '-rotate-1' : ''} ${className}`}
      style={{
        shadowColor: '#1b3420',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 0,
        elevation: 4,
        borderBottomRightRadius: 48, 
      }}
      {...props}
    >
      {children}
    </View>
  );
};
export default Card;
