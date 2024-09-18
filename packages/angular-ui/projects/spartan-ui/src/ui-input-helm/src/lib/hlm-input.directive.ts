import {
  Directive,
  type DoCheck,
  Injector,
  Input,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { hlm } from '@spartan-ng/ui-core';
import { BrnFormFieldControl } from '@spartan-ng/ui-formfield-brain';
import {
  ErrorStateMatcher,
  ErrorStateTracker,
} from '@spartan-ng/ui-forms-brain';

import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const inputVariants = cva(
  'ar-flex ar-rounded-md ar-border ar-font-normal ar-border-input ar-bg-transparent ar-text-sm ar-ring-offset-background file:ar-border-0 file:ar-text-foreground file:ar-bg-transparent file:ar-text-sm file:ar-font-medium placeholder:ar-text-muted-foreground focus-visible:ar-outline-none focus-visible:ar-ring-2 focus-visible:ar-ring-ring focus-visible:ar-ring-offset-2 disabled:ar-cursor-not-allowed disabled:ar-opacity-50',
  {
    variants: {
      size: {
        default: 'ar-h-10 ar-py-2 ar-px-4',
        sm: 'ar-h-9 ar-px-3',
        lg: 'ar-h-11 ar-px-8',
      },
      error: {
        auto: '[&.ng-invalid.ng-touched]:ar-text-destructive [&.ng-invalid.ng-touched]:ar-border-destructive [&.ng-invalid.ng-touched]:focus-visible:ar-ring-destructive',
        true: 'ar-text-destructive ar-border-destructive focus-visible:ar-ring-destructive',
      },
    },
    defaultVariants: {
      size: 'default',
      error: 'auto',
    },
  },
);
type InputVariants = VariantProps<typeof inputVariants>;

@Directive({
  selector: '[hlmInput]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
  providers: [
    {
      provide: BrnFormFieldControl,
      useExisting: HlmInputDirective,
    },
  ],
})
export class HlmInputDirective implements BrnFormFieldControl, DoCheck {
  private readonly _size = signal<InputVariants['size']>('default');
  @Input()
  set size(value: InputVariants['size']) {
    this._size.set(value);
  }

  private readonly _error = signal<InputVariants['error']>('auto');
  @Input()
  set error(value: InputVariants['error']) {
    this._error.set(value);
  }

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(
      inputVariants({ size: this._size(), error: this._error() }),
      this.userClass(),
    ),
  );

  private injector = inject(Injector);

  ngControl: NgControl | null = this.injector.get(NgControl, null);

  errorStateTracker: ErrorStateTracker;

  private defaultErrorStateMatcher = inject(ErrorStateMatcher);
  private parentForm = inject(NgForm, { optional: true });
  private parentFormGroup = inject(FormGroupDirective, { optional: true });

  errorState = computed(() => this.errorStateTracker.errorState());

  constructor() {
    this.errorStateTracker = new ErrorStateTracker(
      this.defaultErrorStateMatcher,
      this.ngControl,
      this.parentFormGroup,
      this.parentForm,
    );

    effect(
      () => {
        if (this.ngControl) {
          this.error = this.errorStateTracker.errorState();
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngDoCheck() {
    this.errorStateTracker.updateErrorState();
  }
}
