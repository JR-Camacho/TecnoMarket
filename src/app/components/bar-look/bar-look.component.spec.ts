import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarLookComponent } from './bar-look.component';

describe('BarLookComponent', () => {
  let component: BarLookComponent;
  let fixture: ComponentFixture<BarLookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarLookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarLookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
