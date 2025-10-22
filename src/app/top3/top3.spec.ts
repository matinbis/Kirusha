import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top3 } from './top3';

describe('Top3', () => {
  let component: Top3;
  let fixture: ComponentFixture<Top3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
