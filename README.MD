# ngx-spinner
### A library for spinner specifically for Angular 2/4/5.
[![ng5](https://img.shields.io/travis/rust-lang/rust.svg?style=flat-square)]()
[![Support](https://img.shields.io/badge/Support-Angular%202%2B-brightgreen.svg?style=flat-square)]()
[![License](https://img.shields.io/npm/l/express.svg?style=flat-square)]()
[![devDependency Status](https://img.shields.io/david/expressjs/express.svg?style=flat-square)]()

## Table of contents
- [Browser Support](#browser-support)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Versioning](#versioning)
- [Creator](#creator)
- [License](#license)
- [Future Plan](#future-plan)

## Browser Support
![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 10+ ✔ | Latest ✔ | Latest ✔ |

## Demo

Working Demo: [Plunkr Demo](https://plnkr.co/edit/vwWmv3mj8jUYA8ArHfXM?p=preview)

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

Import `NgxSpinnerModule` in  in the root module(`AppModule`):
```typescript
// Import library module
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    // ...
    NgxSpinnerModule
  ]
})
export class AppModule { }
```

Add `NgxSpinnerService` service wherever you want to use the `ngx-spinner`.
```typescript
import { NgxSpinnerService } from 'ngx-spinner';

class AppComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) { }

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
See [Plunkr Demo](https://plnkr.co/edit/vwWmv3mj8jUYA8ArHfXM?p=preview)

## NgxSpinner Service
- `NgxSpinnerService.show()`  Shows the spinner
- `NgxSpinnerService.hide()`  Hides the spinner

## NgxSpinner Component
```html
<ngx-spinner [bdOpacity]="0.9" [bdColor]="#909090" [size]="medium" [color]="#fff"></ngx-spinner>
```

- **[bdOpacity]**: between `0.0` to `1.0`.
  To set opacity of backdrop, default `0.8`
- **[bdColor]**: Any css color format.
  To set background-color for backdrop, default `#333`
- **[size]**: Anyone from `small`, `default`, `medium`, `large`.
  To set size of spinner, default `large`
- **[color]**: Any css color format.
  To set color of spinner, default `#fff`

## Versioning
ngx-spinner will be maintained under the Semantic Versioning guidelines.
Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

For more information on SemVer, please visit http://semver.org.

## Creator
#### [Yuvraj Chauhan](mailto:yuvrajchauhan3113@gmail.com)
- [@GitHub](https://github.com/Napster2210)

## Future Plan
- Stable version v1.0.0 (Coming soon)
- More than 50 different types of spinner (Coming soon)
- Interceptor Implementation (Coming soon)
- Github page with working example

## License
#### The MIT License (MIT)
