import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { QueryClientManager } from '@repo/util';
import { provideAngularQuery } from '@tanstack/angular-query-experimental';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAngularQuery(QueryClientManager.getInstance()),
  ],
};
