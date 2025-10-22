import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-top1',
  imports: [],
  templateUrl: './top1.html',
  styleUrl: './top1.scss'
})
export class Top1 {
  @ViewChild('hiddenText') hiddenText!: ElementRef;
  @ViewChild('animatedText') animatedText!: ElementRef;
  @ViewChild('smileyContainer') smileyContainer!: ElementRef;
  
  isAnimating = false;
  private fullText = 'А Я ДОБРАЯ УЛЫБКА)))';
  private intermediateText = 'Б О Л Ь Ш О Й... Х У...';

  async startReveal() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    const textElement = this.animatedText.nativeElement;
    const smileyElement = this.smileyContainer.nativeElement;
    
    // Сначала показываем промежуточный текст
    textElement.textContent = '';
    textElement.style.opacity = '1';
    
    // Анимация появления букв Б О Л Ь Ш О Й... Х У...
    await this.typeText(this.intermediateText, 100);
    
    // Пауза для драматизма
    await this.delay(1000);
    
    // Стираем "ОЙ ХУ"
    await this.eraseText(13, 80);
    
    // Пауза
    await this.delay(500);
    
    // Пишем "БОЛЬШАЯ ДОБРАЯ УЛЫБКА"
    await this.typeText(this.fullText, 120);
    
    // Показываем смайлик
    await this.showSmiley();
    
    this.isAnimating = false;
  }

  private async typeText(text: string, speed: number) {
    const textElement = this.animatedText.nativeElement;
    
    for (let i = 0; i < text.length; i++) {
      textElement.textContent += text[i];
      await this.delay(speed);
    }
  }

  private async eraseText(count: number, speed: number) {
    const textElement = this.animatedText.nativeElement;
    const currentText = textElement.textContent;
    
    for (let i = 0; i < count; i++) {
      textElement.textContent = currentText.slice(0, -i - 1);
      await this.delay(speed);
    }
  }

  private async showSmiley() {
    const smileyElement: HTMLElement = this.smileyContainer.nativeElement;
    const face: HTMLElement = smileyElement.querySelector('.face')!;
    const eyes: NodeListOf<HTMLElement> = smileyElement.querySelectorAll('.eye');
    const smile: HTMLElement = smileyElement.querySelector('.smile')!;
    
    // Сначала показываем контейнер
    smileyElement.style.opacity = '1';
    
    // Сбрасываем все анимации и стили
    face.style.animation = 'none';
    eyes.forEach(eye => eye.style.animation = 'none');
    smile.style.animation = 'none';
    
    // Ждем следующего фрейма
    await this.delay(50);
    
    // Анимация лица
    face.style.animation = 'faceAppear 0.8s ease-out forwards';
    await this.delay(800);
    
    // Анимация глаз
    eyes.forEach((eye: HTMLElement, index: number) => {
        setTimeout(() => {
            eye.style.animation = 'eyeAppear 0.5s ease-out forwards';
        }, index * 200);
    });
    await this.delay(600);
    
    // Анимация улыбки
    smile.style.animation = 'smileAppear 0.7s ease-out forwards';
    await this.delay(700);
    
    // Убираем все анимации и устанавливаем финальные стили
    face.style.animation = 'none';
    eyes.forEach(eye => eye.style.animation = 'none');
    smile.style.animation = 'none';
    
    // Устанавливаем финальные состояния вручную
    face.style.opacity = '1';
    face.style.transform = 'scale(1)';
    eyes.forEach(eye => {
        eye.style.opacity = '1';
        eye.style.transform = 'scale(1)';
    });
    smile.style.opacity = '1';
    smile.style.transform = 'translateX(-50%) scaleX(1)';
    
    // Ждем немного перед финальной анимацией
    await this.delay(300);
    
    // Финальная плавающая анимация
    face.style.animation = 'smileyFloat 3s ease-in-out infinite';
}

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}