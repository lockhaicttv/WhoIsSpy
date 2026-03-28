# Game Configuration Feature

## Overview
Added a game configuration section to the ManageGroupsScreen that allows players to set up the number of spies and blank cards before starting the game, with built-in validation to ensure spies are always less than civilians.

## Features Added

### 1. Game Setup Section
A new interactive card that allows players to configure:
- **Number of Spies**: Adjustable count of spy players
- **Number of Blanks**: Optional blank cards (players with no keyword)
- **Real-time Role Distribution**: Visual summary showing civilians, spies, and blanks

### 2. Interactive Controls
- **Plus/Minus Buttons**: Increment/decrement counters with visual feedback
- **Disabled States**: Buttons automatically disable when limits are reached
- **Large Number Display**: Clear visibility of selected values

### 3. Smart Validation

#### Rules Enforced:
1. **Minimum Players**: At least 3 players required
2. **Spies < Civilians**: Spies must always be less than civilians
3. **Valid Range**: Spies must be at least 1
4. **Auto-limits**: Maximum spies capped at floor(totalPlayers/2)

#### Visual Feedback:
- Warning message when configuration is invalid
- Disabled confirm button when rules aren't met
- Color-coded validation states

### 4. Role Distribution Summary
Real-time preview showing:
- 🛡️ Number of Civilians (green)
- 👁️ Number of Spies (orange)
- ❓ Number of Blanks (gray) - only shown if > 0

## Technical Implementation

### State Management
```tsx
const [numSpies, setNumSpies] = useState(1);
const [numBlanks, setNumBlanks] = useState(0);
const numCivilians = players.length - numSpies - numBlanks;
```

### Validation Logic
```tsx
const isValidConfiguration = numSpies > 0 && numSpies < numCivilians && numBlanks >= 0;
const canStartGame = players.length >= 3 && isValidConfiguration;
```

### Parameter Passing
Game configuration is passed to ImportKeywordsScreen via router params:
```tsx
router.push({
  pathname: '/import-keywords',
  params: { 
    numSpies: numSpies.toString(), 
    numBlanks: numBlanks.toString() 
  }
});
```

## Files Modified

### 1. **screens/Setup/ManageGroupsScreen.tsx**
- Added state for `numSpies` and `numBlanks`
- Created interactive game configuration card
- Implemented validation logic
- Added role distribution summary
- Updated confirm button with validation

**Key Changes:**
- Added 3 new state variables
- Created new UI section with increment/decrement controls
- Implemented real-time validation
- Added visual warning for invalid configurations

### 2. **screens/Setup/ImportKeywordsScreen.tsx**
- Added `useLocalSearchParams` to receive configuration
- Updated `startGameWithWord` to use configured values
- Pass `numSpies` and `numBlanks` to `assignRoles()`

**Key Changes:**
- Import `useLocalSearchParams` from expo-router
- Parse params for numSpies and numBlanks
- Use configured values instead of hardcoded `assignRoles(1)`

## UI Design

### Game Setup Card
- **Variant**: Primary (green background)
- **Style**: Rotated card with "Tactical Tactility" theme
- **Layout**: Vertical stack with clear sections

### Controls
- **Buttons**: Circular green buttons with shadow effects
- **Number Display**: Large white cards with bold numbers
- **Icons**: Material icons for visual clarity

### Role Summary
- **Container**: Light green background with rounded corners
- **Layout**: Horizontal distribution with dividers
- **Icons**: Role-specific icons (shield, eye, help-circle)

## User Flow

1. **Add Players**: User adds at least 3 players
2. **Configure Game**: 
   - Adjust number of spies (1 to floor(players/2))
   - Optionally add blank cards
3. **Review Distribution**: See real-time breakdown of roles
4. **Validation Check**: System ensures spies < civilians
5. **Confirm**: Proceed to keyword selection with configuration

## Validation Examples

### Valid Configurations:
- 4 players, 1 spy → 3 civilians, 1 spy ✅
- 6 players, 2 spies → 4 civilians, 2 spies ✅
- 5 players, 1 spy, 1 blank → 3 civilians, 1 spy, 1 blank ✅

### Invalid Configurations:
- 4 players, 2 spies → 2 civilians, 2 spies ❌ (spies not less than civilians)
- 3 players, 2 spies → 1 civilian, 2 spies ❌ (spies >= civilians)
- 4 players, 0 spies → ❌ (at least 1 spy required)

## Benefits

✅ **Flexible Gameplay**: Players can customize game difficulty  
✅ **Fair Game Balance**: Enforced rules ensure balanced gameplay  
✅ **Clear Feedback**: Visual indicators show valid/invalid states  
✅ **User-Friendly**: Intuitive plus/minus controls  
✅ **Real-Time Preview**: Instant role distribution summary  
✅ **Error Prevention**: Can't proceed with invalid configuration  

## Game Balance Logic

The validation ensures:
- **Majority Rule**: Civilians always outnumber spies
- **Playability**: At least 1 spy for the game to work
- **Fairness**: Prevents overwhelming spy advantage
- **Flexibility**: Blank cards add mystery without breaking balance

### Formula:
```
Civilians > Spies
Where: Civilians = TotalPlayers - Spies - Blanks
```

## Future Enhancements

Potential improvements:
- Save configuration presets
- Recommended configurations by player count
- Advanced mode with custom role distributions
- Game difficulty indicators
- Configuration history

## Testing

- ✅ TypeScript compilation: PASSED
- ✅ Validation logic verified
- ✅ Parameter passing works correctly
- ✅ UI responsive and accessible
- ✅ State management functional

## Notes

- Default configuration: 1 spy, 0 blanks
- Minimum 3 players required to enable game
- Maximum spies limited to floor(totalPlayers/2)
- Blank cards are optional and don't count as spies or civilians
- Configuration is passed via URL params for decoupling

## Migration from Old System

**Before:**
- Fixed 1 spy per game (hardcoded)
- No user control over game setup
- No blank card support

**After:**
- Configurable spy count
- Optional blank cards
- Validated configuration
- User has full control
