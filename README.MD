A library with more than 50 different loading spinners for Angular 4 - 22. (https://napster2210.github.io/ngx-spinner/)

<p align="center">
  <img height="200px" width="200px" style="text-align: center;" src="https://cdn.rawgit.com/Napster2210/ngx-spinner/gh-pages/assets/logo.png">
  <h1 align="center">NgxSpinner</h1>
</p>

[![Support](https://img.shields.io/badge/Support-Angular%204%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%205%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%206%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%207%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%208%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%209%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%2010%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%2011%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%2012%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%2013%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%2014%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%2015%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%2016%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%2017%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%2018%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%2019%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%2021%2B-blue.svg?style=flat-square)](<>)
[![Support](https://img.shields.io/badge/Support-Angular%2022%2B-blue.svg?style=flat-square)](<>)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](<>)
[![Gitter](https://badges.gitter.im/ngx-spinner/community.svg)](https://gitter.im/ngx-spinner/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## What's New

- Angular 22 support 🥳🥳🥳🥳
- **Brand new demo/playground site** ([live here](https://napster2210.github.io/ngx-spinner/)) - a from-scratch redesign with a searchable animation gallery, a live preview stage driving the real `<ngx-spinner>` component, a configuration panel covering every option, and a generated-code panel (HTML template + TypeScript service usage) with one-click copy and a dark/light theme toggle. See [Demo](#demo).
- Optional HTTP interceptor - show/hide the spinner automatically around HTTP requests instead of calling `NgxSpinnerService` from every component. See [HTTP Interceptor](#http-interceptor).
- Fixed stacking behind `MatDialog` and other Angular CDK overlays - the fullscreen spinner now renders in the browser's native top layer via the [Popover API](https://developer.mozilla.org/docs/Web/API/Popover_API), with an opt-out via `[usePopover]="false"`. See [Available Options](#available-options).
- Fixed `ng add ngx-spinner` - it now works correctly for standalone apps (the Angular default since v17) in addition to NgModule-based apps, and no longer requires passing `--project` explicitly.

Use appropriate version based on your Angular version.

| Angular 22  | Angular 21  | Angular 19  | Angular 18  | Angular 17  |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| >=`v22.0.0` | >=`v21.0.0` | >=`v19.0.0` | >=`v18.0.0` | >=`v17.0.0` |

| Angular 16  | Angular 15  | Angular 14  | Angular 13  | Angular 12  | Angular 11  |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| >=`v16.0.2` | >=`v15.0.1` | >=`v14.0.0` | >=`v13.1.1` | >=`v12.0.0` | >=`v11.0.2` |

| Angular 10  | Angular 9  | Angular 8 | Angular 6/7 | Angular 5  | Angular 4  |
| ----------- | ---------- | --------- | ----------- | ---------- | ---------- |
| >=`v10.0.1` | >=`v9.0.1` | `v8.1.0`  | `v7.2.0`    | >=`v1.2.0` | >=`v2.0.0` |

## Table of contents

- [What's New](#whats-new)
- [Table of contents](#table-of-contents)
- [Browser Support](#browser-support)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Methods](#methods)
- [Available Options](#available-options)
  - [Using Spinner Type](#using-spinner-type)
  - [Using Custom Spinner](#using-custom-spinner)
  - [NOTE](#note)
  - [How to use type?](#how-to-use-type)
- [HTTP Interceptor](#http-interceptor)
- [Useful Tips](#useful-tips)
- [Versioning](#versioning)
- [Creator](#creator)
  - [Yuvraj Chauhan](#yuvraj-chauhan)
- [Ask Me](#ask-me)
- [Credits](#credits)
  - [License](#license)

## Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Latest ✔                                                                                                                                                                                                      | Latest ✔                                                                                                                                                                                                          | IE11, Edge ✔                                                                                                                                                                                                    | Latest ✔                                                                                                                                                                                                                  | Latest ✔                                                                                                                                                                                                  |

## Features

- **Angular 22** Support
- Custom spinner image support(gif), you can pass `img` tag
- Multiple Spinners
- Configurable option through service
- Fullscreen Mode(Enable/Disable)
- Renders above `MatDialog` and other Angular CDK overlays via the native Popover API, with an opt-out
- `show()/hide()` methods return promise
- Dynamic `z-index`
- Smooth animation while `hide/show` the spinner
- Redesigned demo/playground site with a live preview, generated-code panel, and dark/light theme
- Option to disable fade animation
- Show/Hide spinner from template using @Input() variable
- Smaller bundle size
- Optional HTTP interceptor to drive the spinner from HTTP activity, with no changes required to existing `NgxSpinnerService`/`<ngx-spinner>` usage
- Single-command setup via `ng add ngx-spinner`, for both standalone and NgModule-based apps

## Demo

[Working Demo](https://napster2210.github.io/ngx-spinner/) - a redesigned playground for exploring the library, built entirely with the real `ngx-spinner` package (not a mockup). It gives you:

- A searchable gallery of all 53+ animation types, grouped for quick scanning.
- A live preview stage that renders the real `<ngx-spinner>` component with your chosen options, including a working "Show spinner" trigger for both fullscreen and contained modes.
- A configuration panel covering every real option - `size`, `color`, `bdColor` (with an opacity slider), `fullScreen`, `name`, `zIndex`, `showSpinner`, `disableAnimation`, `usePopover`, loading text, and a custom-template field for the image/gif use case.
- A generated-code panel with a one-click copy button, switchable between the HTML template usage and the `NgxSpinnerService` usage shown below.
- A dark/light theme toggle, and a responsive layout that stacks cleanly on mobile.

## Installation

`ngx-spinner` is available via [npm](https://www.npmjs.com/package/ngx-spinner) and [yarn](https://yarnpkg.com/en/package/ngx-spinner)

Using npm:

```bash
$ npm install ngx-spinner --save
```

Using yarn:

```bash
$ yarn add ngx-spinner
```

Using angular-cli:

```bash
$ ng add ngx-spinner
```

## Usage

Add css animation files to angular.json config

```jsonc
{
  "styles": [
    "node_modules/ngx-spinner/animations/ball-scale-multiple.css", // ===> Add css file based on your animation name(here it's "ball-scale-multiple")
    // You're able to add multiple files if you need
  ],
}
```

Import `NgxSpinnerModule` in in the root module(`AppModule`):

```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    // ...
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

#### NOTE

- There is possibility to use global configuration for NgxSpinnerModule.
- Just call `forRoot` method for NgxSpinnerModule and pass configuration object.
- The input properties of NgxSpinnerComponent has higher priority than global options

```typescript
// Available options
interface NgxSpinnerConfig {
  type?: string;
}
// Use in app
@NgModule({
  imports: [
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
```

Add `NgxSpinnerService` service wherever you want to use the `ngx-spinner`.

```typescript
import { NgxSpinnerService } from "ngx-spinner";

class AppComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
}
```

Now use in your template

```html
<ngx-spinner type="ball-scale-multiple"></ngx-spinner>
```

See [Demo](#demo)

## Methods

- `NgxSpinnerService.show()` Shows the spinner
- `NgxSpinnerService.hide()` Hides the spinner

## Available Options

- **[bdColor]**: RGBA color format.
  To set background-color for backdrop, default `rgba(51,51,51,0.8)` where `alpha` value(0.8) is opacity of backdrop
- **[size]**: Anyone from `small`, `default`, `medium`, `large`.
  To set size of spinner, default `large`
- **[color]**: Any css color format.
  To set color of spinner, default `#fff`
- **[type]**: Choose any animation spinner from [Load Awesome](http://github.danielcardoso.net/load-awesome/animations.html).
  To set type of spinner
- **[fullScreen]**: `true` or `false`
  To enable/disable fullscreen mode(overlay), default `true`
- **[name]**: For multiple spinners
  To set name for spinner, default `primary`
- **[zIndex]**: For dynamic z-index
  To set z-index for the spinner, default `99999`
- **[template]**: For custom spinner image
  To set custom template for the custom spinner, default `null`
- **[showSpinner]**: `true` or `false`
  To show/hide spinner from template using variable
- **[disableAnimation]**: `true` or `false`
  To enable/disable fade animation of spinner, default `false`
- **[usePopover]**: `true` or `false`
  Since Angular CDK v21, overlays like `MatDialog` render in the browser's native "top layer" by default, which ignores normal `z-index` stacking. When `fullScreen` is `true` (default), ngx-spinner also promotes its overlay into the top layer via the native [Popover API](https://developer.mozilla.org/docs/Web/API/Popover_API) so it can render above such overlays, falling back automatically in browsers without Popover API support. Set to `false` to opt out and use the legacy fixed-position overlay instead. Default `true`. Has no effect when `fullScreen` is `false`. Can also be set globally via `provideSpinnerConfig({ usePopover: false })`.

#### Using Spinner Type

```html
<ngx-spinner
  bdColor="rgba(51,51,51,0.8)"
  size="medium"
  color="#fff"
  type="ball-scale-multiple"
>
  <p style="font-size: 20px; color: white">Loading...</p>
</ngx-spinner>
```

#### Using Custom Spinner

```html
<ngx-spinner
  bdColor="rgba(0, 0, 0, 1)"
  template="<img src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif' />"
>
</ngx-spinner>
```

---

#### NOTE

- You can pass `HTML` code as loading text now, instead of input parameter(`loadingText`). Check above code for reference.
- If you want multiple `ngx-spinner` instance, just add `name` attribute with `ngx-spinner` component. But in this case, you've to pass that particular name of a spinner in `show/hide` method. Check [Demo](#demo)
- You can also change the options/configuration of spinner through service now.
- For smaller bundle size, add specific css file under "styles" array in `angular.json` file

```javascript
this.spinner.show("mySpinner", {
  type: "line-scale-party",
  size: "large",
  bdColor: "rgba(0, 0, 0, 1)",
  color: "white",
  template:
    "<img src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif' />",
});
```

### How to use type?

- Go to the [Load Awesome](http://github.danielcardoso.net/load-awesome/animations.html).
- Select any animation, copy name of animation, replace all spaces with hyphen(-) and all letters should be lowercase.
  - Let's say if I select "Ball 8bits" animation then `type` will be `ball-8bits`.
  - For more information you can check it out [Demo](https://napster2210.github.io/ngx-spinner/)
  - For smaller bundle size you need to add css for `ball-8bits` animation(e.g. `ball-8bits.css`)

## HTTP Interceptor

This is entirely **optional** - `NgxSpinnerService` and `<ngx-spinner>` continue to work exactly as before whether or not you use it. If you'd rather not call `show()`/`hide()` from every component that makes an HTTP call, you can register the interceptor once and it will show the spinner while requests are in flight and hide it once they've all completed.

It keeps a count of concurrent requests per spinner name, so the spinner only hides after every in-flight request for that name has finished - not just the first one to complete.

#### Standalone apps

```ts
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ngxSpinnerInterceptor } from "ngx-spinner";

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([ngxSpinnerInterceptor]))],
});
```

#### NgModule-based apps

```ts
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxSpinnerInterceptor } from "ngx-spinner";

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgxSpinnerInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
```

#### Configuration

By default the interceptor drives the `primary` spinner with no extra options. Customize it via `provideNgxSpinnerHttpConfig()` (or the equivalent `NGX_SPINNER_HTTP_CONFIG` provider in an NgModule app):

```ts
import { provideNgxSpinnerHttpConfig } from "ngx-spinner";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([ngxSpinnerInterceptor])),
    provideNgxSpinnerHttpConfig({
      name: "httpSpinner", // which spinner to show/hide, default `primary`
      spinner: { type: "ball-scale-multiple", color: "#fff" }, // extra show() options
      excludedUrls: ["/api/poll", /\/assets\//], // strings or RegExp, matched against the request URL
    }),
  ],
});
```

#### Skipping individual requests

Opt a single request out of the interceptor via its `HttpContext`, regardless of `excludedUrls`:

```ts
import { HttpContext } from "@angular/common/http";
import { NGX_SPINNER_SKIP } from "ngx-spinner";

this.http.get("/api/background-sync", {
  context: new HttpContext().set(NGX_SPINNER_SKIP, true),
});
```

#### NOTE

- If you're already showing the same spinner `name` manually elsewhere (e.g. `spinnerService.show('primary')` for a non-HTTP reason) while the interceptor is also driving it, the two aren't aware of each other - whichever one hides it last wins. Use a dedicated `name` for the interceptor via `provideNgxSpinnerHttpConfig({ name: '...' })` if you want to avoid that overlap.

## Useful Tips

- Make sure you've added `CUSTOM_ELEMENTS_SCHEMA` as your schema in your main module.
- If you use multiple `show()` methods in a single component or single function one after another then wrap the `show()` method within `setTimeout()` method to avoid any rendering issue.
- When you want to use spinner inside any container(`fullScreen: false`), in that case your parent element of spinner must have `position: relative;` style property.
- You can't set custom template through service options, it's a limitation by Angular itself.

## Versioning

ngx-spinner will be maintained under the Semantic Versioning guidelines.
Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

For more information on SemVer, please visit http://semver.org.

## Creator

#### [Yuvraj Chauhan](mailto:yuvrajchauhan3113@gmail.com)

- [@GitHub](https://github.com/Napster2210)

## Ask Me

- Now you can directly send me a message on [Gitter](https://gitter.im/ngx-spinner/community) for any query/suggestion/updates

## Credits

Inspired by [Load Awesome by Daniel Cardoso.](https://github.com/danielcardoso/load-awesome)

Thanks [Alex Vieira Alencar](https://github.com/iamavieira) for helping me with Multiple Spinner Support.

Thanks [ennjin](https://github.com/ennjin) for reducing the bundle size.

### License

ngx-spinner is [MIT licensed](./LICENSE).
