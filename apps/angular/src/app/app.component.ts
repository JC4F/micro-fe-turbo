import { Component, OnInit } from '@angular/core';
import { AngularIconComponent } from './icon/angular-icon.component';
import { HlmButtonDirective } from '@repo/angular-ui';

@Component({
  selector: 'angular-page',
  standalone: true,
  imports: [AngularIconComponent, HlmButtonDirective],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'angular';
  count = 0;

  async ngOnInit() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const hehe = await import('react-shell/Store');
    console.log(hehe.default.useGeneralStore.getState());
    hehe.default.useGeneralStore.subscribe(console.log);
  }

  incrementCount() {
    this.count++;
  }
}
