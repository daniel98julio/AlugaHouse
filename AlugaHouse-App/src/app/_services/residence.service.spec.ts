/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResidenceService } from './residence.service';

describe('Service: Residence', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResidenceService]
    });
  });

  it('should ...', inject([ResidenceService], (service: ResidenceService) => {
    expect(service).toBeTruthy();
  }));
});
