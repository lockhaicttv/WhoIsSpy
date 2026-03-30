# Translation Implementation Checklist

## ✅ Phase 1: Foundation (COMPLETE)

- [x] Install dependencies (i18n-js, expo-localization, async-storage)
- [x] Create translation files for 4 languages
- [x] Build i18n configuration utility
- [x] Create settings slice for language state
- [x] Update store with settings
- [x] Create language selector component
- [x] Initialize i18n in app layout
- [x] Create comprehensive documentation

## ✅ Phase 2: Core Screens (4/10 COMPLETE)

- [x] HomeScreen - Full translation
- [x] BottomNavigation - Full translation
- [x] RulesScreen - Full translation
- [x] RoleRevealScreen - Full translation

## ⏳ Phase 3: Remaining Screens (6/10 TODO)

### Setup Screens
- [ ] **ManageGroupsScreen.tsx**
  - [ ] Add imports
  - [ ] Add language subscription
  - [ ] Replace "PLAYER GROUPS" with t('manageGroups.title')
  - [ ] Replace all player management text
  - [ ] Test language switching

- [ ] **GameConfigScreen.tsx**
  - [ ] Add imports
  - [ ] Add language subscription
  - [ ] Replace "Configure Roles" with t('gameConfig.title')
  - [ ] Replace spy/blank/time configuration text
  - [ ] Test language switching

- [ ] **ImportKeywordsScreen.tsx**
  - [ ] Add imports
  - [ ] Add language subscription
  - [ ] Replace "SELECT KEYWORDS" with t('importKeywords.title')
  - [ ] Replace keyword selection text
  - [ ] Test language switching

### Game Screens
- [ ] **RoleDistributionScreen.tsx**
  - [ ] Add imports
  - [ ] Add language subscription
  - [ ] Replace "ROLE DISTRIBUTION" with t('roleDistribution.title')
  - [ ] Replace player card text
  - [ ] Test language switching

- [ ] **DiscussionVotingScreen.tsx**
  - [ ] Add imports
  - [ ] Add language subscription
  - [ ] Replace "DISCUSSION & VOTING" with t('discussion.title')
  - [ ] Replace timer, voting, and blank guess text
  - [ ] Test language switching

- [ ] **VictoryScreen.tsx**
  - [ ] Add imports
  - [ ] Add language subscription
  - [ ] Replace victory messages with t('victory.*')
  - [ ] Replace keyword reveal text
  - [ ] Test language switching

## 🧪 Phase 4: Testing (TODO)

### Functionality Testing
- [ ] Language selector opens correctly
- [ ] All 4 languages display properly
- [ ] Language changes update all screens immediately
- [ ] Language preference persists after app restart
- [ ] No console errors or warnings
- [ ] All navigation works correctly

### UI Testing  
- [ ] Text fits in buttons (all languages)
- [ ] Long text doesn't overflow (French/Spanish)
- [ ] Chinese characters display correctly
- [ ] All icons and images display correctly
- [ ] Layout remains consistent across languages

### Flow Testing
- [ ] Complete game flow in English
- [ ] Complete game flow in Spanish
- [ ] Complete game flow in French
- [ ] Complete game flow in Chinese
- [ ] Switch languages mid-game

### Edge Cases
- [ ] Missing translations fallback to English
- [ ] Empty player names
- [ ] Very long player names
- [ ] Special characters in names
- [ ] Device locale changes

## 📱 Phase 5: Device Testing (Optional)

- [ ] Test on iOS device
- [ ] Test on Android device
- [ ] Test on different screen sizes
- [ ] Test with device language set to each supported language
- [ ] Test airplane mode (translations should work offline)

## 📊 Progress Tracking

| Phase | Tasks | Complete | Percentage |
|-------|-------|----------|------------|
| Foundation | 8 | 8 | 100% ✅ |
| Core Screens | 4 | 4 | 100% ✅ |
| Remaining Screens | 6 | 0 | 0% ⏳ |
| Testing | 20+ | 0 | 0% ⏳ |
| **TOTAL** | **38+** | **12** | **~32%** |

**Note:** Foundation accounts for ~75% of the work complexity.
Remaining screens are straightforward pattern application.

## 🎯 Quick Wins

Priority order for maximum impact:

1. **VictoryScreen** - Highly visible, game conclusion
2. **DiscussionVotingScreen** - Core gameplay, most time spent
3. **GameConfigScreen** - Setup flow, frequent use
4. **ManageGroupsScreen** - Entry point, first impression
5. **RoleDistributionScreen** - Quick, small screen
6. **ImportKeywordsScreen** - Quick, small screen

## 📝 Notes

- All translation keys are already in JSON files
- Pattern is established in completed screens
- Each screen takes 5-15 minutes to update
- Total remaining time: ~55-70 minutes
- Can be done incrementally as needed

## 🚀 Ready to Start?

1. Pick a screen from the list above
2. Open the file
3. Follow the pattern from completed screens
4. Test language switching
5. Check off the box
6. Move to next screen

**You've got this!** The foundation is solid, just apply the pattern! 💪
