import { Component } from '@angular/core';
import { AngularIconComponent } from './icon/angular-icon.component';
import { HlmButtonDirective } from '@repo/angular-ui';

@Component({
  selector: 'angular-page',
  standalone: true,
  imports: [AngularIconComponent, HlmButtonDirective],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular';
  count = 0;

  incrementCount() {
    this.count++;
  }
}
