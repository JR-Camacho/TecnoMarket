import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicBarComponent } from './basic-bar.component';

describe('BasicBarComponent', () => {
  let component: BasicBarComponent;
  let fixture: ComponentFixture<BasicBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
