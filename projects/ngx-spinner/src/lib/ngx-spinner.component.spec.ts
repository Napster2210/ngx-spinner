import { ChangeDetectorRef, SimpleChange } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { NgxSpinnerComponent } from "./ngx-spinner.component";
import { NgxSpinnerService } from "./ngx-spinner.service";
import { SafeHtmlPipe } from "./safe-html.pipe";

describe("NgxSpinnerComponent", () => {
  let component: NgxSpinnerComponent;
  let fixture: ComponentFixture<NgxSpinnerComponent>;
  let elementStyle: CSSStyleDeclaration;
  let spinnerService: NgxSpinnerService;
  let spinnerSpyGet: any;
  let spinnerSpyShow: any;
  let spinnerSpyHide: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NgxSpinnerComponent, SafeHtmlPipe],
      imports: [NoopAnimationsModule],
      providers: [NgxSpinnerService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSpinnerComponent);
    component = fixture.componentInstance;
    component.show = true;

    spinnerService = fixture.debugElement.injector.get(NgxSpinnerService);
    spinnerSpyGet = spyOn(spinnerService, "getSpinner").and.callThrough();
    spinnerSpyShow = spyOn(spinnerService, "show").and.callThrough();
    spinnerSpyHide = spyOn(spinnerService, "hide").and.callThrough();
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe("the bdColor input", () => {
    describe("when not specified", () => {
      it("should set the default background color", () => {
        fixture.detectChanges();

        elementStyle = getComputedStyle(
          fixture.nativeElement.querySelector(".ngx-spinner-overlay")
        );
        expect(elementStyle.backgroundColor).toBe("rgba(51, 51, 51, 0.8)");
      });
    });

    describe("when specified", () => {
      it("should set the specified background color", () => {
        const specifiedColor = "rgba(255, 99, 71, 0.6)";
        component.bdColor = specifiedColor;
        fixture.detectChanges();

        elementStyle = getComputedStyle(
          fixture.nativeElement.querySelector(".ngx-spinner-overlay")
        );
        expect(elementStyle.backgroundColor).toBe(specifiedColor);
      });
    });
  });

  describe("the size input", () => {
    describe("when not specified", () => {
      it("should set the appropriate class", () => {
        fixture.detectChanges();
        component.onInputChange();
        const cdr = fixture.debugElement.injector.get<ChangeDetectorRef>(
          ChangeDetectorRef as any
        );
        cdr.detectChanges();

        const parentElement = fixture.debugElement.nativeElement.querySelector(
          ".ngx-spinner-overlay"
        );
        const childElement = parentElement.querySelector("div");
        expect(childElement.getAttribute("class")).toContain("la-3x");
      });
    });

    describe("when specified", () => {
      it("should set the appropriate class", () => {
        component.size = "small";
        fixture.detectChanges();
        component.onInputChange();
        const cdr = fixture.debugElement.injector.get<ChangeDetectorRef>(
          ChangeDetectorRef as any
        );
        cdr.detectChanges();

        const parentElement = fixture.debugElement.nativeElement.querySelector(
          ".ngx-spinner-overlay"
        );
        const childElement = parentElement.querySelector("div");
        expect(childElement.getAttribute("class")).toContain("la-sm");
      });
    });
  });

  describe("the color input", () => {
    describe("when not specified", () => {
      it("should set the default #fff color", () => {
        fixture.detectChanges();

        const parentElement = fixture.debugElement.nativeElement.querySelector(
          ".ngx-spinner-overlay"
        );
        const childElementStyle = getComputedStyle(
          parentElement.querySelector("div")
        );
        expect(childElementStyle.color).toContain("rgb(255, 255, 255)");
      });
    });

    describe("when specified", () => {
      it("should set the specified color", () => {
        const specifiedColor = "rgba(255, 99, 71, 0.6)";
        component.color = specifiedColor;
        fixture.detectChanges();

        const parentElement = fixture.debugElement.nativeElement.querySelector(
          ".ngx-spinner-overlay"
        );
        const childElementStyle = getComputedStyle(
          parentElement.querySelector("div")
        );
        expect(childElementStyle.color).toContain(specifiedColor);
      });
    });
  });

  describe("the type input", () => {
    describe("when not specified", () => {
      it("should set the appropriate class", () => {
        fixture.detectChanges();
        component.onInputChange();
        const cdr = fixture.debugElement.injector.get<ChangeDetectorRef>(
          ChangeDetectorRef as any
        );
        cdr.detectChanges();

        const parentElement = fixture.debugElement.nativeElement.querySelector(
          ".ngx-spinner-overlay"
        );
        const childElement = parentElement.querySelector("div");
        expect(childElement.getAttribute("class")).toContain(
          "la-ball-scale-multiple"
        );
      });
    });

    describe("when specified", () => {
      it("should set the appropriate class", () => {
        component.type = "fire";
        fixture.detectChanges();
        component.onInputChange();
        const cdr = fixture.debugElement.injector.get<ChangeDetectorRef>(
          ChangeDetectorRef as any
        );
        cdr.detectChanges();

        const parentElement = fixture.debugElement.nativeElement.querySelector(
          ".ngx-spinner-overlay"
        );
        const childElement = parentElement.querySelector("div");
        expect(childElement.getAttribute("class")).toContain("la-fire");
      });
    });
  });

  describe("the fullScreen input", () => {
    describe("when not specified", () => {
      it("should set the default fixed poition", () => {
        fixture.detectChanges();

        elementStyle = getComputedStyle(
          fixture.nativeElement.querySelector(".ngx-spinner-overlay")
        );
        expect(elementStyle.position).toBe("fixed");
      });
    });

    describe("when specified", () => {
      it("should set the absolute position if false", () => {
        component.fullScreen = false;
        fixture.detectChanges();

        elementStyle = getComputedStyle(
          fixture.nativeElement.querySelector(".ngx-spinner-overlay")
        );
        expect(elementStyle.position).toBe("absolute");
      });
    });
  });

  describe("the name input", () => {
    describe("when not specified", () => {
      it("should call getSpinner with the default name", () => {
        fixture.detectChanges();

        expect(spinnerSpyGet).toHaveBeenCalledWith("primary");
      });
    });

    describe("when specified", () => {
      it("should call getSpinner with the specified name", () => {
        const specifiedName = "custom-name";
        component.name = specifiedName;
        fixture.detectChanges();

        expect(spinnerSpyGet).toHaveBeenCalledWith(specifiedName);
      });
    });
  });

  describe("the zIndex input", () => {
    describe("when not specified", () => {
      it("should set the default zIndex value", () => {
        fixture.detectChanges();

        elementStyle = getComputedStyle(
          fixture.nativeElement.querySelector(".ngx-spinner-overlay")
        );
        const secondElementStyle = getComputedStyle(
          fixture.nativeElement.querySelector(".loading-text")
        );
        expect(elementStyle.zIndex).toBe("99999");
        expect(secondElementStyle.zIndex).toBe("99999");
      });
    });

    describe("when specified", () => {
      it("should set the specified zIndex value", () => {
        const specifiedZIndex = 99;
        component.zIndex = specifiedZIndex;
        fixture.detectChanges();

        elementStyle = getComputedStyle(
          fixture.nativeElement.querySelector(".ngx-spinner-overlay")
        );
        const secondElementStyle = getComputedStyle(
          fixture.nativeElement.querySelector(".loading-text")
        );
        expect(elementStyle.zIndex).toBe("" + specifiedZIndex);
        expect(secondElementStyle.zIndex).toBe("" + specifiedZIndex);
      });
    });
  });

  describe("the template input", () => {
    describe("when not specified", () => {
      it("should set the default null value", () => {
        fixture.detectChanges();

        const parentElement = fixture.debugElement.nativeElement.querySelector(
          ".ngx-spinner-overlay"
        );
        const childElement = parentElement.querySelector("div");
        expect(childElement.textContent).toBe("");
      });
    });

    describe("when specified", () => {
      it("should set the specified zIndex value", () => {
        const specifiedTemplate = "test template";
        component.template = specifiedTemplate;
        fixture.detectChanges();

        const parentElement = fixture.debugElement.nativeElement.querySelector(
          ".ngx-spinner-overlay"
        );
        const childElement = parentElement.querySelector("div");
        expect(childElement.textContent).toBe(specifiedTemplate);
      });
    });
  });

  describe("the showSpinner input", () => {
    describe("when not specified", () => {
      it("should set showSpinner to false", () => {
        fixture.detectChanges();

        expect(component.showSpinner).toBe(false);
      });
    });

    describe("when specified", () => {
      it("should call show() from spinner service if true specified", () => {
        fixture.detectChanges();
        component.ngOnChanges({
          showSpinner: new SimpleChange(component.showSpinner, true, false),
        });

        expect(spinnerSpyShow).toHaveBeenCalled();
      });

      it("should call hide() from spinner service if false specified", () => {
        fixture.detectChanges();
        component.ngOnChanges({
          showSpinner: new SimpleChange(true, component.showSpinner, false),
        });

        expect(spinnerSpyHide).toHaveBeenCalled();
      });
    });
  });

  describe("the disableAnimation input", () => {
    describe("when not specified", () => {
      it("should not set the ng-animate-disabled class", () => {
        fixture.detectChanges();

        const element = fixture.debugElement.nativeElement.querySelector(
          ".ngx-spinner-overlay"
        );
        expect(element.getAttribute("class")).not.toContain(
          "ng-animate-disabled"
        );
      });
    });

    describe("when specified", () => {
      it("should set the absolute position if false", () => {
        component.disableAnimation = true;
        fixture.detectChanges();

        const element = fixture.debugElement.nativeElement.querySelector(
          ".ngx-spinner-overlay"
        );
        expect(element.getAttribute("class")).toContain("ng-animate-disabled");
      });
    });
  });
});
