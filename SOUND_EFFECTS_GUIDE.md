# Sound Effects Storage and Implementation Guide

## 📁 Recommended Directory Structure

```
/assets
  /images          ← Already exists (for images)
  /sounds          ← NEW (for sound effects)
    /ui            ← UI interaction sounds
    /game          ← Game-specific sounds
    /ambient       ← Background/ambient sounds
    /music         ← Background music (optional)
```

## ✅ Created Directory

I've created the `/assets/sounds` directory for you. Here's the recommended structure:

```
/Users/chienle/WhoIsSpy/assets/sounds/
```

---

## 🎵 Recommended Sound Files

### UI Sounds (`/assets/sounds/ui/`)
```
button-click.mp3         - Button press feedback
button-hover.mp3         - Button hover (web only)
modal-open.mp3          - Modal/popup appears
modal-close.mp3         - Modal dismissed
navigation.mp3          - Screen transitions
error.mp3               - Error notification
success.mp3             - Success notification
```

### Game Sounds (`/assets/sounds/game/`)
```
timer-tick.mp3          - Clock ticking (last 10 seconds)
timer-warning.mp3       - Time running low alert
timer-end.mp3           - Time's up sound
role-reveal.mp3         - When viewing your role
vote-cast.mp3           - Voting for a player
elimination.mp3         - Player eliminated
spy-found.mp3           - Spy revealed
civilian-safe.mp3       - Civilian revealed
blank-guess.mp3         - Blank player guessing
victory-civilians.mp3   - Civilians win
victory-spies.mp3       - Spies win
victory-blank.mp3       - Blank player wins
game-start.mp3          - Game begins
round-start.mp3         - New round starts
```

### Ambient Sounds (`/assets/sounds/ambient/`)
```
background-tension.mp3  - Light tension music
discussion-ambient.mp3  - Discussion phase ambience
menu-music.mp3          - Home screen music (optional)
```

---

## 📝 File Format Recommendations

### Supported Formats
- **MP3** - Best compatibility (iOS, Android, Web)
- **M4A** - iOS optimized
- **WAV** - Highest quality, larger size
- **OGG** - Android optimized (not iOS)

### Recommended: MP3
- ✅ Works on all platforms
- ✅ Small file size
- ✅ Good quality
- ✅ Easy to find/create

### File Size Guidelines
```
UI Sounds:      < 50 KB each
Game Sounds:    < 100 KB each
Ambient:        < 500 KB each
Music:          < 1 MB each
```

---

## 🔧 Implementation Guide

### 1. Install expo-av (Audio Library)

```bash
npx expo install expo-av
```

### 2. Create Sound Manager Utility

**File:** `/utils/soundManager.ts`

```typescript
import { Audio } from 'expo-av';

class SoundManager {
  private sounds: { [key: string]: Audio.Sound } = {};
  private isMuted: boolean = false;

  async loadSound(name: string, file: any) {
    try {
      const { sound } = await Audio.Sound.createAsync(file);
      this.sounds[name] = sound;
    } catch (error) {
      console.error(`Error loading sound ${name}:`, error);
    }
  }

  async playSound(name: string, volume: number = 1.0) {
    if (this.isMuted) return;
    
    try {
      const sound = this.sounds[name];
      if (sound) {
        await sound.setPositionAsync(0);
        await sound.setVolumeAsync(volume);
        await sound.playAsync();
      }
    } catch (error) {
      console.error(`Error playing sound ${name}:`, error);
    }
  }

  async stopSound(name: string) {
    try {
      const sound = this.sounds[name];
      if (sound) {
        await sound.stopAsync();
      }
    } catch (error) {
      console.error(`Error stopping sound ${name}:`, error);
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  async unloadAll() {
    for (const sound of Object.values(this.sounds)) {
      await sound.unloadAsync();
    }
    this.sounds = {};
  }
}

export const soundManager = new SoundManager();
```

### 3. Preload Sounds on App Start

**File:** `/app/_layout.tsx`

