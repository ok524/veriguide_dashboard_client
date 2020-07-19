import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetFiguresComponent } from './widget-figures.component';

describe('WidgetFiguresComponent', () => {
  let component: WidgetFiguresComponent;
  let fixture: ComponentFixture<WidgetFiguresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetFiguresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetFiguresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
