import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStatLandingComponent } from './document-stat-landing.component';

describe('DocumentStatLandingComponent', () => {
  let component: DocumentStatLandingComponent;
  let fixture: ComponentFixture<DocumentStatLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentStatLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentStatLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
