import { TestBed } from '@angular/core/testing';

import { EndpointsService } from './endpoints.service';

describe('EndpointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EndpointsService = TestBed.get(EndpointsService);
    expect(service).toBeTruthy();
  });
});
