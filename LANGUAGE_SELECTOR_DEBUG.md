# Language Selector Not Showing Options - Troubleshooting

## Issue
Language selector modal opens but shows no language options.

## Debug Version Applied

I've added debug logging to the LanguageSelector component to help identify the issue.

### What Was Added

1. **Console Logging**
   ```typescript
   console.log('Available languages:', languages);
   console.log('Languages count:', languages.length);
   console.log('Current language:', currentLanguage);
   ```

2. **Debug Info in Modal**
   - Shows language count in the modal
   - Displays error message if no languages found

3. **Empty State Handling**
   - Shows red warning if `languages.length === 0`

## How to Diagnose

### Step 1: Start the app and check console
```bash
npm start
```

### Step 2: Open the language selector
- Tap the language selector button on home screen
- Check the console output

### Expected Console Output
```
Available languages: Array(4) [...]
Languages count: 4
Current language: en
Opening language modal
```

### Step 3: Look at the modal
- If you see "Debug: 4 languages loaded" → Languages are loading correctly
- If you see "Debug: 0 languages loaded" → Problem with getAvailableLanguages()
- If you see red "No languages found!" → Array is empty

## Common Causes & Solutions

### Cause 1: Module Import Issue
**Problem:** `getAvailableLanguages` not importing correctly

**Check:**
```typescript
// In LanguageSelector.tsx
import { getAvailableLanguages, t } from '../../utils/i18n';
```

**Solution:** Verify the path is correct and i18n.ts exports the function

### Cause 2: Array Not Rendering
**Problem:** React Native not rendering the array items

**Symptoms:**
- Console shows "Languages count: 4"
- But no items visible in modal

**Solution:** Check for styling issues hiding the items

### Cause 3: Modal Not Opening
**Problem:** Modal `visible` state not updating

**Symptoms:**
- Console shows "Opening language modal"
- But modal doesn't appear

**Solution:** Check if other UI elements are covering the modal

### Cause 4: ScrollView Issue
**Problem:** ScrollView has no height

**Solution:** Ensure parent View has proper flex styling

### Cause 5: Translation Keys Missing
**Problem:** `t('settings.language')` returns undefined and breaks rendering

**Check:** Verify these keys exist in locales/en.json:
```json
{
  "settings": {
    "language": "Language",
    "selectLanguage": "Select Language"
  }
}
```

## Quick Tests

### Test 1: Check getAvailableLanguages directly
Add to HomeScreen.tsx temporarily:
```typescript
import { getAvailableLanguages } from '../../utils/i18n';

const HomeScreen = () => {
  const langs = getAvailableLanguages();
  console.log('Direct call:', langs);
  // ...
}
```

### Test 2: Hardcode languages
In LanguageSelector.tsx, temporarily replace:
```typescript
const languages = getAvailableLanguages();
```

With:
```typescript
const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
];
```

If this works, the issue is with `getAvailableLanguages()`.

### Test 3: Check Modal Visibility
Add to console when modal opens:
```typescript
onPress={() => {
  console.log('Modal visible:', modalVisible);
  setModalVisible(true);
  console.log('Modal should be visible now');
}}
```

## What to Look For in Console

### ✅ Good Output
```
Available languages: [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' }
]
Languages count: 4
Current language: en
Opening language modal
```

### ❌ Bad Output
```
Available languages: []
Languages count: 0
Current language: undefined
```

Or:
```
Available languages: undefined
Error: Cannot read property 'length' of undefined
```

## Possible Fixes

### Fix 1: If languages array is empty
**Edit utils/i18n.ts:**
```typescript
export const getAvailableLanguages = () => {
  const langs = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
  ];
  console.log('getAvailableLanguages called, returning:', langs);
  return langs;
};
```

### Fix 2: If modal not appearing
**Check for z-index issues:**
```typescript
<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
  statusBarTranslucent={true} // Add this
>
```

### Fix 3: If items not rendering
**Check ScrollView:**
```typescript
<ScrollView 
  className="flex-1" 
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ flexGrow: 1 }} // Add this
>
```

## Next Steps

1. **Run the app** and check console output
2. **Share the console logs** to identify the exact issue
3. **Check the modal** for the debug info
4. **Try the quick tests** above

## After Diagnosis

Once you identify the issue from the console logs:
1. Report which console messages you see
2. Report if the debug info shows in modal
3. Report if languages count is 0 or 4

Then I can provide the exact fix needed!

## Remove Debug Code

After fixing, remove these debug additions:
1. Remove `console.log` statements
2. Remove "Debug: X languages loaded" text
3. Remove the red error message component

But keep for now to help diagnose!
