import Debug from "../utilities/debug.js";
import { clamp } from "../utilities/utilities.js";

export default class SoundManager {
  constructor() {
    this.sfxVolume = 0.5;
    this.musicVolume = 0.5;
    this.currentMusic = null;
  }
  get currentMusic() {
    return this._currentMusic;
  }
  set currentMusic(value) {
    this._currentMusic = value;
  }
  get currentMusicLoop() {
    return this._currentMusic.loop;
  }
  set currentMusicLoop(value) {
    if (value !== true && value !== false) {
      throw new TypeError("currentMusicLoop must be a bool");
    }
    this._currentMusic.loop = value;
  }
  get currentMusicVolume() {
    return this._currentMusic.volume;
  }
  set currentMusicVolume(value) {
    this._currentMusic.volume = clamp(value, 0, 1);
  }
  get sfxVolume() {
    return this._sfxVolume;
  }
  set sfxVolume(value) {
    this._sfxVolume = clamp(value, 0, 1);
  }
  get musicVolume() {
    return this._musicVolume;
  }
  set musicVolume(value) {
    this._musicVolume = clamp(value, 0, 1);
  }
  playSoundEffect(source) {
    const audio = new Audio(source);
    audio.volume = this.sfxVolume;
    audio.oncanplay = (e) => {
      this.playAudio(audio);
    };
  }
  playMusic(audio, loop) {
    if (audio == null && this.currentMusic == null) {
      // nothing happens, no music was or is playing
    } else if (audio == null && this.currentMusic != null) {
      this.stopMusic();
    } else if (audio != null && this.currentMusic == null) {
      this.playNewMusic(audio, loop);
    } else if (
      audio != null &&
      this.currentMusic != null &&
      audio.src != this.currentMusic.src
    ) {
      this.stopMusic();
      this.playNewMusic(audio, loop);
    } else if (
      audio != null &&
      this.currentMusic != null &&
      audio.src == this.currentMusic.src
    ) {
      // nothing happens, same music still plays
    } else {
      Debug.log(audio);
      Debug.log(this.currentMusic);
    }
  }
  playNewMusic(audio, loop) {
    this.currentMusic = audio;
    this.currentMusicLoop = loop;
    this.currentMusicVolume = this.musicVolume;

    if (audio.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      this.playAudio(audio);
    } else {
      throw new Error(audio.src + " was not ready to be played");
    }
  }
  playAudio(audio) {
    audio.play();
  }
  stopMusic() {
    this.stopAudio(this.currentMusic);
    this.currentMusic = null;
  }
  stopAudio(audio) {
    audio.volume = 0;
    audio.pause();
    audio.currentTime = 0;
  }
  fadeOut(audio) {
    let interval;
    interval = setInterval(() => {
      this.fadeIntervalTick(audio, interval);
    }, 60);
  }
  fadeIntervalTick(audio, interval) {
    const newVolume = audio.volume * 0.9;

    if (newVolume > 0.01) {
      audio.volume = newVolume;
      Debug.log(audio.volume);
    } else {
      this.stopAudio(audio);
      clearInterval(interval);
    }

    Debug.log("running");
  }
}
