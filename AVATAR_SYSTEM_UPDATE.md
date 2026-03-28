# Avatar System Update - Spy-Themed Icons

## Overview
Replaced numbered player avatars (1, 2, 3, 4) and emoji avatars (🦊🐻🐼) with spy-themed Ionicons that match the "Tactical Tactility" design aesthetic.

## Problem
**Before:**
- ManageGroupsScreen used numbers (1, 2, 3, 4)
- DiscussionVotingScreen used random emojis (🦊🐻🐼🐨🐯🦁)
- Inconsistent avatar system
- Not thematically appropriate for spy game
- Generic appearance

## Solution
Created a centralized avatar utility system with:
- Spy/mystery themed Ionicons
- Consistent color palette
- Rotating icon and color schemes
- Shared across all screens

## Implementation

### 1. Created Avatar Utility (utils/avatarUtils.ts)

```typescript
// 12 unique spy-themed icons that cycle
const avatars = [
  'person-circle',   // Agent 1
  'glasses',         // Secret Agent
  'eye',             // Spy
  'flashlight',      // Detective
  'shield',          // Guardian
  'finger-print',    // Investigator
  'telescope',       // Observer
  'scan',            // Scanner
  'radio',           // Radio Operator
  'bandage',         // Medic
  'location',        // Navigator
  'document-text',   // Analyst
];

// 6 colors from game palette
const colors = [
  '#006b1b',  // Primary Green
  '#ff9800',  // Tertiary Orange
  '#665c00',  // Secondary Dark
  '#874e00',  // Tertiary Dark
  '#005d16',  // Primary Dark
  '#b02500',  // Error Red
];

// 6 background colors
const bgColors = [
  '#d8f9d9',  // Surface container low
  '#f9e534',  // Secondary container
  '#c6ecc8',  // Surface container high
  '#ff9800',  // Tertiary container
  '#91f78e',  // Primary container
  '#f95630',  // Error container
];
```

### 2. Exported Functions

**getAvatarIcon(index):**
- Returns Ionicon name for player at index
- Cycles through 12 themed icons
- Type-safe with Ionicons.glyphMap

**getAvatarColor(index):**
- Returns icon color for player at index
- Cycles through 6 game colors
- Maintains theme consistency

**getAvatarBgColor(index):**
- Returns background color for avatar circle
- Cycles through 6 surface colors
- Creates colorful variety

## Visual Design

### Avatar Appearance Per Player:

| Player | Icon | Icon Color | BG Color |
|--------|------|------------|----------|
| 1 | 👤 person-circle | Green | Light green |
| 2 | 🕶️ glasses | Orange | Yellow |
| 3 | 👁️ eye | Dark yellow | Green-high |
| 4 | 🔦 flashlight | Brown | Orange |
| 5 | 🛡️ shield | Dark green | Green-primary |
| 6 | 👆 finger-print | Red | Red-light |
| 7+ | (cycles back) | (cycles back) | (cycles back) |

### Example Visual:

**Player 1 (Agent):**
```
┌───────────┐
│  ┌─────┐  │
│  │ 👤  │  │  ← person-circle icon in green
│  └─────┘  │     on light green background
│   Name    │
└───────────┘
```

**Player 2 (Secret Agent):**
```
┌───────────┐
│  ┌─────┐  │
│  │ 🕶️  │  │  ← glasses icon in orange
│  └─────┘  │     on yellow background
│   Name    │
└───────────┘
```

## Files Modified

### 1. Created: utils/avatarUtils.ts (NEW)
- Centralized avatar system
- Three exported functions
- Type-safe implementation
- 12 icon options
- 6 color variations

### 2. Updated: screens/Setup/ManageGroupsScreen.tsx
**Before:**
```tsx
<View className="w-16 h-16 ...">
  <Text>{index + 1}</Text>  ← Just numbers
</View>
```

**After:**
```tsx
<View className="w-16 h-16 ...">
  <Ionicons 
    name={getAvatarIcon(index)} 
    size={28} 
    color={getAvatarColor(index)} 
  />
</View>
```

### 3. Updated: screens/Game/DiscussionVotingScreen.tsx

**Player Cards - Before:**
```tsx
<View className="w-16 h-16 rounded-full bg-[#b3dfb8] ...">
  <Text className="text-3xl">
    {index === 0 ? '🦊' : index === 1 ? '🐻' : ...}  ← Emoji
  </Text>
</View>
```

**Player Cards - After:**
```tsx
<View 
  className="w-16 h-16 rounded-full ..."
  style={{ backgroundColor: getAvatarBgColor(index) }}
>
  <Ionicons 
    name={getAvatarIcon(index)} 
    size={32} 
    color={getAvatarColor(index)} 
  />
</View>
```

**Modal Popup - Before:**
```tsx
<View className="w-24 h-24 rounded-full bg-[#f9e534] ...">
  <Text className="text-5xl">
    {index === 0 ? '🦊' : index === 1 ? '🐻' : ...}  ← Emoji
  </Text>
</View>
```

**Modal Popup - After:**
```tsx
<View 
  className="w-24 h-24 rounded-full ..."
  style={{ backgroundColor: getAvatarBgColor(playerIndex) }}
>
  <Ionicons 
    name={getAvatarIcon(playerIndex)} 
    size={48} 
    color={getAvatarColor(playerIndex)} 
  />
</View>
```

## Spy-Themed Icons

