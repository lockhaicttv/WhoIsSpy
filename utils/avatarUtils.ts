// Avatar utility for consistent player icons across the app
// Using face icons similar to Material Symbols in the HTML design

import { MaterialCommunityIcons } from '@expo/vector-icons';

// Material-style face icons that match the HTML design (face_2, face_3, face_4, face_5, face_6)
// Using MaterialCommunityIcons' emoticon variants as closest match
export const getAvatarIcon = (index: number): keyof typeof MaterialCommunityIcons.glyphMap => {
  const avatars: Array<keyof typeof MaterialCommunityIcons.glyphMap> = [
    'emoticon-happy-outline',      // Face 1
    'emoticon-cool-outline',       // Face 2 (sunglasses)
    'emoticon-excited-outline',    // Face 3
    'emoticon-outline',            // Face 4
    'emoticon-wink-outline',       // Face 5
    'emoticon-tongue-outline',     // Face 6
    'emoticon-neutral-outline',    // Face 7
    'face-agent',                  // Face 8 (spy themed!)
    'emoticon-devil-outline',      // Face 9
    'emoticon-kiss-outline',       // Face 10
    'emoticon-lol-outline',        // Face 11
    'emoticon-sad-outline',        // Face 12
  ];
  return avatars[index % avatars.length];
};

export const getAvatarColor = (index: number): string => {
  const colors = [
    '#006b1b',  // Primary Green
    '#ff9800',  // Tertiary Orange
    '#665c00',  // Secondary Dark
    '#874e00',  // Tertiary Dark
    '#005d16',  // Primary Dark
    '#b02500',  // Error Red
  ];
  return colors[index % colors.length];
};

export const getAvatarBgColor = (index: number): string => {
  const bgColors = [
    '#d8f9d9',  // Surface container low
    '#f9e534',  // Secondary container
    '#c6ecc8',  // Surface container high
    '#ff9800',  // Tertiary container
    '#91f78e',  // Primary container
    '#f95630',  // Error container
  ];
  return bgColors[index % bgColors.length];
};
