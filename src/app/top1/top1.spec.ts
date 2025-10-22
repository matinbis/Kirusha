import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top1 } from './top1';

describe('Top1', () => {
  let component: Top1;
  let fixture: ComponentFixture<Top1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
