# Sound Integration Implementation Guide

## 📋 Your Current Sounds

You have 5 game sounds ready:

| Sound File | Use Case |
|-----------|----------|
| `start-game.mp3` | Play when game begins (RoleDistributionScreen) |
| `timer-count.mp3` | Loop during countdown (DiscussionVotingScreen) |
| `blank-caught.mp3` | Blank player eliminated (DiscussionVotingScreen) |
| `cilivian-win.mp3` | Civilians victory (VictoryScreen) |
| `spy-win.mp3` | Spies victory (VictoryScreen) |

---

## 🚀 Quick Start

### 1. Install expo-av

```bash
npx expo install expo-av
```

### 2. Initialize Sounds in App Layout

**File:** `/app/_layout.tsx`

Add this to your existing `_layout.tsx`:

```typescript
import { soundManager } from '@/utils/soundManager';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Initialize database and sounds on app start
  useEffect(() => {
    initDatabase();
    
    // Load all sounds
    soundManager.loadAllSounds();

    // Cleanup on unmount
    return () => {
      soundManager.unloadAll();
    };
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack 
        screenOptions={{ 
          headerShown: true,
          header: () => (
            <SafeAreaView edges={['top']} className="bg-[#e0fee1]">
              <Header />
            </SafeAreaView>
          ),
        }} 
      />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
```

---

## 🎮 Integration Points

### 1. Game Start Sound

**File:** `/screens/Game/RoleDistributionScreen.tsx`

Add to the component:

```typescript
import { soundManager } from '../../utils/soundManager';
import { useEffect } from 'react';

const RoleDistributionScreen = () => {
  // ... existing code

  // Play start game sound when screen loads
  useEffect(() => {
    soundManager.playSound('start-game', 0.7);
  }, []);

  // ... rest of component
}
```

### 2. Timer Countdown Sound

**File:** `/screens/Game/DiscussionVotingScreen.tsx`

Update your timer logic:

```typescript
import { soundManager } from '../../utils/soundManager';

const DiscussionVotingScreen = () => {
  // ... existing state

  // Timer countdown with sound
  useEffect(() => {
    if (discussionTime !== null) {
      setTimeRemaining(discussionTime);
      
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            // Stop timer sound
            soundManager.stopSound('timer-count');
            return 0;
          }
          
          // Start looping timer sound at 10 seconds
          if (prev === 10) {
            soundManager.playSound('timer-count', 0.4, true); // loop = true
          }
          
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        soundManager.stopSound('timer-count');
      };
    }
  }, [discussionTime]);

  // ... rest of component
}
```

### 3. Blank Caught Sound

**File:** `/screens/Game/DiscussionVotingScreen.tsx`

In your `handleBlankGuess` function:

```typescript
const handleBlankGuess = () => {
  if (!votedPlayer || !blankGuess.trim()) return;

  const isCorrect = blankGuess.trim().toLowerCase() === civWord.toLowerCase();
  
  if (isCorrect) {
    // Blank wins - play blank-caught sound (ironically)
    soundManager.playSound('blank-caught', 0.8);
    setShowRolePopup(false);
    setWinner('blank');
    setPhase('victory');
    router.push('/victory');
  } else {
    // Wrong guess - play blank-caught sound
    soundManager.playSound('blank-caught', 0.8);
    handleConfirmElimination();
  }
};
```

Or in the role reveal popup when blank is shown:

```typescript
// In the modal when votedPlayer.role === 'blank'
{votedPlayer.role === 'blank' && (
  <>
    <View className="bg-[#f9e534] rounded-2xl p-6 items-center mb-6">
      {/* Play sound when blank is revealed */}
      {useEffect(() => {
        soundManager.playSound('blank-caught', 0.6);
      }, [])}
      
      <Ionicons name="help-circle" size={48} color="#5b5300" />
      {/* ... rest of UI */}
    </View>
  </>
)}
```

### 4. Victory Sounds

**File:** `/screens/Game/VictoryScreen.tsx`

Add to your component:

```typescript
import { soundManager } from '../../utils/soundManager';
import { useEffect } from 'react';

const VictoryScreen = () => {
  const winner = useStore((state) => state.winner);
  // ... other state

  // Play appropriate victory sound
  useEffect(() => {
    if (winner === 'civilians') {
      soundManager.playSound('civilian-win', 0.8);
    } else if (winner === 'spies') {
      soundManager.playSound('spy-win', 0.8);
    } else if (winner === 'blank') {
      soundManager.playSound('blank-caught', 0.8);
    }

    // Cleanup
    return () => {
      soundManager.stopAllSounds();
    };
  }, [winner]);

  // ... rest of component
}
```

---

## 🎚️ Sound Settings (Optional)

### Add Sound Toggle to Store

