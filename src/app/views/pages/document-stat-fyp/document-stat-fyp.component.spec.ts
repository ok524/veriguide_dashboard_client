import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStatFypComponent } from './document-stat-fyp.component';

describe('DocumentStatFypComponent', () => {
  let component: DocumentStatFypComponent;
  let fixture: ComponentFixture<DocumentStatFypComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentStatFypComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentStatFypComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
