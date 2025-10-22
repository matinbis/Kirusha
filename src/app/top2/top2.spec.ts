import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top2 } from './top2';

describe('Top2', () => {
  let component: Top2;
  let fixture: ComponentFixture<Top2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
