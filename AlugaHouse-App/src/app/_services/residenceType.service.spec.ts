/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResidenceTypeService } from './residenceType.service';

describe('Service: ResidenceType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResidenceTypeService]
    });
  });

  it('should ...', inject([ResidenceTypeService], (service: ResidenceTypeService) => {
    expect(service).toBeTruthy();
  }));
});
