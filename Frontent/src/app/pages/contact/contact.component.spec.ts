import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { contactComponent } from './contact.component';

describe('contactComponent', () => {
  let component: contactComponent;
  let fixture: ComponentFixture<contactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ contactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(contactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