```typescript
import { useEffect } from 'react';
import { soundManager } from '@/utils/soundManager';

export default function RootLayout() {
  useEffect(() => {
    // Preload sounds
    const loadSounds = async () => {
      await soundManager.loadSound('button-click', require('../assets/sounds/ui/button-click.mp3'));
      await soundManager.loadSound('timer-tick', require('../assets/sounds/game/timer-tick.mp3'));
      await soundManager.loadSound('timer-end', require('../assets/sounds/game/timer-end.mp3'));
      await soundManager.loadSound('role-reveal', require('../assets/sounds/game/role-reveal.mp3'));
      await soundManager.loadSound('vote-cast', require('../assets/sounds/game/vote-cast.mp3'));
      await soundManager.loadSound('elimination', require('../assets/sounds/game/elimination.mp3'));
      await soundManager.loadSound('victory', require('../assets/sounds/game/victory-civilians.mp3'));
    };

    loadSounds();

    // Cleanup on unmount
    return () => {
      soundManager.unloadAll();
    };
  }, []);

  return (
    // ... your existing layout
  );
}
```

### 4. Usage in Components

**Example: Button Click**
```typescript
import { soundManager } from '@/utils/soundManager';

<TouchableOpacity 
  onPress={() => {
    soundManager.playSound('button-click', 0.5);
    handleButtonPress();
  }}
>
  <Text>Click Me</Text>
</TouchableOpacity>
```

**Example: Timer Warning**
```typescript
// In DiscussionVotingScreen.tsx
useEffect(() => {
  if (timeRemaining === 10) {
    soundManager.playSound('timer-warning');
  }
  if (timeRemaining === 0) {
    soundManager.playSound('timer-end');
  }
}, [timeRemaining]);
```

**Example: Role Reveal**
```typescript
// In RoleRevealScreen.tsx
useEffect(() => {
  soundManager.playSound('role-reveal', 0.7);
}, []);
```

---

## 🎮 Sound Integration Points

### Game Flow Sounds

| Screen | Event | Sound File |
|--------|-------|------------|
| **HomeScreen** | Button press | `button-click.mp3` |
| **ManageGroups** | Add player | `success.mp3` |
| **GameConfig** | Start game | `game-start.mp3` |
| **RoleReveal** | Show role | `role-reveal.mp3` |
| **DiscussionVoting** | Timer tick | `timer-tick.mp3` |
| **DiscussionVoting** | Timer warning | `timer-warning.mp3` |
| **DiscussionVoting** | Time's up | `timer-end.mp3` |
| **DiscussionVoting** | Vote cast | `vote-cast.mp3` |
| **DiscussionVoting** | Player eliminated | `elimination.mp3` |
| **DiscussionVoting** | Spy revealed | `spy-found.mp3` |
| **DiscussionVoting** | Civilian revealed | `civilian-safe.mp3` |
| **DiscussionVoting** | Blank guesses | `blank-guess.mp3` |
| **VictoryScreen** | Show winner | `victory-*.mp3` |

### UI Feedback Sounds

```typescript
// Button Component
<Button 
  onPress={() => soundManager.playSound('button-click')}
  label="Continue"
/>

// Navigation
router.push('/next-screen');
soundManager.playSound('navigation');

// Modal
setShowModal(true);
soundManager.playSound('modal-open');

// Error
if (error) {
  soundManager.playSound('error');
}
```

---

## 🎚️ Settings Integration

### Add Sound Settings to Store

**File:** `/store/slices/settingsSlice.ts` (NEW)

```typescript
import { StateCreator } from 'zustand';
import { MyState } from '../useStore';

export type SettingsSlice = {
  soundEnabled: boolean;
  musicEnabled: boolean;
  soundVolume: number;
  musicVolume: number;
  setSoundEnabled: (enabled: boolean) => void;
  setMusicEnabled: (enabled: boolean) => void;
  setSoundVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
};

const createSettingsSlice: StateCreator<MyState, [], [], SettingsSlice> = (set) => ({
  soundEnabled: true,
  musicEnabled: false,
  soundVolume: 0.7,
  musicVolume: 0.3,
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setMusicEnabled: (enabled) => set({ musicEnabled: enabled }),
  setSoundVolume: (volume) => set({ soundVolume: volume }),
  setMusicVolume: (volume) => set({ musicVolume: volume }),
});

export default createSettingsSlice;
```

### Settings Screen UI

```typescript
const SettingsScreen = () => {
  const soundEnabled = useStore((state) => state.soundEnabled);
  const setSoundEnabled = useStore((state) => state.setSoundEnabled);

  return (
    <Card>
      <Text>Sound Effects</Text>
      <Switch 
        value={soundEnabled}
        onValueChange={(value) => {
          setSoundEnabled(value);
          soundManager.setMuted(!value);
        }}
      />
    </Card>
  );
};
```

---

## 📦 Where to Get Sound Effects

### Free Sources
1. **Freesound.org** - Huge library, Creative Commons
2. **Zapsplat.com** - Free for indie games
3. **Mixkit.co** - Free sound effects
4. **BBC Sound Effects** - Free for personal use
5. **OpenGameArt.org** - Game-specific sounds

