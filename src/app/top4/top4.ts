import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-top4',
  imports: [],
  templateUrl: './top4.html',
  styleUrl: './top4.scss'
})
export class Top4 implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  isPlaying = false;
  isMuted = false;
  isFullscreen = false;
  progress = 0;
  currentTime = '0:00';
  duration = '0:00';
  
  ngAfterViewInit() {
    this.setupVideoEvents();
  }
  
  private setupVideoEvents() {
    const video = this.videoPlayer.nativeElement;
    
    video.addEventListener('loadedmetadata', () => {
      this.duration = this.formatTime(video.duration);
    });
    
    video.addEventListener('timeupdate', () => {
      if (video.duration) {
        this.progress = (video.currentTime / video.duration) * 100;
      }
      this.currentTime = this.formatTime(video.currentTime);
    });
    
    // ДОБАВЬ ЭТИ ОБРАБОТЧИКИ!
    video.addEventListener('play', () => {
      this.isPlaying = true;
    });
    
    video.addEventListener('pause', () => {
      this.isPlaying = false;
    });
    
    video.addEventListener('ended', () => {
      this.isPlaying = false;
    });
  }
  
  togglePlay() {
    const video = this.videoPlayer.nativeElement;
    
    if (video.paused || video.ended) {
      video.play();
      // isPlaying установится автоматически в обработчике 'play'
    } else {
      video.pause();
      // isPlaying установится автоматически в обработчике 'pause'
    }
  }
  
  toggleMute() {
    const video = this.videoPlayer.nativeElement;
    video.muted = !video.muted;
    this.isMuted = video.muted;
  }
  
  toggleFullscreen() {
    const videoContainer = this.videoPlayer.nativeElement.parentElement;
    
    if (!this.isFullscreen) {
      if (videoContainer?.requestFullscreen) {
        videoContainer.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    this.isFullscreen = !this.isFullscreen;
  }
  
  seek(event: MouseEvent) {
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const video = this.videoPlayer.nativeElement;
    
    if (video.duration) {
      video.currentTime = percent * video.duration;
    }
  }
  
  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}