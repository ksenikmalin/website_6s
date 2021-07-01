import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectServiceComponent } from './object-service.component';

describe('ObjectServiceComponent', () => {
  let component: ObjectServiceComponent;
  let fixture: ComponentFixture<ObjectServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
