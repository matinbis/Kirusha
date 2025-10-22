import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top5',
  imports: [CommonModule],
  templateUrl: './top5.html',
  styleUrl: './top5.scss'
})
export class Top5 {
  showCounters = false;
  arkValue = 0;
  kirValue = 0;
  isCounting = false;
  buttonText = 'СРАВНИТЬ';
  isButtonDisabled = false;

  startComparison() {
    if (this.isCounting) return;

    this.showCounters = true;
    this.isCounting = true;
    this.isButtonDisabled = true;
    this.buttonText = 'СРАВНЕНИЕ ЗАВЕРШЕНО';

    this.animateCounter('ark', -100, 2000);
    this.animateCounter('kir', 500, 2500);
  }

  private animateCounter(type: 'ark' | 'kir', targetValue: number, duration: number) {
    const startValue = 0;
    const startTime = performance.now();
    const updateInterval = 50; // ms

    const update = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      let currentValue: number;

      if (type === 'ark') {
        // Для обычного человека: быстро в минус
        currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
      } else {
        // Для Кирюши: с эффектом ускорения
        const easeInOutBack = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        currentValue = Math.floor(startValue + (targetValue - startValue) * easeInOutBack);
      }

      // Обновляем значение
      if (type === 'ark') {
        this.arkValue = currentValue;
      } else {
        this.kirValue = currentValue;
      }

      if (progress < 1) {
        setTimeout(() => {
          requestAnimationFrame(update);
        }, updateInterval);
      } else {
        // Финальное значение
        if (type === 'ark') {
          this.arkValue = targetValue;
        } else {
          this.kirValue = targetValue;
        }
      }
    };

    requestAnimationFrame(update);
  }

  getArkCounterClass() {
    return {
      'negative': this.arkValue < 0,
      'counting': this.isCounting && this.arkValue !== -100
    };
  }

  getKirCounterClass() {
    return {
      'positive': this.kirValue > 0,
      'counting': this.isCounting && this.kirValue !== 500
    };
  }
}
