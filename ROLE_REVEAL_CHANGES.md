# Role Reveal Changes - Keyword Only Display

## Overview
Updated the role reveal screens to ONLY show players their keyword, without revealing whether they are a spy, civilian, or blank. This maintains the mystery and lets players deduce their role based on the keyword they receive.

## Problem
Previously, the game explicitly told players:
- "YOU ARE THE SPY" or "YOU ARE THE CIVILIAN"
- Role-specific hints (spy hints vs civilian hints)
- Different instructions based on role

This removed the deduction element of the game.

## Solution
Now players only see:
- Their keyword
- Generic game instructions
- No indication of their role

Players must figure out if they're the spy by:
1. Comparing their keyword with what others describe
2. Noticing if their word seems different
3. Deducing from the discussion

## Changes Made

### 1. RoleDistributionScreen.tsx

#### Updated Instructions:
**Before:**
```
SELECT YOUR OPERATIVE
TO REVEAL KEYWORD

Each operative holds a secret identity. 
Tap your character card to see your role.
```

**After:**
```
TAP TO VIEW
YOUR KEYWORD

Each player will receive a keyword. 
Tap your card to see yours privately.
```

#### Updated Button:
- Changed from "Reveal My Identity" → "START DISCUSSION"
- More appropriate since no identity is revealed

### 2. RoleRevealScreen.tsx

#### Major Changes to Card Content:

**Before (Revealed State):**
```
YOU ARE THE
SPY / CIVILIAN    ← Explicitly shows role
━━━━━━━━━━━━━
YOUR KEYWORD: Apple

Role-specific hints:
- Spy: "Be vague but confident"
- Civilian: "Ask specific questions"
```

**After (Revealed State):**
```
YOUR KEYWORD
APPLE            ← Only shows keyword

Remember your keyword. 
Try to figure out who has a different word 
without revealing yours!

Generic hints for all players
```

#### Updated Elements:

1. **Badge Text**: "MISSION ASSIGNED" → "YOUR KEYWORD"

2. **Card Icon**: "eye" → "key" (more appropriate for keyword)

3. **Main Display**: 
   - Removed role announcement (SPY/CIVILIAN)
   - Enlarged keyword display (now the focus)
   - Keyword in green (#006b1b) - same for everyone

4. **Instruction Text**:
   - Generic advice for all players
   - Focuses on deduction gameplay
   - No role-specific hints

5. **Hint Cards**:
   - **Strategy**: Generic for all roles
     - "Describe your word carefully without being too obvious"
   - **Caution**: Generic for all roles
     - "Listen carefully to what others say"

6. **Button & Footer**:
   - "TAP TO SHOW INTEL" → "TAP TO SHOW KEYWORD"
   - "Wait for others to confirm their roles" → "Wait for all players to view their keywords"

## Game Flow Impact

### Before:
1. Player taps card
2. Sees "YOU ARE SPY" or "YOU ARE CIVILIAN"
3. Sees their keyword
4. Gets role-specific hints
5. Knows exactly what their role is

### After:
1. Player taps card
2. Sees ONLY their keyword
3. Gets generic hints
4. Must deduce their role during discussion
5. Creates more interesting gameplay

## Blank Card Handling
Blank cards still work correctly:
- Player sees "..." as their keyword (from `getRoleWord()`)
- They don't know they're a blank initially
- Must figure it out during discussion

## Strategic Gameplay

### For Spies:
- Receive a different keyword than civilians
- Don't know they're spies initially
- Must listen carefully to realize their word is different
- Can try to blend in or sow confusion

### For Civilians:
- Receive the same keyword
- Don't know who else is civilian
- Must compare descriptions to find the outlier
- Build trust through consistent descriptions

### For Blanks:
- Receive no keyword ("...")
- Most mysterious role
- Can claim anything
- Creates additional confusion

## Benefits

✅ **Increased Mystery**: Players must deduce their role  
✅ **More Engaging**: Requires active thinking and listening  
✅ **Better Deduction Game**: True "Who is Spy" experience  
✅ **Spy Surprise**: Spies realize gradually they're different  
✅ **Strategic Depth**: Players can't immediately play to their role  
✅ **Fair for All**: Everyone gets same treatment initially  

## Design Consistency

All visual elements remain consistent with the "Tactical Tactility" theme:
- Yellow sticky note cards
- Green keyword text
- Rotated card aesthetic
- Paper-lift shadows
- Hint cards with icons

## Technical Implementation

### No Logic Changes:
- Role assignment logic unchanged
- Word distribution unchanged
- Game flow unchanged
- Only UI display modified

### getRoleWord() Function:
Still returns correct word based on role:
```tsx
const getRoleWord = () => {
  if (player.role === 'civilian') return civWord;
  if (player.role === 'spy') return spyWord;
  return '...'; // Blank
};
```

Players see the word but not the role that determines it.

## Testing

- ✅ TypeScript compilation: PASSED
- ✅ UI displays keyword only
- ✅ No role revelation
- ✅ Generic hints shown
- ✅ Button labels updated
- ✅ All roles work correctly

## Files Modified

1. **screens/Game/RoleDistributionScreen.tsx**
   - Updated instruction text
   - Changed button label
   - Clarified purpose of screen

2. **screens/Game/RoleRevealScreen.tsx**
   - Removed role announcement
   - Show only keyword
   - Generic hints for all
   - Updated all text/labels
   - Changed icon to "key"

## User Experience

### What Players See Now:
1. **Distribution Screen**: "Tap to view your keyword"
2. **Reveal Screen**: Just the keyword, nothing else
3. **Discussion**: Must figure out roles through conversation

### What Creates the Game:
- Keyword differences (spy vs civilian words)
- Player deduction during discussion
- Trying to blend in or identify outliers
- Building trust or creating doubt

## Migration Notes

This is a **backwards-compatible** change:
- No database/state changes
- No breaking changes to game logic
- Only UI text updates
- Existing games work fine

## Future Enhancements

Potential improvements:
- Add tutorial explaining the deduction mechanic
- Show role reveal at END of game (in victory screen)
- Add "how to play" section explaining keyword differences
- Difficulty modes (reveal role vs don't reveal)

## Result

The game now provides a true "Who is Spy" experience where players must deduce their roles through gameplay rather than being explicitly told. This creates more engaging, strategic, and mysterious gameplay! 🕵️
