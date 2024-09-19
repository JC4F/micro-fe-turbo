import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularIconComponent } from './shares/components/icon/angular-icon.component';
import { HlmButtonDirective, HlmSkeletonComponent } from '@repo/angular-ui';
import { CommonModule } from '@angular/common';
import { environment } from './environments/environment';
import { TodoAppComponent } from './features/main/todo-app/todo-app.component';
import { useGeneralStore } from '@repo/util';

interface GeneralStore {
  count: number;
  // Add more properties as needed based on the actual state shape
}

interface UseGeneralStore {
  getState: () => GeneralStore;
  subscribe: (callback: (state: GeneralStore) => void) => () => void; // Returns an unsubscribe function
  setState: (newState: Partial<GeneralStore>) => void; // Allows partial updates
}

@Component({
  selector: 'angular-page',
  standalone: true,
  imports: [
    AngularIconComponent,
    HlmButtonDirective,
    CommonModule,
    HlmSkeletonComponent,
    TodoAppComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './globals.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular';
  count = 0;
  moduleInitLoading = true;
  showApp = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private unsubscribe: () => void = () => {};
  private store: UseGeneralStore | undefined;

  constructor() {
    console.log('test env', environment.testEnv);
  }

  async ngOnInit() {
    this.store = useGeneralStore;

    this.count = this.store.getState().count;
    this.moduleInitLoading = false;

    // Store the unsubscribe function
    this.unsubscribe = this.store.subscribe((state) => {
      this.count = state.count;
    });
  }

  // Increment count method
  incrementCount() {
    this.count++;
    this.store?.setState({ count: this.count }); // Access store from class property
  }

  // Lifecycle hook for cleanup
  ngOnDestroy() {
    // Call the unsubscribe function when the component is destroyed
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
