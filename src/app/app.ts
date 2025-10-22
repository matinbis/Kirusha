import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Whylove } from './whylove/whylove';
import { Top5 } from './top5/top5';
import { Top4 } from './top4/top4';
import { Top3 } from './top3/top3';
import { Top2 } from './top2/top2';
import { Top1 } from './top1/top1';


@Component({
  selector: 'app-root',
  imports: [Whylove, Top5, Top4, Top3, Top2, Top1],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Kirusha');
}
