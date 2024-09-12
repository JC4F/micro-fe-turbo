import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .then((app) => {
    const AngularPage = createCustomElement(AppComponent, {
      injector: app.injector,
    });
    customElements.define('angular-page', AngularPage);
  })
  .catch((err) => console.error(err));
