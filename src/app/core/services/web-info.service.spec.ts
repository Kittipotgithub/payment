import { TestBed } from '@angular/core/testing';

import { WebInfoService } from './web-info.service';

describe('WebInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebInfoService = TestBed.get(WebInfoService);
    expect(service).toBeTruthy();
  });
});