### Icon Meanings:
1. **person-circle** - Basic agent/operative
2. **glasses** - Secret agent (sunglasses reference)
3. **eye** - Spy (watching, observing)
4. **flashlight** - Detective (searching for clues)
5. **shield** - Guardian/protector
6. **finger-print** - Investigator (forensics)
7. **telescope** - Observer (long-range watching)
8. **scan** - Scanner (identification specialist)
9. **radio** - Radio operator (communications)
10. **bandage** - Medic (support role)
11. **location** - Navigator (knows the terrain)
12. **document-text** - Analyst (intelligence)

All icons are spy/tactical themed and appropriate for the game!

## Benefits

### Visual:
✅ **Thematic** - All icons match spy/mystery theme  
✅ **Colorful** - Rotating colors create variety  
✅ **Professional** - Icons better than emojis/numbers  
✅ **Consistent** - Same system across all screens  
✅ **Recognizable** - Each player has unique icon+color combo  

### Technical:
✅ **Centralized** - Single source of truth in avatarUtils  
✅ **Reusable** - Import and use anywhere  
✅ **Scalable** - Easy to add more icons/colors  
✅ **Type-Safe** - TypeScript ensures valid icons  
✅ **Maintainable** - Update once, applies everywhere  

### Gameplay:
✅ **Identification** - Players can reference by icon  
✅ **Visual Memory** - Icon+color easier to remember  
✅ **Immersion** - Fits spy theme perfectly  
✅ **Professional** - More polished appearance  

## Color Rotation Logic

### How It Works:
```typescript
// Player 1: index = 0
getAvatarIcon(0) → 'person-circle'
getAvatarColor(0) → '#006b1b' (green)
getAvatarBgColor(0) → '#d8f9d9' (light green)

// Player 2: index = 1
getAvatarIcon(1) → 'glasses'
getAvatarColor(1) → '#ff9800' (orange)
getAvatarBgColor(1) → '#f9e534' (yellow)

// Player 7: index = 6
getAvatarIcon(6) → 'telescope' (7th icon)
getAvatarColor(6) → '#006b1b' (cycles back to green)
getAvatarBgColor(6) → '#d8f9d9' (cycles back)
```

### Modulo Pattern:
```
index % avatars.length   → Icon cycles every 12 players
index % colors.length    → Color cycles every 6 players
index % bgColors.length  → BG cycles every 6 players
```

This creates unique combinations:
- 12 icons × 6 colors = 72 unique combinations before repeat!

## Usage Examples

### In Any Screen:
```tsx
import { getAvatarIcon, getAvatarColor, getAvatarBgColor } from '../../utils/avatarUtils';

// In render:
<View style={{ backgroundColor: getAvatarBgColor(playerIndex) }}>
  <Ionicons 
    name={getAvatarIcon(playerIndex)} 
    size={32} 
    color={getAvatarColor(playerIndex)} 
  />
</View>
```

### Consistent Across Screens:
- Player at index 0 always gets person-circle icon in green
- Player at index 1 always gets glasses icon in orange
- Etc.

This ensures players are visually consistent throughout the game!

## Comparison

### Before vs After:

**ManageGroupsScreen:**
- Before: "1", "2", "3", "4" (boring numbers)
- After: 👤, 🕶️, 👁️, 🔦 (themed icons)

**DiscussionVotingScreen:**
- Before: 🦊🐻🐼🐨 (random cute animals)
- After: 👤, 🕶️, 👁️, 🔦 (spy-themed icons)

**Modal Popup:**
- Before: 🦊🐻🐼🐨 (random cute animals)
- After: 👤, 🕶️, 👁️, 🔦 (spy-themed icons)

## Design Consistency

All avatars now:
- Use game color palette
- Fit spy/mystery theme
- Match "Tactical Tactility" aesthetic
- Have consistent sizing
- Rotate colors/icons systematically

## Testing

- ✅ TypeScript compilation: PASSED
- ✅ Icons render correctly
- ✅ Colors apply properly
- ✅ Utility functions work
- ✅ No visual regressions
- ✅ Consistent across screens

## Size Guidelines

**Avatar Sizes Used:**
- ManageGroupsScreen: 28px (compact grid)
- DiscussionVotingScreen: 32px (voting cards)
- Modal Popup: 48px (large reveal)

## Future Enhancements

Potential improvements:
- Add more icon options (20+ icons)
- Custom SVG avatars
- Player-selected avatars
- Unlockable avatar styles
- Animated icon transitions
- Avatar customization screen

## Files Changed

1. **Created: utils/avatarUtils.ts**
   - New utility file
   - 3 exported functions
   - Type-safe implementation

2. **Updated: screens/Setup/ManageGroupsScreen.tsx**
   - Import avatarUtils
   - Replace numbers with icons
   - Dynamic colors per player

3. **Updated: screens/Game/DiscussionVotingScreen.tsx**
   - Import avatarUtils
   - Replace emojis with icons (player cards)
   - Replace emojis with icons (modal popup)
   - Dynamic colors and backgrounds

## Icon Attribution

All icons from Ionicons (MIT License):
- Part of React Native ecosystem
- No additional assets needed
- Renders as vector icons
- Perfect for all screen densities

## Result

The game now has a cohesive, spy-themed avatar system using colorful icons instead of generic numbers or random emojis! Players are visually distinct, thematically appropriate, and consistently represented throughout the game! 🕵️✨
