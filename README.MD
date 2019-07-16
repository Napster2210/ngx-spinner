<p align="center">
  <img height="200px" width="200px" style="text-align: center;" src="https://cdn.rawgit.com/Napster2210/ngx-spinner/gh-pages/assets/logo.png">
  <h1 align="center">NgxSpinner</h1>
</p>

A library for loading spinner specifically for Angular 4/5/6/7/8. (https://napster2210.github.io/ngx-spinner/)

[![ng5](https://img.shields.io/travis/rust-lang/rust.svg?style=flat-square)]()
[![Support](https://img.shields.io/badge/Support-Angular%204%2B-blue.svg?style=flat-square)]()
[![Support](https://img.shields.io/badge/Support-Angular%205%2B-blue.svg?style=flat-square)]()
[![Support](https://img.shields.io/badge/Support-Angular%206%2B-blue.svg?style=flat-square)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)]()
[![devDependency Status](https://img.shields.io/david/expressjs/express.svg?style=flat-square)]()

## What's New

- Latest update for **Angular 8** 🎉🎉🥳🥳
- Multiple Spinner Support 🎉🎉🥳🥳
- Configurable option through service 🎉🎉🥳🥳
- Fullscreen Mode(Enable/Disable)
- `show()/hide()` methods return promise

Use appropriate version based on your Angular version.

| Angular 4   | Angular 5   | Angular 6/7 | Angular 8   |
| ----------- | ----------- | ----------- | ----------- |
| >= `v1.2.0` | >= `v2.0.0` | >= `v7.2.0` | >= `v8.0.3` |

## Table of contents

- [Browser Support](#browser-support)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Versioning](#versioning)
- [Creator](#creator)
- [Future Plan](#future-plan)
- [Credits](#credits)
- [License](#license)

## Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Latest ✔                                                                                                                                                                                                      | Latest ✔                                                                                                                                                                                                          | IE11, Edge ✔                                                                                                                                                                                                    | Latest ✔                                                                                                                                                                                                                  | Latest ✔                                                                                                                                                                                                  |

## Demo

[Working Demo](https://napster2210.github.io/ngx-spinner/)

### StackBlitz Demo:

- [Normal Usage](https://stackblitz.com/edit/angular-kruvnm)

- [Inside Container](https://stackblitz.com/edit/angular-7arfhb)

- [Multiple Spinner](https://stackblitz.com/edit/angular-utwjxi)

- [Change Options Through Service](https://stackblitz.com/edit/angular-exgxk2)

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

## Usage

Import `NgxSpinnerModule` in in the root module(`AppModule`):

```typescript
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    // ...
    NgxSpinnerModule
  ]
})
export class AppModule {}
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
<ngx-spinner></ngx-spinner>
```

See [Demo](#demo)

## NgxSpinner Service

- `NgxSpinnerService.show()` Shows the spinner
- `NgxSpinnerService.hide()` Hides the spinner

## NgxSpinner Component

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

- **[bdColor]**: RGBA color format.
  To set background-color for backdrop, default `rgba(51,51,51,0.8)` where `aplha` value(0.8) is opacity of backdrop
- **[size]**: Anyone from `small`, `default`, `medium`, `large`.
  To set size of spinner, default `large`
- **[color]**: Any css color format.
  To set color of spinner, default `#fff`
- **[type]**: Choose any animation spinner from [Load Awesome](http://github.danielcardoso.net/load-awesome/animations.html).
  To set type of spinner, default `ball-scale-multiple`
- **[fullScreen]**: `true` or `false`
  To enable/disable fullscreen mode(overlay), default `true`
- **[name]**: For multiple spinners
  To set name for spinner, default `primary`

---

#### NOTE:

- You can pass `HTML` code as loading text now, instead of input parameter(`loadingText`). Check above code for reference.
- If you want multiple `ngx-spinner` instance, just add `name` attribute with `ngx-spinner` component. But in this case, you've to pass that particular name of a spinner in `show/hide` method. Check [Demo](#demo)
- You can also change the options/configuration of spinner through service now.

```javascript
this.spinner.show("mySpinner", {
  type: "line-scale-party",
  size: "large",
  bdColor: "rgba(100,149,237, .8)",
  color: "white"
});
```

### How to use type?

- Go to the [Load Awesome](http://github.danielcardoso.net/load-awesome/animations.html).
- Select any animation, copy name of animation, replace all spaces with hyphen(-) and all letters should be lowercase.
  - Let's say if I select "Ball 8bits" animation then `type` will be `ball-8bits`.
  - For more information you can check it out [Demo](https://napster2210.github.io/ngx-spinner/)

## Versioning

ngx-spinner will be maintained under the Semantic Versioning guidelines.
Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

For more information on SemVer, please visit http://semver.org.

## Creator

#### [Yuvraj Chauhan](mailto:yuvrajchauhan3113@gmail.com)

- [@GitHub](https://github.com/Napster2210)

## Future Plan

- Dynamic `z-index`
- Image support for spinner
- Interceptor Implementation (Coming soon)

## Credits

Inspired by [Load Awesome by Daniel Cardoso.](https://github.com/danielcardoso/load-awesome)

Thanks [Alex Vieira Alencar](https://github.com/iamavieira) for helping me with Multiple Spinner Support.

### License

ngx-spinner is [MIT licensed](./LICENSE).
