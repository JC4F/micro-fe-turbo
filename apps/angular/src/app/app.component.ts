import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularIconComponent } from './icon/angular-icon.component';
import { HlmButtonDirective } from '@repo/angular-ui';
import { CommonModule } from '@angular/common';

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
  imports: [AngularIconComponent, HlmButtonDirective, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular';
  count = 0;
  idLoading = true;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private unsubscribe: () => void = () => {};
  private store: UseGeneralStore | undefined;

  async ngOnInit() {
    const hostModule = await import('react-shell/Store');
    this.store = hostModule.default.useGeneralStore; // Assign store to class property

    this.count = this.store.getState().count;
    this.idLoading = false;

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
