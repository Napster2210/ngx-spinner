# ngx-spinner

## Installation

To install `ngx-spinner`, run:

```bash
$ npm install ngx-spinner --save
```

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

## License

MIT © [Yuvraj Chauhan](mailto:yuvrajchauhan3113@gmail.com)
