# Profile Access via Header Avatar - Update

## ✅ Changes Applied

The Profile screen is now accessed via the avatar in the header (top-right corner) instead of the bottom navigation.

---

## 🔄 What Changed

### 1. Bottom Navigation Restored

**Bottom Navigation (components/BottomNavigation/BottomNavigation.tsx):**

**Before:**
```
[🎮 Missions] [👥 Players] [📖 Rules] [👤 Profile]
```

**After (Restored):**
```
[🎮 Missions] [👥 Players] [📖 Rules] [🛒 Store]
```

- ✅ Profile button removed
- ✅ Store button restored
- ✅ Same 4-icon layout as before

### 2. Header Avatar Made Clickable

**Header Component (components/Header/Header.tsx):**

All right-side icons now navigate to Profile when clicked:

1. **Avatar Icon** (Home screen)
   - Clickable avatar image
   - Routes to `/profile`

2. **Person Icon** (Most screens)
   - Clickable person icon
   - Routes to `/profile`

3. **Settings Icon** (Game config screens)
   - Clickable settings icon
   - Routes to `/profile`

4. **Victory Avatar** (Victory screen)
   - Currently not clickable (display only)

### 3. Profile Route Configuration Added

Added Profile screen to header route configs:
```typescript
'/profile': {
  title: 'PROFILE',
  showBackButton: false,
  rightIcon: 'avatar',
}
```

---

## 🎯 How to Access Profile Now

### Method 1: From Home Screen
1. Look at top-right corner
2. See the avatar image
3. Tap the avatar
4. Opens Profile screen

### Method 2: From Any Other Screen
1. Look at top-right corner
2. See the person/settings icon (circle with icon)
3. Tap the icon
4. Opens Profile screen

---

## 📱 User Experience

### Home Screen
```
┌─────────────────────────────────┐
│ [🏠] WHO IS SPY?         [👤🖼️] │ ← Tap avatar to open profile
└─────────────────────────────────┘
```

### Other Screens (Store, Rules, Manage Groups)
```
┌─────────────────────────────────┐
│ [⬅️] STORE                 [👤] │ ← Tap person icon to open profile
└─────────────────────────────────┘
```

### Game Config Screens
```
┌─────────────────────────────────┐
│ [⬅️] GAME SETUP             [⚙️] │ ← Tap settings icon to open profile
└─────────────────────────────────┘
```

---

## 🎨 Visual Design

### Avatar States

