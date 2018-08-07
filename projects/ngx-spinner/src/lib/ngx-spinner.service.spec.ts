import { TestBed, inject } from '@angular/core/testing';

import { NgxSpinnerService } from './ngx-spinner.service';

describe('NgxSpinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxSpinnerService]
    });
  });

  it('should be created', inject([NgxSpinnerService], (service: NgxSpinnerService) => {
    expect(service).toBeTruthy();
  }));
});
