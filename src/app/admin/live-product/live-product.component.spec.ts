import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveProductComponent } from './live-product.component';

describe('LiveProductComponent', () => {
  let component: LiveProductComponent;
  let fixture: ComponentFixture<LiveProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
