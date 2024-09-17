import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'hlm-skeleton',
  standalone: true,
  template: '',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmSkeletonComponent {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(
      'ar-block ar-animate-pulse ar-rounded-md ar-bg-primary/10',
      this.userClass(),
    ),
  );
}
