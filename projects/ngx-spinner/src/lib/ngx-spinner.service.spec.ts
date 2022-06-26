import { TestBed } from "@angular/core/testing";

import { NgxSpinnerService } from "./ngx-spinner.service";

describe("NgxSpinnerService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: NgxSpinnerService = TestBed.get(NgxSpinnerService);
    expect(service).toBeTruthy();
  });
});
