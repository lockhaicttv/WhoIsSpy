import { Audio } from 'expo-av';

class SoundManager {
  private sounds: { [key: string]: Audio.Sound } = {};
  private isMuted: boolean = false;
  private isLoaded: boolean = false;

  /**
   * Load all game sounds
   */
  async loadAllSounds() {
    if (this.isLoaded) return;

    try {
      // Enable audio playback in silent mode (iOS)
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      // Load game sounds
      await this.loadSound('start-game', require('../assets/sounds/game/start-game.mp3'));
      await this.loadSound('timer-count', require('../assets/sounds/game/timer-count.mp3'));
      await this.loadSound('ting', require('../assets/sounds/game/ting.mp3'));
      await this.loadSound('blank-caught', require('../assets/sounds/game/blank-caught.mp3'));
      await this.loadSound('civilian-win', require('../assets/sounds/game/cilivian-win.mp3'));
      await this.loadSound('spy-win', require('../assets/sounds/game/spy-win.mp3'));

      this.isLoaded = true;
      console.log('✅ All sounds loaded successfully');
    } catch (error) {
      console.error('❌ Error loading sounds:', error);
    }
  }

  /**
   * Load a single sound
   */
  async loadSound(name: string, file: any) {
    try {
      const { sound } = await Audio.Sound.createAsync(file);
      this.sounds[name] = sound;
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
      const sound = this.sounds[name];
      if (sound) {
        await sound.setPositionAsync(0);
        await sound.setVolumeAsync(volume);
        await sound.setIsLoopingAsync(loop);
        await sound.playAsync();
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
      const sound = this.sounds[name];
      if (sound) {
        await sound.stopAsync();
        await sound.setPositionAsync(0);
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
      for (const sound of Object.values(this.sounds)) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          await sound.stopAsync();
          await sound.setPositionAsync(0);
        }
      }
    } catch (error) {
      console.error('Error stopping all sounds:', error);
    }
  }

  /**
   * Pause a sound
   */
  async pauseSound(name: string) {
    try {
      const sound = this.sounds[name];
      if (sound) {
        await sound.pauseAsync();
      }
    } catch (error) {
      console.error(`Error pausing sound ${name}:`, error);
    }
  }

  /**
   * Resume a paused sound
   */
  async resumeSound(name: string) {
    try {
      const sound = this.sounds[name];
      if (sound) {
        await sound.playAsync();
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
  async unloadAll() {
    try {
      for (const sound of Object.values(this.sounds)) {
        await sound.unloadAsync();
      }
      this.sounds = {};
      this.isLoaded = false;
      console.log('✅ All sounds unloaded');
    } catch (error) {
      console.error('Error unloading sounds:', error);
    }
  }
}

// Singleton instance
export const soundManager = new SoundManager();