### Paid Sources (High Quality)
1. **AudioJungle** - Professional sounds
2. **Pond5** - Extensive library
3. **SoundSnap** - Subscription service

### AI Generation
1. **ElevenLabs** - AI sound effects
2. **Soundraw.io** - AI music/effects

### Tools to Create Your Own
1. **Audacity** - Free audio editor
2. **GarageBand** - macOS (free)
3. **LMMS** - Free music production

---

## 🎯 Priority Sounds (Start Here)

If you're adding sounds incrementally, start with these:

### High Priority (Core Gameplay)
```
1. timer-tick.mp3       - Timer countdown
2. timer-end.mp3        - Time's up
3. vote-cast.mp3        - Voting action
4. elimination.mp3      - Player eliminated
5. victory-civilians.mp3 - Win sound
```

### Medium Priority (Enhanced UX)
```
6. button-click.mp3     - UI feedback
7. role-reveal.mp3      - See your role
8. spy-found.mp3        - Spy revealed
9. game-start.mp3       - Game begins
```

### Low Priority (Polish)
```
10. ambient sounds      - Background atmosphere
11. menu-music.mp3      - Home screen
12. modal sounds        - Popup interactions
```

---

## 📱 Platform Considerations

### iOS
- ✅ MP3 fully supported
- ✅ M4A native format
- ⚠️ Requires audio session setup
- ⚠️ Silent mode may affect playback

### Android
- ✅ MP3 fully supported
- ✅ OGG native format
- ⚠️ Some devices have audio lag
- ⚠️ Volume control variations

### Web
- ✅ MP3 widely supported
- ⚠️ Autoplay restrictions
- ⚠️ Must be user-initiated

---

## ⚡ Performance Tips

### Optimization
```typescript
// Preload frequently used sounds
await soundManager.loadSound('button-click', ...);

// Use lower sample rates (22kHz or 44kHz)
// Mono for UI sounds, stereo for music
// Compress to ~128kbps for MP3

// Lazy load infrequent sounds
const playRareSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require('./rare-sound.mp3')
  );
  await sound.playAsync();
  await sound.unloadAsync();
};
```

### Memory Management
```typescript
// Unload sounds when not needed
await soundManager.unloadAll();

// Stop background sounds on screen change
useEffect(() => {
  return () => {
    soundManager.stopSound('ambient');
  };
}, []);
```

---

## 🧪 Testing Checklist

- [ ] Sounds load without errors
- [ ] Sounds play on button press
- [ ] Volume controls work
- [ ] Mute toggle works
- [ ] Sounds stop when needed
- [ ] No memory leaks
- [ ] Works on iOS device
- [ ] Works on Android device
- [ ] Works on web browser
- [ ] Silent mode respected (iOS)
- [ ] Sounds don't overlap badly
- [ ] Performance is smooth

---

## 📚 Example Implementation

### Complete Timer Sound Integration

```typescript
// DiscussionVotingScreen.tsx
useEffect(() => {
  if (discussionTime !== null) {
    setTimeRemaining(discussionTime);
    
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 0) {
          soundManager.playSound('timer-end');
          return 0;
        }
        
        // Tick sound for last 10 seconds
        if (prev <= 10) {
          soundManager.playSound('timer-tick', 0.3);
        }
        
        // Warning at 10 seconds
        if (prev === 10) {
          soundManager.playSound('timer-warning');
        }
        
        return prev - 1;
      });
    }, 1000);
  }
  
  return () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
}, [discussionTime]);
```

---

## 🎨 Spy Theme Sound Suggestions

For your spy/detective theme, consider sounds like:

- **Typewriter clicks** - For buttons
- **Film reel** - For transitions
- **Camera shutter** - For role reveals
- **Dramatic sting** - For spy reveals
- **Tension music** - For timer countdown
- **Victory fanfare** - For wins
- **Clock ticking** - For last 10 seconds
- **Alarm bell** - For time's up

---

## Summary

### Storage Location: ✅
```
/assets/sounds/
  /ui/
  /game/
  /ambient/
```

### Next Steps:
1. ✅ Directory created: `/assets/sounds`
2. Add your sound files (MP3 recommended)
3. Install expo-av: `npx expo install expo-av`
4. Create soundManager utility
5. Preload sounds in _layout.tsx
6. Add sound calls to components

**Your sound effects are ready to be added!** 🎵🎮
