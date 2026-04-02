import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio';

class SoundManager {
  private players: { [key: string]: AudioPlayer } = {};
  private isMuted: boolean = false;
  private isLoaded: boolean = false;

  /**
   * Load all game sounds
   */
  async loadAllSounds() {
    if (this.isLoaded) return;

    try {
      // Enable audio playback in silent mode (iOS)
      await setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: false,
        interruptionMode: 'duckOthers',
      });

      // Load game sounds
      this.loadSound('start-game', require('../assets/sounds/game/start-game.mp3'));
      this.loadSound('timer-count', require('../assets/sounds/game/timer-count.mp3'));
      this.loadSound('ting', require('../assets/sounds/game/ting.mp3'));
      this.loadSound('blank-caught', require('../assets/sounds/game/blank-caught.mp3'));
      this.loadSound('civilian-win', require('../assets/sounds/game/cilivian-win.mp3'));
      this.loadSound('spy-win', require('../assets/sounds/game/spy-win.mp3'));

      this.isLoaded = true;
      console.log('✅ All sounds loaded successfully');
    } catch (error) {
      console.error('❌ Error loading sounds:', error);
    }
  }

  /**
   * Load a single sound
   */
  loadSound(name: string, source: number | string) {
    try {
      const player = createAudioPlayer(source);
      this.players[name] = player;
    } catch (error) {
      console.error(`Error loading sound ${name}:`, error);
    }
  }

  /**
   * Play a sound
   */
  async playSound(name: string, volume: number = 1.0, loop: boolean = false) {
    if (this.isMuted) return;

    try {
      const player = this.players[name];
      if (player) {
        await player.seekTo(0);
        player.volume = volume;
        player.loop = loop;
        player.play();
      } else {
        console.warn(`Sound "${name}" not loaded`);
      }
    } catch (error) {
      console.error(`Error playing sound ${name}:`, error);
    }
  }

  /**
   * Stop a specific sound
   */
  async stopSound(name: string) {
    try {
      const player = this.players[name];
      if (player) {
        player.pause();
        await player.seekTo(0);
      }
    } catch (error) {
      console.error(`Error stopping sound ${name}:`, error);
    }
  }

  /**
   * Stop all playing sounds
   */
  async stopAllSounds() {
    try {
      for (const player of Object.values(this.players)) {
        if (player.playing) {
          player.pause();
          await player.seekTo(0);
        }
      }
    } catch (error) {
      console.error('Error stopping all sounds:', error);
    }
  }

  /**
   * Pause a sound
   */
  pauseSound(name: string) {
    try {
      const player = this.players[name];
      if (player) {
        player.pause();
      }
    } catch (error) {
      console.error(`Error pausing sound ${name}:`, error);
    }
  }

  /**
   * Resume a paused sound
   */
  resumeSound(name: string) {
    try {
      const player = this.players[name];
      if (player) {
        player.play();
      }
    } catch (error) {
      console.error(`Error resuming sound ${name}:`, error);
    }
  }

  /**
   * Set mute state
   */
  setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAllSounds();
    }
  }

  /**
   * Get mute state
   */
  isSoundMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Unload all sounds (cleanup)
   */
  unloadAll() {
    try {
      for (const player of Object.values(this.players)) {
        player.remove();
      }
      this.players = {};
      this.isLoaded = false;
      console.log('✅ All sounds unloaded');
    } catch (error) {
      console.error('Error unloading sounds:', error);
    }
  }
}

// Singleton instance
export const soundManager = new SoundManager();
