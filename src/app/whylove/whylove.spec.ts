import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Whylove } from './whylove';

describe('Whylove', () => {
  let component: Whylove;
  let fixture: ComponentFixture<Whylove>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Whylove]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Whylove);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
