# Home Button Update

## Summary
Replaced the non-functional burger menu icon with a functional **Home button** in the header, allowing users to navigate back to the home screen from anywhere in the app.

## Changes Made

### ✅ Updated Component
**File:** `/components/Header/Header.tsx`

### Changes in 3 Locations:

#### 1. **renderLeftButton() Function** (Lines 127-132)
```typescript
// Before
return (
  <TouchableOpacity className="p-2 -ml-2">
    <Ionicons name="menu" size={28} color="#006b1b" />
  </TouchableOpacity>
);

// After
return (
  <TouchableOpacity onPress={() => router.push('/')} className="p-2 -ml-2">
    <Ionicons name="home" size={28} color="#006b1b" />
  </TouchableOpacity>
);
```

#### 2. **Discussion/Voting & Victory Screens** (Lines 182-184)
```typescript
// Before
<Ionicons name="menu" size={28} color="#006b1b" />

// After
<TouchableOpacity onPress={() => router.push('/')} className="p-2 -ml-2">
  <Ionicons name="home" size={28} color="#006b1b" />
</TouchableOpacity>
```

#### 3. **Role Reveal Screen** (Lines 196-198)
```typescript
// Before
<Ionicons name="menu" size={28} color="#006b1b" />

// After
<TouchableOpacity onPress={() => router.push('/')} className="p-2 -ml-2">
  <Ionicons name="home" size={28} color="#006b1b" />
</TouchableOpacity>
```

## Behavior

### Before:
- ❌ Burger menu icon was static (no functionality)
- ❌ Users couldn't easily return to home screen
- ❌ Had to use back button multiple times to reach home

### After:
- ✅ Home icon is interactive and clickable
- ✅ **One tap** navigates directly to home screen from any screen
- ✅ Always available (appears when back button is not shown)
- ✅ Consistent with navigation best practices

## Icon Logic

The header now shows **three types of left buttons** based on the screen:

1. **Back Button** (`arrow-back`) - On screens with `showBackButton: true`
   - Manage Groups
   - Game Config
   - Import Keywords
   - Role Distribution

2. **Home Button** (`home`) - On screens with `showBackButton: false`
   - Home Screen (as home icon)
   - Role Reveal
   - Discussion/Voting
   - Victory Screen

## User Experience Improvements

### Navigation Flow:
```
Home Screen [home icon - returns to home]
  ↓
Manage Groups [← back button]
  ↓
Game Config [← back button]
  ↓
Import Keywords [← back button]
  ↓
Role Distribution [← back button]
  ↓
Role Reveal [home icon - returns to home]
  ↓
Discussion/Voting [home icon - returns to home]
  ↓
Victory Screen [home icon - returns to home]
```

### Benefits:
1. **Quick Exit**: Users can exit game flow immediately
2. **Intuitive**: Home icon is universally recognized
3. **Consistent**: Same behavior across all game screens
4. **Escape Hatch**: Important during game when back button would go to previous game state
5. **User Control**: Empowers users to navigate freely

## Technical Details

- **Icon**: Changed from `menu` to `home` (Ionicons)
- **Action**: Added `onPress={() => router.push('/')}`
- **Styling**: Maintained same styling (28px size, #006b1b color)
- **Touchable**: Wrapped in `TouchableOpacity` for press feedback
- **Code Quality**: ✅ Zero lint errors

## Testing Checklist

- [x] Linting passes (0 errors)
- [x] Home button renders on correct screens
- [ ] Test home button navigation from Role Reveal
- [ ] Test home button navigation from Discussion/Voting
- [ ] Test home button navigation from Victory
- [ ] Verify back button still works on setup screens
- [ ] Test on iOS device
- [ ] Test on Android device

## Context

This change addresses the user need for quick navigation back to the home screen, especially important during game flow when users may want to:
- Start a new game
- Exit current game
- Return to main menu
- Navigate to different game features

The home button provides a consistent escape route without forcing users to click back multiple times or complete the current game flow.

---

**Change completed successfully!** 🏠✨
