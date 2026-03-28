# Role Reveal Popup Feature

## Overview
Added a dramatic role reveal popup that displays when a player is voted out, showing their role (SPY/CIVILIAN/BLANK) and implementing a special mechanic for blank players to guess the civilian keyword for a chance to win.

## Features Added

### 1. Role Reveal Popup Modal
When a player is voted out, instead of a simple confirmation alert, a full-screen modal appears showing:
- Player's avatar (emoji)
- Player's name
- Their role (SPY, CIVILIAN, or BLANK)
- Their keyword (for spy/civilian)
- Continue/action buttons

### 2. Blank Player Guessing Mechanic
Special feature for blank players:
- Shows "BLANK PLAYER!" status
- Displays "FINAL CHANCE" message
- Provides text input to guess the civilian keyword
- **If guess is CORRECT**: Blank player wins the entire game! 🎉
- **If guess is WRONG**: Blank player is eliminated
- Options: SKIP (eliminate) or GUESS (attempt to win)

## User Interface

### Popup for Spy/Civilian Players

```
┌─────────────────────────────────────┐
│               [X Close]             │
│                                     │
│          🦊 (Player Avatar)         │
│            Player Name              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │    ROLE REVEALED            │   │
│  │                             │   │
│  │   👁️ / 🛡️   SPY / CIVILIAN  │   │
│  │                             │   │
│  │   They had the word:        │   │
│  │      "APPLE"                │   │
│  └─────────────────────────────┘   │
│                                     │
│      [  CONTINUE  →  ]              │
│                                     │
└─────────────────────────────────────┘
```

### Popup for Blank Players

```
┌─────────────────────────────────────┐
│               [X Close]             │
│                                     │
│          🦊 (Player Avatar)         │
│            Player Name              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │      ❓ (Help Icon)          │   │
│  │    BLANK PLAYER!            │   │
│  │    FINAL CHANCE             │   │
│  │                             │   │
│  │  Can guess civilian keyword │   │
│  │  Correct = Win!             │   │
│  │  Wrong = Eliminated         │   │
│  │                             │   │
│  │  ┌─────────────────────┐   │   │
│  │  │ Enter keyword...    │   │   │
│  │  └─────────────────────┘   │   │
│  └─────────────────────────────┘   │
│                                     │
│    [  SKIP  ]    [  GUESS ✓  ]     │
│                                     │
└─────────────────────────────────────┘
```

## Technical Implementation

### New Imports
```tsx
import { Modal, TextInput } from 'react-native';
import Card from '../../components/Card/Card';
```

### New State Variables
```tsx
const [showRolePopup, setShowRolePopup] = useState(false);
const [votedPlayer, setVotedPlayer] = useState<any>(null);
const [blankGuess, setBlankGuess] = useState('');
```

### New Store Access
```tsx
const civWord = useStore((state) => state.civilianWord);
const spyWord = useStore((state) => state.spyWord);
```

### Updated handleVote Function
**Before:** Used simple `Alert.alert()`
```tsx
const handleVote = () => {
  Alert.alert("Eliminate Player", `Vote out ${name}?`, [
    { text: "Cancel" },
    { text: "Confirm", onPress: () => eliminatePlayer(id) }
  ]);
};
```

**After:** Shows modal with role reveal
```tsx
const handleVote = () => {
  if (!selectedId) return;
  const playerToEliminate = players.find(p => p.id === selectedId);
  if (!playerToEliminate) return;
  
  setVotedPlayer(playerToEliminate);
  setShowRolePopup(true);
};
```

### New handleConfirmElimination Function
```tsx
const handleConfirmElimination = () => {
  if (!votedPlayer) return;
  
  eliminatePlayer(votedPlayer.id);
  const updatedPlayers = players.map(p => 
    p.id === votedPlayer.id ? { ...p, isAlive: false} : p
  );
  
  setShowRolePopup(false);
  setVotedPlayer(null);
  setBlankGuess('');
  
  checkWinCondition(updatedPlayers);
  setSelectedId(null);
};
```

### New handleBlankGuess Function
```tsx
const handleBlankGuess = () => {
  if (!votedPlayer || !blankGuess.trim()) return;
  
  const isCorrect = blankGuess.trim().toLowerCase() === civWord.toLowerCase();
  
  if (isCorrect) {
    // Blank wins!
    setShowRolePopup(false);
    setWinner('spies'); // Blank considered spy team
    setPhase('victory');
    router.push('/victory');
  } else {
    // Wrong guess - eliminate
    handleConfirmElimination();
  }
};
```

## Game Logic Flow

### Voting Flow Diagram

