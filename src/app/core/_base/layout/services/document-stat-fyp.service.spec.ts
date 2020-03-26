import { TestBed } from '@angular/core/testing';

import { DocumentStatFypService } from './document-stat-fyp.service';

describe('DocumentStatFypService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentStatFypService = TestBed.get(DocumentStatFypService);
    expect(service).toBeTruthy();
  });
});
