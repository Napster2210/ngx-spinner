# ngx-spinner
### A library for spinner specifically for Angular 2/4/5.
[![ng5](https://img.shields.io/travis/rust-lang/rust.svg?style=flat-square)]()
[![Support](https://img.shields.io/badge/Support-Angular%202%2B-brightgreen.svg?style=flat-square)]()
[![License](https://img.shields.io/npm/l/express.svg?style=flat-square)]()
[![devDependency Status](https://img.shields.io/david/expressjs/express.svg?style=flat-square)]()

## Table of contents
- [Browser Support](#browser-support)
- [Installation](#installation)
- [Example](#example)
- [Usage](#usage)
- [Versioning](#versioning)
- [Creator](#creator)
- [License](#license)
- [Future Plan](#future-plan)

## Browser Support
![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 10+ ✔ | Latest ✔ | Latest ✔ |

## Installation

To install `ngx-spinner`, run:

```bash
$ npm install ngx-spinner --save
```

## Example

For working example see below Plunker:
https://plnkr.co/edit/vwWmv3mj8jUYA8ArHfXM?p=preview

## Usage

Once you successfully installed library by runnig above command, now import required files in your `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import library module
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify library as an import
    NgxSpinnerModule
  ],
  providers: [NgxSpinnerService], // Provide spinner service to hide/show spinner
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once you imported module and service, you can use its hide/show method of service in your `AppComponent`:

```typescript
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
class AppComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show(); // Call this method to show spinner

    this.spinner.hide(); // Call this method to hide spinner
  }
}
```

Now use selector in your `app.component.html`

```xml
<!-- You can now use library component in app.component.html -->
<ngx-spinner></ngx-spinner>
```

## Versioning
ngx-spinner will be maintained under the Semantic Versioning guidelines.
Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

For more information on SemVer, please visit http://semver.org.

## Creator
#### [Yuvraj Chauhan](mailto:yuvrajchauhan3113@gmail.com)
- [@GitHub](https://github.com/Napster2210)

## License
#### The MIT License (MIT)

## Future Plan
Currently I'm working on some features to make spinner more configurable like backdrop color, spinner size, color and different types of spinner.
