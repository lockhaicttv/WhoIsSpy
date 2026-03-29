# Sound Effects Directory

This directory contains all game sound effects and audio files.

## 📁 Directory Structure

```
/sounds
  /ui       - UI interaction sounds (buttons, modals, navigation)
  /game     - Game-specific sounds (timer, voting, revelations, victory)
  /ambient  - Background and ambient sounds (music, atmosphere)
```

## 🎵 Recommended Files

### UI Sounds (`/ui/`)
- `button-click.mp3` - Button press feedback
- `modal-open.mp3` - Modal appears
- `modal-close.mp3` - Modal dismissed
- `navigation.mp3` - Screen transitions
- `error.mp3` - Error notification
- `success.mp3` - Success notification

### Game Sounds (`/game/`)
- `timer-tick.mp3` - Clock ticking (last 10 seconds)
- `timer-warning.mp3` - Time running low
- `timer-end.mp3` - Time's up
- `role-reveal.mp3` - Viewing your role
- `vote-cast.mp3` - Voting action
- `elimination.mp3` - Player eliminated
- `spy-found.mp3` - Spy revealed
- `civilian-safe.mp3` - Civilian revealed
- `blank-guess.mp3` - Blank player guessing
- `victory-civilians.mp3` - Civilians win
- `victory-spies.mp3` - Spies win
- `victory-blank.mp3` - Blank player wins
- `game-start.mp3` - Game begins
- `round-start.mp3` - New round starts

### Ambient Sounds (`/ambient/`)
- `background-tension.mp3` - Light tension music
- `discussion-ambient.mp3` - Discussion phase ambience
- `menu-music.mp3` - Home screen music (optional)

## 📝 File Format

**Recommended:** MP3 format
- Works on iOS, Android, and Web
- Good quality at small file size
- Widely supported

**File Size Guidelines:**
- UI Sounds: < 50 KB each
- Game Sounds: < 100 KB each
- Ambient: < 500 KB each

## 🔧 Usage

See `/SOUND_EFFECTS_GUIDE.md` for complete implementation details.

## 📦 Where to Get Sounds

### Free Sources
- **Freesound.org** - Creative Commons library
- **Zapsplat.com** - Free for indie games
- **Mixkit.co** - Free sound effects
- **BBC Sound Effects** - Free for personal use

### Tools
- **Audacity** - Free audio editor
- **GarageBand** - macOS (free)

## 🎯 Priority

Start with these core sounds:
1. `timer-tick.mp3` - Timer countdown
2. `timer-end.mp3` - Time's up
3. `vote-cast.mp3` - Voting
4. `elimination.mp3` - Player eliminated
5. `victory-civilians.mp3` - Win sound
6. `button-click.mp3` - UI feedback

## ⚙️ Implementation

Install expo-av first:
```bash
npx expo install expo-av
```

Then use the soundManager utility (see guide).
