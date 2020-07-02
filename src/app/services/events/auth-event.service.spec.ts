import { TestBed } from '@angular/core/testing';

import { AuthEventService } from './auth-event.service';

describe('AuthEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthEventService = TestBed.get(AuthEventService);
    expect(service).toBeTruthy();
  });
});
