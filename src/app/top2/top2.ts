import { Component } from '@angular/core';

@Component({
  selector: 'app-top2',
  templateUrl: './top2.html',
  styleUrl: './top2.scss'
})
export class Top2 {
  isRecording = false;
  private audio: HTMLAudioElement;
  private afterAudio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio('/Kirusha/assets/kirusha-voice.mp3');
    this.afterAudio = new Audio('/Kirusha/assets/girl-cry.mp3'); // ← второй звук (вздох/плач)
  }

  toggleMicrophone() {
    this.isRecording = !this.isRecording;

    if (this.isRecording) {
      // ▶️ Воспроизводим голос Кирюши
      this.audio.play().catch(e => console.log('Audio play failed:', e));

      // Автоматически выключаем через 5 секунд
      setTimeout(() => {
        if (this.isRecording) {
          this.isRecording = false;
          this.playAfterAudio();
        }
      }, 5000);
    } else {
      // ⏹ Останавливаем запись и аудио
      this.audio.pause();
      this.audio.currentTime = 0;

      // После выключения — включаем "плач"
      this.playAfterAudio();
    }
  }

  private playAfterAudio() {
    this.afterAudio.pause();
    this.afterAudio.currentTime = 0;
    this.afterAudio.play().catch(e => console.log('After audio play failed:', e));
  }
}
