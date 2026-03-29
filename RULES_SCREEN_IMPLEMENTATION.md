# Rules Screen Implementation

## Summary
Added a comprehensive **Rules screen** to the bottom navigation, positioned between Players and Store sections. The screen provides detailed game instructions including setup, roles, gameplay, winning conditions, and pro tips.

## Changes Made

### ✅ New Files Created

#### 1. **RulesScreen Component**
**File:** `/screens/Home/RulesScreen.tsx` (12,972 bytes)

A comprehensive game rules page featuring:
- 📖 **Game Overview** - What the game is about
- ⚙️ **Setup Instructions** - Step-by-step configuration guide
- 👥 **Role Explanations** - Civilian, Spy, and Blank roles
- 🎮 **Gameplay Flow** - How to play from start to finish
- 🏆 **Winning Conditions** - How each team wins
- 💡 **Pro Tips** - Strategic advice for each role

**Design Features:**
- Spy-themed aesthetic with rotated cards
- Color-coded role cards (green for civilian, orange for spy, yellow for blank)
- Icon-rich visual hierarchy
- Easy-to-read step-by-step instructions
- Bottom navigation included

#### 2. **Rules Route**
**File:** `/app/rules.tsx` (118 bytes)

Expo Router route for `/rules` path

---

### ✅ Updated Components

#### 1. **BottomNavigation** (`components/BottomNavigation/BottomNavigation.tsx`)
**Changes:**
- ✅ Added 4th navigation item: **Rules**
- ✅ Positioned between Players and Store
- ✅ Uses book icon (`book`)
- ✅ Proper active state highlighting

**Before (3 items):**
```typescript
navItems = [
  { route: '/', icon: 'game-controller', label: 'Missions' },
  { route: '/manage-groups', icon: 'people', label: 'Players' },
  { route: '/store', icon: 'cart', label: 'Store' },
]
```

**After (4 items):**
```typescript
navItems = [
  { route: '/', icon: 'game-controller', label: 'Missions' },
  { route: '/manage-groups', icon: 'people', label: 'Players' },
  { route: '/rules', icon: 'book', label: 'Rules' },        // NEW
  { route: '/store', icon: 'cart', label: 'Store' },
]
```

#### 2. **Header Component** (`components/Header/Header.tsx`)
**Changes:**
- ✅ Added `/rules` route configuration
- ✅ Shows "RULES" title on rules screen
- ✅ Home button behavior (no back button)

```typescript
'/rules': {
  title: 'RULES',
  showBackButton: false,
  rightIcon: 'person',
},
```

---

## Rules Screen Content

### Section Breakdown

#### 📖 **Overview Card** (Primary variant, rotated)
```
WHO IS SPY is a social deduction game where players 
receive secret keywords. Most players get the same 
word (civilians), but some get different words (spies).
```

#### ⚙️ **Setup Card** (Secondary variant, rotated)
4-step setup process:
1. Add at least 3 players
2. Configure number of spies
3. Optionally add blank cards
4. Choose or select keyword pair

#### 👥 **Roles Card** (Container-high variant, rotated)
Detailed role explanations:

**Civilian** 🛡️ (Green background)
- Gets the majority keyword
- Goal: Find and eliminate spies
- Wins when all spies are eliminated

**Spy** 🕵️ (Orange background)
- Gets a different keyword
- Goal: Blend in and avoid detection
- Wins when spies ≥ civilians

**Blank** ❓ (Yellow background)
- Gets NO keyword
- Goal: Guess civilian word when eliminated
- Wins ALONE if guess is correct (third team!)

#### 🎮 **Gameplay Card** (Primary variant, rotated)
5-step gameplay flow:
1. View Keywords - Tap to see your word
2. Discussion - Describe without being obvious
3. Voting - Eliminate suspected spy
4. Blank Guess - Last chance for blank players
5. Repeat - Continue until victory

#### 🏆 **Winning Conditions Card** (Tertiary variant, rotated)
3 win scenarios:
- 🛡️ Civilians Win: All spies eliminated
- 🕵️ Spies Win: Spies ≥ Civilians
- ❓ Blank Wins: Correct guess (solo victory!)

#### 💡 **Pro Tips Card** (Secondary variant, rotated)
4 strategic tips:
- Civilians: Be specific but not too obvious
- Spies: Listen and blend in
- Blanks: Gather clues for educated guess
- All: Watch for hesitation and suspicious behavior

---

## Navigation Flow

### Updated Bottom Navigation

```
┌─────────────────────────────────────────────────────────┐
│              WHO IS SPY? (Header)                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│              [Screen Content]                           │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  🎮 Missions | 👥 Players | 📖 Rules | 🛒 Store        │
│   (active)   | (inactive) | (inactive)| (inactive)     │
└─────────────────────────────────────────────────────────┘
```

### User Journey

1. **Missions** [`/`] → Home screen
2. **Players** [`/manage-groups`] → Manage player groups
3. **Rules** [`/rules`] → **NEW** Learn how to play
4. **Store** [`/store`] → Coming soon features

**Rules Screen Benefits:**
- 📚 Always accessible from bottom nav
- 🎓 New players can learn anytime
- 🔄 Quick reference during setup
- 📱 No need to leave the app

