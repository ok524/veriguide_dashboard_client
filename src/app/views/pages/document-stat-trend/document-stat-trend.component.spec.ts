import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStatTrendComponent } from './document-stat-trend.component';

describe('DocumentStatTrendComponent', () => {
  let component: DocumentStatTrendComponent;
  let fixture: ComponentFixture<DocumentStatTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentStatTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentStatTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
