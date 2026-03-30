# Example: How to Update RulesScreen with Translations

## Original Code (screens/Home/RulesScreen.tsx)

```typescript
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
// ... other imports

const RulesScreen = () => {
  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1" edges={['bottom']}>
        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View className="items-center mb-8">
            <Text className="font-black text-4xl text-[#1b3420] text-center leading-tight uppercase tracking-tighter mb-3">
              HOW TO PLAY
            </Text>
            
            <Text className="text-base text-[#47624b] text-center max-w-sm">
              Master the art of deception and deduction
            </Text>
          </View>
          
          {/* ... rest of the code */}
        </ScrollView>
      </SafeAreaView>
      
      <BottomNavigation />
    </View>
  );
};

export default RulesScreen;
```

## Updated Code with Translations

```typescript
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { t } from '../../utils/i18n';
import { useStore } from '../../store';
// ... other imports

const RulesScreen = () => {
  // Subscribe to language changes to trigger re-render
  const language = useStore((state) => state.language);

  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1" edges={['bottom']}>
        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View className="items-center mb-8">
            <Text className="font-black text-4xl text-[#1b3420] text-center leading-tight uppercase tracking-tighter mb-3">
              {t('rules.title')}
            </Text>
            
            <Text className="text-base text-[#47624b] text-center max-w-sm">
              {t('rules.subtitle')}
            </Text>
          </View>
          
          {/* Overview Card */}
          <Card variant="primary" className="mb-6 rotate-1">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#006b1b]/10 items-center justify-center">
                <Ionicons name="information-circle" size={24} color="#006b1b" />
              </View>
              <Text className="font-bold text-2xl text-[#00480f] uppercase tracking-tight">
                {t('rules.overview')}
              </Text>
            </View>
            <Text className="text-base text-[#47624b] leading-relaxed">
              {t('rules.overviewText')}
            </Text>
          </Card>
          
          {/* Roles Section */}
          <Card variant="container-high" className="mb-6 rotate-2">
            <View className="flex-row items-center gap-3 mb-4">
              <Text className="font-bold text-2xl text-[#1b3420] uppercase tracking-tight">
                {t('rules.roles')}
              </Text>
            </View>
            
            {/* Civilian */}
            <View className="bg-[#d8f9d9] rounded-xl p-4 mb-3">
              <View className="flex-row items-center gap-2 mb-2">
                <Ionicons name="shield-checkmark" size={20} color="#006b1b" />
                <Text className="font-black text-lg text-[#006b1b] uppercase">
                  {t('rules.civilianRole')}
                </Text>
              </View>
              <Text className="text-sm text-[#47624b] leading-relaxed">
                {t('rules.civilianDesc')}
              </Text>
            </View>

            {/* Spy */}
            <View className="bg-[#fff0e5] rounded-xl p-4 mb-3">
              <View className="flex-row items-center gap-2 mb-2">
                <Ionicons name="eye" size={20} color="#ff9800" />
                <Text className="font-black text-lg text-[#ff9800] uppercase">
                  {t('rules.spyRole')}
                </Text>
              </View>
              <Text className="text-sm text-[#874e00] leading-relaxed">
                {t('rules.spyDesc')}
              </Text>
            </View>

            {/* Blank */}
            <View className="bg-[#f9e534]/20 rounded-xl p-4">
              <View className="flex-row items-center gap-2 mb-2">
                <Ionicons name="help-circle" size={20} color="#5b5300" />
                <Text className="font-black text-lg text-[#5b5300] uppercase">
                  {t('rules.blankRole')}
                </Text>
              </View>
              <Text className="text-sm text-[#5b5300]/80 leading-relaxed">
                {t('rules.blankDesc')}
              </Text>
            </View>
          </Card>
          
          {/* ... rest of the cards follow the same pattern */}
        </ScrollView>
      </SafeAreaView>
      
      <BottomNavigation />
    </View>
  );
};

export default RulesScreen;
```

## Key Changes

1. **Import translations**:
   ```typescript
   import { t } from '../../utils/i18n';
   import { useStore } from '../../store';
   ```

2. **Subscribe to language state** (triggers re-render on language change):
   ```typescript
   const language = useStore((state) => state.language);
   ```

3. **Replace hardcoded text** with translation function:
   ```typescript
   // Before: <Text>HOW TO PLAY</Text>
   // After:  <Text>{t('rules.title')}</Text>
   ```

4. **Use consistent keys** from translation files (locales/en.json)

## Pattern for All Screens

### 1. Import Required Functions
```typescript
import { t } from '@/utils/i18n';
import { useStore } from '@/store';
```

### 2. Subscribe to Language State
```typescript
const MyScreen = () => {
  const language = useStore((state) => state.language);
  
  // ... component code
};
```

### 3. Replace Text
Find all hardcoded strings and replace with translation keys:
```typescript
{t('section.key')}
```

## Translation Key Reference

All available translation keys are in `/locales/en.json`:
- `common.*` - Shared buttons, labels
- `navigation.*` - Bottom nav items
- `home.*` - Home screen
- `rules.*` - Rules screen
- `manageGroups.*` - Player management
- `gameConfig.*` - Game configuration
- `importKeywords.*` - Keyword selection
- `roleDistribution.*` - Role distribution
- `roleReveal.*` - Role reveal
- `discussion.*` - Discussion & voting
- `victory.*` - Victory screen
- `settings.*` - Settings screen

## Testing After Changes

1. **Start the app**: `npm start`
2. **Change language**: Use language selector on home screen
3. **Verify updates**: Check that all text changes language
4. **Check all screens**: Navigate through app to verify
5. **Test persistence**: Close and reopen app to verify language is saved

## Tips

- Always add the same key to ALL language files (en, es, fr, zh)
- Use descriptive key names that indicate the content
- Keep key structure consistent: `screen.section.element`
- Test with long text (German, French) to check layout
- Use interpolation for dynamic content: `t('key', { name: value })`
