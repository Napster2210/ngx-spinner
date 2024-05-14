import { ChangeDetectorRef, SimpleChange } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerComponent } from "./ngx-spinner.component";
import { NgxSpinnerService } from "./ngx-spinner.service";
import { SafeHtmlPipe } from "./safe-html.pipe";
import { Size } from "./ngx-spinner.enum";

describe("NgxSpinnerComponent", () => {
  let component: NgxSpinnerComponent;
  let fixture: ComponentFixture<NgxSpinnerComponent>;
  let elementStyle: CSSStyleDeclaration;
  let spinnerService: NgxSpinnerService;
  let spinnerSpyGet: jasmine.Spy;
  let spinnerSpyShow: jasmine.Spy;
  let spinnerSpyHide: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, NgxSpinnerComponent, SafeHtmlPipe],
      providers: [NgxSpinnerService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSpinnerComponent);
    component = fixture.componentInstance;
    component.show = true;

    spinnerService = TestBed.inject(NgxSpinnerService);
    spinnerSpyGet = spyOn(spinnerService, "getSpinner").and.callThrough();
    spinnerSpyShow = spyOn(spinnerService, "show").and.callThrough();
    spinnerSpyHide = spyOn(spinnerService, "hide").and.callThrough();
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  const testBackgroundColor = (
    specifiedColor: string,
    expectedColor: string,
  ) => {
    component.bdColor = specifiedColor;
    fixture.detectChanges();
    elementStyle = getComputedStyle(
      fixture.nativeElement.querySelector(".ngx-spinner-overlay"),
    );
    expect(elementStyle.backgroundColor).toBe(expectedColor);
  };

  describe("bdColor input", () => {
    it("should set the default background color when not specified", () => {
      testBackgroundColor(undefined, "rgba(51, 51, 51, 0.8)");
    });

    it("should set the specified background color when specified", () => {
      testBackgroundColor("rgba(255, 99, 71, 0.6)", "rgba(255, 99, 71, 0.6)");
    });
  });

  const testSizeClass = (specifiedSize: Size, expectedClass: string) => {
    component.size = specifiedSize;
    fixture.detectChanges();
    component.onInputChange();
    fixture.detectChanges();
    const childElement = fixture.nativeElement.querySelector(
      ".ngx-spinner-overlay div",
    );
    expect(childElement.getAttribute("class")).toContain(expectedClass);
  };

  describe("size input", () => {
    it("should set the large size class when not specified", () => {
      testSizeClass(undefined, "la-3x");
    });

    it("should set the small size class when specified", () => {
      testSizeClass("small", "la-sm");
    });
  });

  const testColor = (specifiedColor: string, expectedColor: string) => {
    component.color = specifiedColor;
    fixture.detectChanges();
    const childElementStyle = getComputedStyle(
      fixture.nativeElement.querySelector(".ngx-spinner-overlay div"),
    );
    expect(childElementStyle.color).toContain(expectedColor);
  };

  describe("color input", () => {
    it("should set the default color when not specified", () => {
      testColor(undefined, "rgb(255, 255, 255)");
    });

    it("should set the specified color when specified", () => {
      testColor("rgba(255, 99, 71, 0.6)", "rgba(255, 99, 71, 0.6)");
    });
  });

  const testTypeClass = (specifiedType: string, expectedClass: string) => {
    component.type = specifiedType;
    fixture.detectChanges();
    component.onInputChange();
    fixture.detectChanges();
    const childElement = fixture.nativeElement.querySelector(
      ".ngx-spinner-overlay div",
    );
    expect(childElement.getAttribute("class")).toContain(expectedClass);
  };

  describe("type input", () => {
    it("should set the default type class when not specified", () => {
      testTypeClass(undefined, "la-ball-scale-multiple");
    });

    it("should set the specified type class when specified", () => {
      testTypeClass("fire", "la-fire");
    });
  });

  const testPosition = (fullScreen: boolean, expectedPosition: string) => {
    component.fullScreen = fullScreen;
    fixture.detectChanges();
    elementStyle = getComputedStyle(
      fixture.nativeElement.querySelector(".ngx-spinner-overlay"),
    );
    expect(elementStyle.position).toBe(expectedPosition);
  };

  describe("fullScreen input", () => {
    it("should set the fixed position when not specified", () => {
      testPosition(undefined, "fixed");
    });

    it("should set the absolute position when specified as false", () => {
      testPosition(false, "absolute");
    });
  });

  describe("name input", () => {
    it("should call getSpinner with the default name when not specified", () => {
      fixture.detectChanges();
      expect(spinnerSpyGet).toHaveBeenCalledWith("primary");
    });

    it("should call getSpinner with the specified name", () => {
      const specifiedName = "custom-name";
      component.name = specifiedName;
      fixture.detectChanges();
      expect(spinnerSpyGet).toHaveBeenCalledWith(specifiedName);
    });
  });

  const testZIndex = (specifiedZIndex: number, expectedZIndex: string) => {
    component.zIndex = specifiedZIndex;
    fixture.detectChanges();
    elementStyle = getComputedStyle(
      fixture.nativeElement.querySelector(".ngx-spinner-overlay"),
    );
    const secondElementStyle = getComputedStyle(
      fixture.nativeElement.querySelector(".loading-text"),
    );
    expect(elementStyle.zIndex).toBe(expectedZIndex);
    expect(secondElementStyle.zIndex).toBe(expectedZIndex);
  };

  describe("zIndex input", () => {
    it("should set the default zIndex value when not specified", () => {
      testZIndex(undefined, "99999");
    });

    it("should set the specified zIndex value", () => {
      testZIndex(99, "99");
    });
  });

  const testTemplate = (specifiedTemplate: string, expectedContent: string) => {
    component.template = specifiedTemplate;
    fixture.detectChanges();
    const childElement = fixture.nativeElement.querySelector(
      ".ngx-spinner-overlay div",
    );
    expect(childElement.textContent).toBe(expectedContent);
  };

  describe("template input", () => {
    it("should set the default null value when not specified", () => {
      testTemplate(undefined, "");
    });

    it("should set the specified template content", () => {
      testTemplate("test template", "test template");
    });
  });

  describe("showSpinner input", () => {
    it("should default to false when not specified", () => {
      fixture.detectChanges();
      expect(component.showSpinner).toBe(false);
    });

    it("should call show() from spinner service when true specified", () => {
      component.showSpinner = true;
      fixture.detectChanges();
      component.ngOnChanges({
        showSpinner: new SimpleChange(false, true, false),
      });
      expect(spinnerSpyShow).toHaveBeenCalled();
    });

    it("should call hide() from spinner service when false specified", () => {
      component.showSpinner = false;
      fixture.detectChanges();
      component.ngOnChanges({
        showSpinner: new SimpleChange(true, false, false),
      });
      expect(spinnerSpyHide).toHaveBeenCalled();
    });
  });

  const testDisableAnimation = (
    disableAnimation: boolean,
    expectedClass: string,
  ) => {
    component.disableAnimation = disableAnimation;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector(".ngx-spinner-overlay");
    expect(element.getAttribute("class")).toContain(expectedClass);
  };

  describe("disableAnimation input", () => {
    it("should not set the ng-animate-disabled class when not specified", () => {
      testDisableAnimation(undefined, "");
    });

    it("should set the ng-animate-disabled class when specified as true", () => {
      testDisableAnimation(true, "ng-animate-disabled");
    });
  });
});
