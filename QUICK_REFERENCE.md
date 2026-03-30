# Quick Reference - Multi-Language Feature

## 🚀 Quick Start

### Use translations in any component:
```typescript
import { t } from '@/utils/i18n';
import { useStore } from '@/store';

const MyComponent = () => {
  const language = useStore((state) => state.language);
  return <Text>{t('common.continue')}</Text>;
};
```

## 📋 Common Translation Keys

### Buttons & Actions
```typescript
t('common.continue')      // CONTINUE
t('common.back')          // BACK
t('common.cancel')        // CANCEL
t('common.confirm')       // CONFIRM
t('common.ready')         // READY
t('common.start')         // START
t('common.playAgain')     // PLAY AGAIN
t('common.vote')          // VOTE
```

### Game Elements
```typescript
t('common.spy')           // Spy
t('common.spies')         // Spies
t('common.civilian')      // Civilian
t('common.civilians')     // Civilians
t('common.blank')         // Blank
t('common.players')       // Players
```

### Navigation
```typescript
t('navigation.missions')  // Missions
t('navigation.players')   // Players
t('navigation.rules')     // Rules
t('navigation.store')     // Store
```

## 🔧 Utility Functions

### Get current language
```typescript
import { getCurrentLanguage } from '@/utils/i18n';
const lang = getCurrentLanguage(); // "en", "es", "fr", "zh"
```

### Change language
```typescript
import { useStore } from '@/store';
const setLanguage = useStore((state) => state.setLanguage);
await setLanguage('es'); // Switch to Spanish
```

### Check available languages
```typescript
import { getAvailableLanguages } from '@/utils/i18n';
const languages = getAvailableLanguages();
// [{ code: 'en', name: 'English', nativeName: 'English' }, ...]
```

## 📁 File Locations

### Translation Files
```
locales/
├── en.json    # English (default)
├── es.json    # Spanish
├── fr.json    # French
└── zh.json    # Chinese
```

### Core Files
```
utils/i18n.ts                              # i18n config
store/slices/settingsSlice.ts              # Settings state
components/LanguageSelector/               # Language picker UI
```

## ✏️ Adding New Translations

### Step 1: Add to ALL language files
```json
// locales/en.json
{
  "myScreen": {
    "title": "My Title",
    "subtitle": "My Subtitle"
  }
}

// locales/es.json
{
  "myScreen": {
    "title": "Mi Título",
    "subtitle": "Mi Subtítulo"
  }
}

// ... repeat for fr.json and zh.json
```

### Step 2: Use in component
```typescript
<Text>{t('myScreen.title')}</Text>
<Text>{t('myScreen.subtitle')}</Text>
```

## 🎯 Translation Key Patterns

### Naming Convention
```
screen.section.element
```

### Examples
```typescript
t('home.title')              // Home screen title
t('rules.overview')          // Rules overview section
t('gameConfig.numSpies')     // Game config spy count
t('victory.playAgain')       // Victory screen button
```

## 🔄 Re-render on Language Change

### Always subscribe to language state:
```typescript
const MyScreen = () => {
  // This is required for re-rendering when language changes
  const language = useStore((state) => state.language);
  
  return (
    <View>
      <Text>{t('common.hello')}</Text>
    </View>
  );
};
```

## 🌍 Supported Languages

| Code | Language | Native Name | Flag |
|------|----------|-------------|------|
| en   | English  | English     | 🇬🇧   |
| es   | Spanish  | Español     | 🇪🇸   |
| fr   | French   | Français    | 🇫🇷   |
| zh   | Chinese  | 中文        | 🇨🇳   |

## 🐛 Troubleshooting

### Text not updating?
✅ Make sure component subscribes to language state:
```typescript
const language = useStore((state) => state.language);
```

### Missing translation warning?
✅ Add key to ALL language files (en, es, fr, zh)

### Language not persisting?
✅ Check AsyncStorage permissions

## 📚 Full Documentation

- **MULTI_LANGUAGE_README.md** - Overview and summary
- **LOCALIZATION_IMPLEMENTATION.md** - Complete technical guide
- **TRANSLATION_EXAMPLE.md** - Step-by-step screen update guide
- **ARCHITECTURE_DIAGRAM.md** - System architecture

## 💡 Pro Tips

1. **Always add keys to all language files** to avoid fallback warnings
2. **Use descriptive key names** that indicate content and location
3. **Keep key structure consistent** across all translation files
4. **Test with long text** (German, French) to check layout
5. **Use interpolation** for dynamic content: `t('key', { name: value })`

## ⚡ Quick Commands

```bash
# Check JSON validity
Get-Content locales/en.json | ConvertFrom-Json

# Count translation keys
(Get-Content locales/en.json | ConvertFrom-Json | ConvertTo-Json -Depth 10).Length

# Search for translation usage
Select-String -Path "screens/**/*.tsx" -Pattern "t\('.*'\)"
```

---

**Need help?** Check the full documentation files or search for `t('` in existing code for examples!
