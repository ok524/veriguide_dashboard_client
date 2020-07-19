import { TestBed } from '@angular/core/testing';

import { DocumentStatService } from './document-stat.service';

describe('DocumentStatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentStatService = TestBed.get(DocumentStatService);
    expect(service).toBeTruthy();
  });
});