#### Home Screen Avatar
- **Type:** Image (avatar-user.png)
- **Shape:** Circle with border
- **Background:** Light green (#bee7c1)
- **Border:** Subtle green (#006b1b with 10% opacity)
- **Size:** 40×40px
- **Interactive:** Yes, tappable

#### Person Icon (Other Screens)
- **Type:** Icon (Ionicons person)
- **Shape:** Circle with border
- **Background:** Light green (#bee7c1)
- **Border:** Green (#006b1b)
- **Size:** 40×40px with 20px icon
- **Interactive:** Yes, tappable

#### Settings Icon (Game Screens)
- **Type:** Icon (Ionicons settings)
- **Shape:** Circle with border
- **Background:** Bright green (#91f78e)
- **Border:** Dark green (#006b1b)
- **Size:** 40×40px with 20px icon
- **Interactive:** Yes, tappable

---

## 💡 Benefits of This Approach

### 1. Standard UX Pattern
- ✅ Avatar in top-right is industry standard
- ✅ Users expect to find profile/settings there
- ✅ Matches Gmail, Twitter, Facebook, etc.

### 2. More Navigation Space
- ✅ Bottom nav has 4 items instead of 5
- ✅ Larger touch targets
- ✅ Less cluttered

### 3. Better Information Architecture
- ✅ Profile is secondary function
- ✅ Bottom nav for primary navigation
- ✅ Header for user-specific actions

### 4. Consistent Access
- ✅ Profile accessible from every screen
- ✅ Always in same position (top-right)
- ✅ No need to change bottom nav

---

## 🔧 Technical Implementation

### TouchableOpacity Wrapper
All right icons are now wrapped in TouchableOpacity:

```typescript
<TouchableOpacity 
  onPress={() => router.push('/profile')}
  className="w-10 h-10 rounded-full..."
>
  {/* Icon or Image */}
</TouchableOpacity>
```

### Navigation Flow
```
User taps avatar/icon
  ↓
TouchableOpacity onPress
  ↓
router.push('/profile')
  ↓
Profile screen opens
  ↓
Can navigate back or use bottom nav
```

### Icon Types by Screen

| Screen | Right Icon | Clickable | Destination |
|--------|-----------|-----------|-------------|
| Home | Avatar Image | ✅ Yes | Profile |
| Store | Person Icon | ✅ Yes | Profile |
| Rules | Person Icon | ✅ Yes | Profile |
| Manage Groups | Person Icon | ✅ Yes | Profile |
| Game Config | Settings Icon | ✅ Yes | Profile |
| Import Keywords | Settings Icon | ✅ Yes | Profile |
| Role Distribution | Person Icon | ✅ Yes | Profile |
| Role Reveal | Person Icon (small) | ❌ No | - |
| Discussion/Voting | Person Icon | ✅ Yes | Profile |
| Victory | Victory Avatar | ❌ No | - |
| Profile | Avatar Image | ✅ Yes | Profile (self) |

---

## 📝 Files Modified

### 1. components/BottomNavigation/BottomNavigation.tsx
- Reverted Profile to Store
- Changed icon from 'person-circle' to 'cart'
- Changed route from '/profile' to '/store'
- Changed label to use t('navigation.store')

### 2. components/Header/Header.tsx
- Added '/profile' route configuration
- Made avatar icon clickable (TouchableOpacity)
- Made person icon clickable (TouchableOpacity)
- Made settings icon clickable (TouchableOpacity)
- All navigate to router.push('/profile')

---

## 🧪 Testing Checklist

- [ ] Home screen shows avatar in top-right
- [ ] Tapping avatar opens Profile screen
- [ ] Store screen shows person icon in top-right
- [ ] Tapping person icon opens Profile screen
- [ ] Rules screen shows person icon in top-right
- [ ] Tapping person icon opens Profile screen
- [ ] Game config shows settings icon in top-right
- [ ] Tapping settings icon opens Profile screen
- [ ] Bottom navigation shows Store (not Profile)
- [ ] Bottom navigation has 4 items
- [ ] Can navigate between screens normally
- [ ] Profile screen displays correctly
- [ ] Can use language selector in Profile
- [ ] Can toggle sound in Profile

---

## 🎯 User Flow Examples

### Example 1: Quick Profile Access from Home
```
1. User is on Home screen
2. Sees avatar in top-right corner
3. Taps avatar
4. Profile screen opens
5. Changes language
6. Taps Home icon or bottom nav
7. Returns to Home
```

### Example 2: Access Settings During Game Setup
```
1. User is configuring game
2. Wants to change language
3. Sees settings icon in top-right
4. Taps settings icon
5. Profile screen opens
6. Changes language
7. Taps back button
8. Returns to game config
9. UI now in new language
```

### Example 3: Mute Sounds from Any Screen
```
1. User is on Store screen
2. Wants to turn off sounds
3. Taps person icon in top-right
4. Profile screen opens
5. Toggles sound switch OFF
6. Returns to Store
7. Sounds are now muted
```

---

## 🌟 Summary

**Navigation Structure:**

**Bottom Navigation (Primary):**
- 🎮 Missions (Home)
- 👥 Players (Manage Groups)
- 📖 Rules
- 🛒 Store

**Header Avatar (Secondary):**
- 👤 Profile/Settings

**Benefits:**
- ✅ Industry-standard UX pattern
- ✅ Profile accessible from everywhere
- ✅ Clean bottom navigation
- ✅ Logical information architecture

**The Profile screen is now accessible via the avatar/icon in the top-right corner of the header!** 🎉