**File:** `/store/slices/gameSlice.ts`

Add to your existing GameSlice:

```typescript
export type GameSlice = {
  // ... existing fields
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const createGameSlice: StateCreator<MyState, [], [], GameSlice> = (set) => ({
  // ... existing state
  soundEnabled: true,
  setSoundEnabled: (enabled) => {
    soundManager.setMuted(!enabled);
    set({ soundEnabled: enabled });
  },
})
```

### Add Sound Toggle UI

In your header or settings:

```typescript
import { soundManager } from '@/utils/soundManager';

const SoundToggle = () => {
  const soundEnabled = useStore((state) => state.soundEnabled);
  const setSoundEnabled = useStore((state) => state.setSoundEnabled);

  return (
    <TouchableOpacity 
      onPress={() => setSoundEnabled(!soundEnabled)}
      className="p-2"
    >
      <Ionicons 
        name={soundEnabled ? 'volume-high' : 'volume-mute'} 
        size={24} 
        color="#006b1b" 
      />
    </TouchableOpacity>
  );
};
```

---

## 📱 Complete Integration Checklist

### Setup
- [x] Sounds exist in `/assets/sounds/game/`
- [x] Sound manager utility created
- [ ] expo-av installed
- [ ] Sound manager imported in _layout.tsx
- [ ] Sounds loaded on app start

### Integration Points
- [ ] **Game Start**: RoleDistributionScreen plays `start-game.mp3`
- [ ] **Timer**: DiscussionVotingScreen loops `timer-count.mp3` at 10 seconds
- [ ] **Blank Caught**: Plays `blank-caught.mp3` when blank eliminated
- [ ] **Civilian Win**: VictoryScreen plays `cilivian-win.mp3`
- [ ] **Spy Win**: VictoryScreen plays `spy-win.mp3`

### Polish (Optional)
- [ ] Sound toggle in header
- [ ] Volume controls
- [ ] Fade in/out effects
- [ ] Haptic feedback integration

---

## 🎯 Quick Implementation

### Minimal Integration (5 minutes)

**Step 1:** Install expo-av
```bash
npx expo install expo-av
```

**Step 2:** Add to _layout.tsx
```typescript
import { soundManager } from '@/utils/soundManager';

useEffect(() => {
  soundManager.loadAllSounds();
  return () => soundManager.unloadAll();
}, []);
```

**Step 3:** Add to VictoryScreen.tsx
```typescript
import { soundManager } from '../../utils/soundManager';

useEffect(() => {
  if (winner === 'civilians') soundManager.playSound('civilian-win', 0.8);
  else if (winner === 'spies') soundManager.playSound('spy-win', 0.8);
}, [winner]);
```

**Done!** You now have victory sounds working.

---

## 🐛 Troubleshooting

### Sound not playing on iOS
```typescript
// Make sure audio mode is set (already in soundManager)
await Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
});
```

### Sound not playing on first try
```typescript
// Preload sounds in _layout.tsx before game starts
await soundManager.loadAllSounds();
```

### Sound quality issues
- Check file format (MP3 recommended)
- Verify file is not corrupted
- Try re-exporting at 128kbps

### Memory issues
```typescript
// Unload sounds when leaving game
useEffect(() => {
  return () => {
    soundManager.stopAllSounds();
  };
}, []);
```

---

## 📝 Notes

### About Your Files

1. **cilivian-win.mp3** - Note the typo in "civilian". You can:
   - Rename file to `civilian-win.mp3`, OR
   - Update soundManager to use `cilivian-win.mp3`

2. **timer-count.mp3** (294 KB) - Largest file
   - Consider looping for efficiency
   - Could be split into separate tick and alarm sounds

3. **All files are good sizes** - Not too large for mobile

### Sound Strategy

**Current files support:**
- ✅ Game flow (start)
- ✅ Time pressure (timer countdown)
- ✅ All victory conditions
- ✅ Blank player mechanic

**Future additions could include:**
- Button click feedback
- Role reveal sound
- Vote cast sound
- Player elimination sound

---

## 🎮 Usage Examples

### Example 1: Simple Victory Sound
```typescript
useEffect(() => {
  soundManager.playSound('civilian-win');
}, []);
```

### Example 2: Timer with Loop
```typescript
// Start looping at 10 seconds
if (timeRemaining === 10) {
  soundManager.playSound('timer-count', 0.4, true);
}

// Stop when time's up
if (timeRemaining === 0) {
  soundManager.stopSound('timer-count');
}
```

### Example 3: With Volume Control
```typescript
const volume = useStore((state) => state.soundVolume);
soundManager.playSound('start-game', volume);
```

---

**Your sounds are ready to integrate!** 🎵✨

Follow the quick implementation steps above to get victory sounds working in under 5 minutes!
