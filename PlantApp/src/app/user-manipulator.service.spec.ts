import { TestBed } from '@angular/core/testing';

import { UserManipulatorService } from './user-manipulator.service';

describe('UserManipulatorService', () => {
  let service: UserManipulatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManipulatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
