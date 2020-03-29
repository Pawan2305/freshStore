import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledOrderComponent } from './cancelled-order.component';

describe('CancelledOrderComponent', () => {
  let component: CancelledOrderComponent;
  let fixture: ComponentFixture<CancelledOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelledOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
