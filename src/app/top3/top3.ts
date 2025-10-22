import { Component, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-top3',
  imports: [],
  templateUrl: './top3.html',
  styleUrl: './top3.scss'
})
export class Top3 implements AfterViewInit {
  private animationContainer!: HTMLElement;
  private isAnimating = false;
  private lastScrollY = 0;
  private moveDistance = 85;

  ngAfterViewInit() {
    this.animationContainer = document.querySelector('.animation-container') as HTMLElement;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    const containerTop = this.animationContainer?.getBoundingClientRect().top || 0;
    const windowHeight = window.innerHeight;
    
    // Если контейнер в зоне видимости
    if (containerTop < windowHeight * 0.5 && containerTop > -this.animationContainer?.offsetHeight) {
      const progress = this.calculateProgress(containerTop, windowHeight);
      this.animateCars(progress, scrollY > this.lastScrollY);
    }
    
    this.lastScrollY = scrollY;
  }

  private calculateProgress(containerTop: number, windowHeight: number): number {
    const start = windowHeight * 0.8;
    const end = -this.animationContainer.offsetHeight;
    return 1 - (containerTop - end) / (start - end);
  }

  private animateCars(progress: number, scrollingDown: boolean) {
    const cars = document.querySelectorAll('.car');
    const crashEffect = document.querySelector('.crash-effect') as HTMLElement;
    
    if (scrollingDown) {
      // СКРОЛЛ ВНИЗ - разъезжаются
      const reverseProgress = 1 - progress;
      (cars[0] as HTMLElement).style.transform = `translateX(${reverseProgress * this.moveDistance}px)`;
      (cars[1] as HTMLElement).style.transform = `translateX(${-reverseProgress * this.moveDistance}px)`;
      
      // Убираем эффект столкновения
      if (crashEffect) {
        crashEffect.style.opacity = '0';
      }
      this.isAnimating = false;
    } else {
      // СКРОЛЛ ВВЕРХ - движение к столкновению
      (cars[0] as HTMLElement).style.transform = `translateX(${progress * this.moveDistance}px)`;
      (cars[1] as HTMLElement).style.transform = `translateX(${-progress * this.moveDistance}px)`;
      
      // Эффект столкновения
      if (progress > 0.1 && !this.isAnimating) {
        // this.triggerCrash();
      }
    }
  }

  private triggerCrash() {
    this.isAnimating = true;
    const crashEffect = document.querySelector('.crash-effect') as HTMLElement;
    const cars = document.querySelectorAll('.car');
    
    if (crashEffect) {
      // Анимация эффекта столкновения
      crashEffect.style.opacity = '1';
      crashEffect.style.animation = 'crashFlash 0.3s ease-out';
      
      // Легкая тряска машин
      cars.forEach(car => {
        (car as HTMLElement).style.animation = 'carShake 0.5s ease-out';
      });
      
      // Убираем анимацию тряски после завершения
      setTimeout(() => {
        cars.forEach(car => {
          (car as HTMLElement).style.animation = '';
        });
      }, 500);
    }
  }
}