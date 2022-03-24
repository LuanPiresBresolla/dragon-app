import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonCardComponent } from './dragon-card.component';

describe('DragonCardComponent', () => {
  let component: DragonCardComponent;
  let fixture: ComponentFixture<DragonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragonCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