```
Vote Button Pressed
       ↓
   handleVote()
       ↓
Set votedPlayer & show popup
       ↓
    ┌─────────────┐
    │ Is Blank?   │
    └─────────────┘
      ↙         ↘
    NO          YES
     ↓           ↓
Show Role    Show Input
& Keyword      Field
     ↓           ↓
  CONTINUE    GUESS / SKIP
     ↓           ↓
     └─────┬─────┘
           ↓
    Eliminate Player
           ↓
   Check Win Conditions
           ↓
    Continue or Victory
```

### Blank Player Win Condition

**Scenario:**
1. Blank player is voted out
2. They see input field
3. They guess "Apple" (civilian word)
4. System checks: `blankGuess.toLowerCase() === civWord.toLowerCase()`
5. If match: **Blank wins immediately!**
6. If no match: Blank is eliminated, game continues

**Win Logic:**
```tsx
if (isCorrect) {
  setWinner('spies'); // Blank on spy team
  setPhase('victory');
  router.push('/victory');
}
```

## Design Details

### Modal Styling
- **Background**: Semi-transparent black (60% opacity)
- **Card**: Surface variant with padding
- **Animation**: Fade in/out
- **Centered**: Flexbox center alignment

### Role Display Variants

#### Spy Display:
- **Color**: Orange (#ff9800)
- **Icon**: Eye (👁️)
- **Background**: Light green card
- **Text**: "SPY" in uppercase
- **Keyword**: Shows spy word

#### Civilian Display:
- **Color**: Green (#006b1b)
- **Icon**: Shield with checkmark (🛡️✓)
- **Background**: Light green card
- **Text**: "CIVILIAN" in uppercase
- **Keyword**: Shows civilian word

#### Blank Display:
- **Color**: Yellow (#5b5300)
- **Icon**: Help circle (❓)
- **Background**: Yellow card
- **Text**: "BLANK PLAYER! FINAL CHANCE"
- **Input**: White rounded input field
- **Buttons**: SKIP (secondary) and GUESS (primary)

### Player Avatar Display
Uses emoji based on player index:
- Player 1: 🦊 (Fox)
- Player 2: 🐻 (Bear)
- Player 3: 🐼 (Panda)
- Player 4: 🐨 (Koala)
- Player 5: 🐯 (Tiger)
- Player 6+: 🦁 (Lion)

### Close Button
- Position: Top-right corner (absolute)
- Style: Circular, semi-transparent background
- Icon: Close (X)
- Action: Dismisses modal without eliminating

## Strategic Gameplay Impact

### For Blank Players:
Before this feature:
- Blanks were just eliminated when voted
- No special mechanic
- Relatively weak role

After this feature:
- Blanks have a comeback mechanic
- Can win by deduction and guessing
- Must listen carefully during discussion
- High-risk, high-reward gameplay

### For Other Players:
- Now more cautious about voting blanks
- Must consider if blank player listened well
- Adds tension to voting decisions
- Makes blank role more interesting

## Validation & Edge Cases

### Input Validation:
- ✅ Case-insensitive comparison (`toLowerCase()`)
- ✅ Trimmed whitespace (`.trim()`)
- ✅ GUESS button disabled if input empty
- ✅ Auto-focus on input for quick typing

### Modal Handling:
- ✅ Close button cancels vote (no elimination)
- ✅ Android back button handled (`onRequestClose`)
- ✅ State cleanup on close
- ✅ Selected player cleared on close

### Win Condition:
- ✅ Correct guess triggers immediate victory
- ✅ No need to check regular win conditions
- ✅ Goes straight to victory screen
- ✅ Winner set to 'spies' (blank on spy team)

## Files Modified

### screens/Game/DiscussionVotingScreen.tsx

**Imports Added:**
- `Modal` from react-native
- `TextInput` from react-native
- `Card` component

**Store Access Added:**
- `civWord` (civilian keyword)
- `spyWord` (spy keyword)

**State Added:**
- `showRolePopup` (boolean)
- `votedPlayer` (Player object)
- `blankGuess` (string)

**Functions Added:**
- `handleConfirmElimination()` - Process elimination
- `handleBlankGuess()` - Handle blank's guess

**Functions Modified:**
- `handleVote()` - Now shows popup instead of alert

**UI Added:**
- Modal component with role reveal
- Conditional rendering for spy/civilian/blank
- Input field for blank guess
- SKIP and GUESS buttons
- Close button

## Testing Scenarios

### Test Case 1: Vote Out Spy
1. Select spy player
2. Press VOTE NOW
3. ✅ Popup shows "SPY" with eye icon
4. ✅ Shows spy keyword
5. Press CONTINUE
6. ✅ Spy eliminated
7. ✅ Check win conditions

### Test Case 2: Vote Out Civilian
1. Select civilian player
2. Press VOTE NOW
3. ✅ Popup shows "CIVILIAN" with shield icon
4. ✅ Shows civilian keyword
5. Press CONTINUE
6. ✅ Civilian eliminated
7. ✅ Check win conditions

### Test Case 3: Vote Out Blank - Wrong Guess
1. Select blank player
2. Press VOTE NOW
3. ✅ Popup shows "BLANK PLAYER! FINAL CHANCE"
4. ✅ Input field appears
5. Enter wrong keyword (e.g., "Banana" when civilian word is "Apple")
6. Press GUESS
7. ✅ Blank eliminated
8. ✅ Check win conditions

### Test Case 4: Vote Out Blank - Correct Guess
1. Select blank player
2. Press VOTE NOW
3. ✅ Popup shows input field
4. Enter correct keyword (e.g., "Apple" when civilian word is "Apple")
5. Press GUESS
6. ✅ **Blank wins immediately!**
7. ✅ Navigate to victory screen
8. ✅ Winner set to 'spies'

### Test Case 5: Cancel Vote
1. Select any player
2. Press VOTE NOW
3. ✅ Popup appears
4. Press X (close button)
5. ✅ Modal dismisses
6. ✅ Player not eliminated
7. ✅ Can vote again

## Benefits

### Gameplay:
✅ **Dramatic Reveals** - Role reveals are exciting  
✅ **Strategic Depth** - Blank players have comeback mechanic  
✅ **Fair Balance** - Blanks can win if they listened well  
✅ **Tension** - Players careful about voting blanks  
✅ **Engagement** - More interesting blank role  

### User Experience:
✅ **Visual Feedback** - Clear role display with icons  
✅ **Information** - Shows what keyword each role had  
✅ **Interactive** - Input field for blank guess  
✅ **Professional** - Modal design matches app theme  
✅ **Cancelable** - Can close without eliminating  

### Code Quality:
✅ **Modular** - Separate functions for each action  
✅ **Type-Safe** - TypeScript compilation passes  
✅ **Maintainable** - Clear logic flow  
✅ **Reusable** - Modal can be enhanced later  

## Future Enhancements

Potential improvements:
- Animation for role reveal (flip card effect)
- Sound effects for correct/wrong guesses
- Timer for blank guess (pressure!)
- Multiple guess attempts for blanks
- Statistics tracking (blank win rate)
- Achievement badges
- Replay of guess attempts in victory screen

## Win Conditions Updated

### Original Win Conditions:
- All spies eliminated → Civilians win
- Spies ≥ Civilians → Spies win

### New Win Condition Added:
- **Blank guesses civilian keyword correctly → Spies win** (blank on spy team)

This adds a third win condition and makes the blank role strategic!

## Design Consistency

The popup maintains the "Tactical Tactility" theme:
- Yellow sticky note cards
- Green/orange color scheme
- Bold uppercase typography
- Rounded corners and shadows
- Emoji avatars
- Icon usage (eye, shield, help-circle)

## Testing

- ✅ TypeScript compilation: PASSED
- ✅ Modal renders correctly
- ✅ Role reveal logic works
- ✅ Blank guess validation works
- ✅ Win condition for blank triggers
- ✅ Close button functional
- ✅ State management correct

## Technical Notes

### Case-Insensitive Matching
```tsx
blankGuess.trim().toLowerCase() === civWord.toLowerCase()
```
This ensures:
- "Apple", "apple", "APPLE" all match
- Whitespace doesn't affect matching
- Fair comparison for players

### State Cleanup
Modal properly cleans up state on close:
```tsx
setShowRolePopup(false);
setVotedPlayer(null);
setBlankGuess('');
setSelectedId(null);
```

### Modal Behavior
- `transparent={true}` - Allows see-through background
- `animationType="fade"` - Smooth entrance/exit
- `onRequestClose` - Handles Android back button

## Files Modified

**screens/Game/DiscussionVotingScreen.tsx**
- Added imports: Modal, TextInput, Card
- Added store access: civWord, spyWord
- Added state: showRolePopup, votedPlayer, blankGuess
- Refactored handleVote() to show popup
- Added handleConfirmElimination() function
- Added handleBlankGuess() function
- Added Modal component with conditional rendering
- Total additions: ~140 lines of code

## Result

The game now features dramatic role reveals and a strategic blank player mechanic that adds depth and excitement to gameplay! Players can now see exactly what role and keyword the eliminated player had, and blank players get a thrilling last chance to win by deduction! 🎭🎯