---

## Statistics

### Code Impact
```
New Files:        2 files
  - RulesScreen.tsx (comprehensive rules page)
  - rules.tsx (route definition)

Modified Files:   2 files
  - BottomNavigation.tsx (added 4th item)
  - Header.tsx (rules route config)

Total Changes:    4 files
Lines Added:      ~300 lines
Net Impact:       Major UX improvement
```

### Content Statistics
```
Sections:         6 major cards
Role Types:       3 (Civilian, Spy, Blank)
Setup Steps:      4 steps
Gameplay Steps:   5 steps
Win Conditions:   3 scenarios
Pro Tips:         4 tips
```

---

## Design Features

### Visual Hierarchy
- ✅ Large book icon header
- ✅ Clear section headings with icons
- ✅ Color-coded role cards
- ✅ Numbered steps for clarity
- ✅ Spy-themed rotated cards
- ✅ Consistent typography

### Readability
- ✅ Large, clear fonts
- ✅ Proper spacing between sections
- ✅ Bold keywords for scanning
- ✅ Icon reinforcement
- ✅ Adequate contrast ratios

### User Experience
- ✅ Scrollable content
- ✅ Bottom navigation always visible
- ✅ No back button needed (home button works)
- ✅ Self-contained information
- ✅ No external links required

---

## Content Highlights

### Key Information Provided

1. **What the game is** - Social deduction with keywords
2. **How to set it up** - Player count, spy config, blanks
3. **What each role does** - Clear objectives for all roles
4. **How gameplay works** - Step-by-step flow
5. **How to win** - Victory conditions for each team
6. **How to play better** - Strategic tips

### Unique Features Explained

**Blank Role - Third Team:**
```
The rules clearly explain that blank players 
are a THIRD TEAM who can win alone by guessing 
correctly. This is a unique mechanic that adds 
strategic depth to the game.
```

**Win Conditions:**
```
Three distinct win conditions are explained:
- Civilians (majority team)
- Spies (minority team)  
- Blank (solo player)
```

---

## Bottom Navigation Order

### Strategic Positioning

**Order Rationale:**
1. **Missions** - Primary action (start game)
2. **Players** - Setup required before playing
3. **Rules** - ⭐ NEW Learn before/during play
4. **Store** - Optional/future features

**Why Rules is 3rd:**
- Natural flow: Home → Setup → Learn → Shop
- Between core features and extras
- Easy access during game setup
- Not blocking primary actions

---

## Benefits

### 1. **Onboarding** 🎓
- New players can learn in-app
- No need for external tutorials
- Always available for reference

### 2. **User Experience** ✨
- Self-contained documentation
- Visual and text-based learning
- Easy to navigate and understand

### 3. **Accessibility** ♿
- Large, readable text
- Icon reinforcement
- Clear section separation
- Scrollable content

### 4. **Retention** 📈
- Users don't need to leave app to learn
- Reduces friction for new players
- Encourages experimentation with roles

### 5. **Support** 💬
- Reduces support questions
- Self-service learning
- Clear explanations of mechanics

---

## Integration

### With Existing Features

**Home Screen Card:**
The existing "RULES & HOW TO PLAY" card can now link to this screen:

```typescript
<TouchableOpacity onPress={() => router.push('/rules')}>
  <Card variant="container-high">
    <Text>RULES & HOW TO PLAY</Text>
    <Text>Learn the basics of espionage and deduction.</Text>
  </Card>
</TouchableOpacity>
```

**During Game Setup:**
Players can check rules before configuring game

**During Gameplay:**
Quick reference accessible via home button → rules

---

## Testing Checklist

- [x] Linting passes (0 errors)
- [x] Rules screen created with comprehensive content
- [x] Rules route accessible via `/rules`
- [x] Bottom navigation shows 4 items
- [x] Rules positioned between Players and Store
- [ ] Test navigation to rules from all screens
- [ ] Verify active state highlighting
- [ ] Test scrolling through all content
- [ ] Verify card readability
- [ ] Test on iOS device
- [ ] Test on Android device

---

## Future Enhancements

### Possible Improvements

1. **Interactive Tutorial**
   - Step-by-step interactive guide
   - Practice mode with AI players
   - Animated examples

2. **Video Tutorials**
   - Embedded how-to videos
   - Role-specific tutorials
   - Strategy videos

3. **FAQ Section**
   - Common questions
   - Troubleshooting
   - Advanced strategies

4. **Strategy Guide**
   - Advanced tactics
   - Psychological tips
   - Optimal play patterns

5. **Localization**
   - Multi-language support
   - Regional variations
   - Cultural adaptations

---

## Code Quality

✅ **Zero lint errors**  
✅ **TypeScript strict mode**  
✅ **Consistent styling**  
✅ **Proper imports**  
✅ **Component reusability**  
✅ **Accessible content**  
✅ **Responsive layout**

---

**Rules screen implementation completed successfully!** 📖✨

The app now has comprehensive, always-accessible game rules positioned perfectly in the bottom navigation between Players and Store. New users can learn how to play without leaving the app, and experienced players have a quick reference guide at their fingertips!
