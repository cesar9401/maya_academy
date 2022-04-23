import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityElementComponent } from './activity-element.component';

describe('ActivityElementComponent', () => {
  let component: ActivityElementComponent;
  let fixture: ComponentFixture<ActivityElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
