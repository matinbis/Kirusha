import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top4 } from './top4';

describe('Top4', () => {
  let component: Top4;
  let fixture: ComponentFixture<Top4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
