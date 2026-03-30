# Multi-Language Feature Implementation

## Overview
This document describes the implementation of multi-language support in the WhoIsSpy app following Expo's localization guide.

## Architecture

### Dependencies
- **i18n-js**: Core internationalization library
- **expo-localization**: Detect device locale
- **@react-native-async-storage/async-storage**: Persist language preference

### File Structure
```
WhoIsSpy/
├── locales/                    # Translation files
│   ├── en.json                 # English
│   ├── es.json                 # Spanish
│   ├── fr.json                 # French
│   └── zh.json                 # Chinese
├── utils/
│   └── i18n.ts                 # i18n configuration
├── store/slices/
│   └── settingsSlice.ts        # Settings state (language preference)
└── components/
    └── LanguageSelector/
        └── LanguageSelector.tsx # Language picker UI
```

## Implementation Details

### 1. Translation Files (locales/*.json)
All user-facing text is organized into logical sections:
- `common`: Shared buttons and labels
- `navigation`: Bottom navigation labels
- `home`: Home screen content
- `rules`: Rules screen content
- `manageGroups`: Player group management
- `gameConfig`: Game configuration screen
- `importKeywords`: Keyword selection
- `roleDistribution`: Role distribution screen
- `roleReveal`: Role reveal screen
- `discussion`: Discussion and voting screen
- `victory`: Victory screen
- `settings`: Settings screen
- `languages`: Language names

### 2. i18n Configuration (utils/i18n.ts)
Key features:
- Auto-detects device locale on first launch
- Falls back to English for missing translations
- Persists language preference to AsyncStorage
- Provides helper functions:
  - `t(key, options?)`: Translate a key
  - `setLanguage(code)`: Change app language
  - `loadLanguage()`: Load saved preference
  - `getCurrentLanguage()`: Get current language code
  - `getAvailableLanguages()`: List supported languages

### 3. Settings Slice (store/slices/settingsSlice.ts)
Manages app settings in Zustand store:
- `language`: Current language code
- `soundEnabled`: Sound effects toggle
- `setLanguage()`: Update language in store and i18n
- `toggleSound()`: Toggle sound effects
- `initializeSettings()`: Load saved preferences on app start

### 4. Language Selector Component
Beautiful modal UI for selecting language:
- Displays language names in native script
- Shows flag emojis for visual recognition
- Highlights currently selected language
- Saves preference automatically

## Usage Guide

### For Developers

#### Adding New Text
1. Add key-value pairs to all translation files (en.json, es.json, fr.json, zh.json)
2. Use the `t()` function in components:
```typescript
import { t } from '@/utils/i18n';

// Simple translation
<Text>{t('common.continue')}</Text>

// With interpolation
<Text>{t('home.greeting', { name: playerName })}</Text>
```

#### Force Re-render on Language Change
Subscribe to language state to trigger re-renders:
```typescript
import { useStore } from '@/store';

const MyComponent = () => {
  const language = useStore((state) => state.language);
  
  return <Text>{t('common.hello')}</Text>;
};
```

#### Adding New Languages
1. Create new translation file in `locales/` (e.g., `de.json` for German)
2. Add language to `utils/i18n.ts`:
```typescript
import de from '../locales/de.json';

const i18n = new I18n({
  en, es, fr, zh, de, // Add here
});
```
3. Add to `getAvailableLanguages()`:
```typescript
{ code: 'de', name: 'German', nativeName: 'Deutsch' }
```
4. Add flag emoji to LanguageSelector component

### For Users

#### Changing Language
1. Go to Home screen
2. Scroll down to language selector
3. Tap to open language selection modal
4. Select desired language
5. App updates immediately

#### Supported Languages
- 🇬🇧 English
- 🇪🇸 Español (Spanish)
- 🇫🇷 Français (French)
- 🇨🇳 中文 (Chinese)

## Implementation Status

