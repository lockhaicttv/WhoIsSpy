# Multi-Language Feature - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         App Initialization                       │
│                        (app/_layout.tsx)                         │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1. Initialize Database                                   │   │
│  │ 2. Load Sound Manager                                    │   │
│  │ 3. Load Language (loadLanguage())                        │   │
│  │    → Check AsyncStorage for saved preference             │   │
│  │    → Fallback to device locale or English                │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       i18n Configuration                         │
│                          (utils/i18n.ts)                         │
│                                                                   │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │   en.json      │  │   es.json      │  │   fr.json      │   │
│  │  (English)     │  │  (Spanish)     │  │  (French)      │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
│                      ┌────────────────┐                         │
│                      │   zh.json      │                         │
│                      │  (Chinese)     │                         │
│                      └────────────────┘                         │
│                                                                   │
│  Functions:                                                      │
│  • t(key) - Translate a key                                     │
│  • setLanguage(code) - Change language                          │
│  • loadLanguage() - Load saved preference                       │
│  • getCurrentLanguage() - Get current language                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Zustand Store                             │
│                    (store/slices/settingsSlice.ts)              │
│                                                                   │
│  State:                                                          │
│  • language: string (current language code)                     │
│  • soundEnabled: boolean                                        │
│                                                                   │
│  Actions:                                                        │
│  • setLanguage(lang) - Update language in store + i18n         │
│  • toggleSound() - Toggle sound effects                         │
│  • initializeSettings() - Load on app start                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       UI Components                              │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │              Language Selector Component                   │ │
│  │      (components/LanguageSelector/LanguageSelector.tsx)   │ │
│  │                                                            │ │
│  │  [  🇬🇧 English    ✓ ]                                    │ │
│  │  [  🇪🇸 Español      ]                                    │ │
│  │  [  🇫🇷 Français     ]                                    │ │
│  │  [  🇨🇳 中文         ]                                    │ │
│  │                                                            │ │
│  │  • Modal UI with language list                            │ │
│  │  • Highlights current selection                           │ │
│  │  • Calls setLanguage() on selection                       │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    Translated Screens                      │ │
│  │                                                            │ │
│  │  HomeScreen:                                              │ │
│  │    const language = useStore(state => state.language)     │ │
│  │    <Text>{t('home.title')}</Text>                         │ │
│  │                                                            │ │
│  │  BottomNavigation:                                        │ │
│  │    const language = useStore(state => state.language)     │ │
│  │    <Text>{t('navigation.missions')}</Text>                │ │
│  │                                                            │ │
│  │  [Other screens to be updated...]                         │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AsyncStorage                                │
│                                                                   │
│  Key: @whoisspy:language                                        │
│  Value: "en" | "es" | "fr" | "zh"                              │
│                                                                   │
│  • Persists language preference across app restarts             │
│  • Loaded on app initialization                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. App Start
```
App Launch
    ↓
Initialize i18n
    ↓
Load from AsyncStorage
    ↓
Set i18n.locale
    ↓
Update Zustand store
    ↓
Components render with t()
```

### 2. User Changes Language
```
User clicks language in selector
    ↓
Call setLanguage(code)
    ↓
Update i18n.locale
    ↓
Save to AsyncStorage
    ↓
Update Zustand store.language
    ↓
Components re-render (subscribed to language state)
    ↓
UI updates instantly
```

### 3. Component Translation
```
Component renders
    ↓
Subscribes to language state (useStore)
    ↓
Calls t('key') for each text
    ↓
i18n looks up translation in current locale
    ↓
Falls back to English if missing
    ↓
Returns translated string
    ↓
Displays in UI
```

## Component Integration Pattern

```typescript
import { t } from '@/utils/i18n';
import { useStore } from '@/store';

const MyScreen = () => {
  // This subscription triggers re-render when language changes
  const language = useStore((state) => state.language);
  
  return (
    <View>
      <Text>{t('section.key')}</Text>
    </View>
  );
};
```

## Translation Key Structure

```
locales/
├── en.json
│   ├── common { continue, back, cancel, ... }
│   ├── navigation { missions, players, rules, store }
│   ├── home { title, subtitle, startMission, ... }
│   ├── rules { title, overview, roles, ... }
│   ├── manageGroups { ... }
│   ├── gameConfig { ... }
│   ├── roleReveal { ... }
│   ├── discussion { ... }
│   ├── victory { ... }
│   └── settings { language, sound, ... }
└── [es, fr, zh].json (same structure)
```

## Benefits of This Architecture

✅ **Centralized**: All translations in one place  
✅ **Type-safe**: TypeScript checks translation keys  
✅ **Persistent**: Language choice saved automatically  
✅ **Fast**: No network requests, all local  
✅ **Fallback**: Missing translations default to English  
✅ **Reactive**: UI updates instantly on language change  
✅ **Scalable**: Easy to add new languages  
✅ **Standard**: Follows Expo/React Native best practices  

## Performance Considerations

- **Initial Load**: ~40KB for all translations (minimal)
- **Memory**: All translations loaded at once (negligible impact)
- **Language Switch**: Instant (no reload required)
- **AsyncStorage**: Async but fast (~1-5ms)
- **Re-renders**: Only components subscribed to language state

## Future Enhancements

1. **Lazy Loading**: Load language files on-demand
2. **RTL Support**: Add Arabic/Hebrew with RTL layout
3. **Pluralization**: Handle singular/plural forms
4. **Date/Number Formatting**: Locale-specific formatting
5. **Translation Management**: Use Phrase/Lokalise for team translations
6. **Translation Coverage**: Track untranslated keys in production
7. **A/B Testing**: Test different phrasings per region
