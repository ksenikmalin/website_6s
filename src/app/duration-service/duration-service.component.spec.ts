import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationServiceComponent } from './duration-service.component';

describe('DurationServiceComponent', () => {
  let component: DurationServiceComponent;
  let fixture: ComponentFixture<DurationServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