### ✅ Completed
- [x] Install dependencies (i18n-js, expo-localization, async-storage)
- [x] Create translation files for 4 languages
- [x] Implement i18n configuration utility
- [x] Create settings slice for language state
- [x] Update store to include settings
- [x] Create LanguageSelector component
- [x] Initialize i18n in app/_layout.tsx
- [x] Update HomeScreen with translations
- [x] Update BottomNavigation with translations

### 🚧 Remaining Work
To fully implement translations across the app, update these screens:
- [ ] RulesScreen (screens/Home/RulesScreen.tsx)
- [ ] ManageGroupsScreen (screens/Setup/ManageGroupsScreen.tsx)
- [ ] GameConfigScreen (screens/Setup/GameConfigScreen.tsx)
- [ ] ImportKeywordsScreen (screens/Setup/ImportKeywordsScreen.tsx)
- [ ] RoleDistributionScreen (screens/Game/RoleDistributionScreen.tsx)
- [ ] RoleRevealScreen (screens/Game/RoleRevealScreen.tsx)
- [ ] DiscussionVotingScreen (screens/Game/DiscussionVotingScreen.tsx)
- [ ] VictoryScreen (screens/Game/VictoryScreen.tsx)

### Update Pattern
For each screen:
1. Import: `import { t } from '@/utils/i18n';`
2. Import: `import { useStore } from '@/store';`
3. Subscribe: `const language = useStore((state) => state.language);`
4. Replace hardcoded text with `{t('section.key')}`

Example:
```typescript
// Before
<Text>START MISSION</Text>

// After
<Text>{t('home.startMission')}</Text>
```

## Testing

### Manual Testing Checklist
- [ ] App starts in device language (if supported) or English
- [ ] Language selector opens and displays all languages
- [ ] Changing language updates UI immediately
- [ ] Language preference persists after app restart
- [ ] All text displays correctly in each language
- [ ] No missing translations (fallback to English works)

### Test Cases
1. **First Launch**: Should detect device locale
2. **Language Switch**: All screens should update
3. **App Restart**: Should remember language choice
4. **Missing Translation**: Should fallback to English
5. **RTL Languages**: (Future) Test if adding Arabic/Hebrew

## Best Practices

### Translation Keys
- Use descriptive, hierarchical keys: `screen.section.element`
- Group related translations under same parent
- Keep keys in English for consistency

### Translation Content
- Keep text concise and clear
- Avoid hardcoded values (dates, numbers)
- Use interpolation for dynamic content
- Consider text length variations across languages

### Performance
- Translations are loaded once on app start
- Language changes are instant (no network required)
- AsyncStorage is async but fast

## Future Enhancements

### Potential Additions
1. **More Languages**: German, Japanese, Portuguese, etc.
2. **RTL Support**: Arabic, Hebrew
3. **Dynamic Content**: Translate keywords from database
4. **Crowdsourcing**: Community translations via platform
5. **A/B Testing**: Test different phrasings
6. **Context Awareness**: Formal vs informal based on region

### Maintenance
- Review translations with native speakers
- Update all language files when adding features
- Track untranslated keys in production
- Consider translation management platform (Phrase, Lokalise)

## Resources

- [Expo Localization Docs](https://docs.expo.dev/guides/localization/)
- [i18n-js Documentation](https://github.com/fnando/i18n-js)
- [React Native i18n Guide](https://reactnative.dev/docs/localization)
- [AsyncStorage Docs](https://react-native-async-storage.github.io/async-storage/)

## Troubleshooting

### Issue: Translations not updating
**Solution**: Ensure component subscribes to language state:
```typescript
const language = useStore((state) => state.language);
```

### Issue: Missing translation warning
**Solution**: Add translation key to all language files or check for typos

### Issue: Language not persisting
**Solution**: Verify AsyncStorage is properly configured and not cleared

### Issue: Wrong language on first launch
**Solution**: Check device locale settings and supported language list

## Credits

Implementation follows Expo's official localization guide and best practices from the React Native community.
