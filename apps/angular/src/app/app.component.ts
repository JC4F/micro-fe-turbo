import { Component } from '@angular/core';
import { AngularIconComponent } from './icon/angular-icon.component';
import { HlmButtonDirective } from '@repo/angular-ui';
import { Test } from '@repo/angular-ui';

@Component({
  selector: 'angular-page',
  standalone: true,
  imports: [AngularIconComponent, HlmButtonDirective],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular';
  count = Test;

  incrementCount() {
    this.count++;
  }
}
