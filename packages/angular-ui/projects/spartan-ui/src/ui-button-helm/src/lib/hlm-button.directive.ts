import { Directive, Input, computed, input, signal } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const buttonVariants = cva(
  'ar-inline-flex ar-items-center ar-justify-center ar-whitespace-nowrap ar-rounded-md ar-text-sm ar-font-medium ar-transition-colors focus-visible:ar-outline-none focus-visible:ar-ring-1 focus-visible:ar-ring-ring disabled:ar-pointer-events-none disabled:ar-opacity-50',
  {
    variants: {
      variant: {
        default:
          'ar-bg-primary ar-text-primary-foreground ar-shadow hover:ar-bg-primary/90',
        destructive:
          'ar-bg-destructive ar-text-destructive-foreground ar-shadow-sm hover:ar-bg-destructive/90',
        outline:
          'ar-border ar-border-input ar-bg-background ar-shadow-sm hover:ar-bg-accent hover:ar-text-accent-foreground',
        secondary:
          'ar-bg-secondary ar-text-secondary-foreground ar-shadow-sm hover:ar-bg-secondary/80',
        ghost: 'hover:ar-bg-accent hover:ar-text-accent-foreground',
        link: 'ar-text-primary ar-underline-offset-4 hover:ar-underline',
      },
      size: {
        default: 'ar-h-9 ar-px-4 ar-py-2',
        sm: 'ar-h-8 ar-rounded-md ar-px-3 ar-text-xs',
        lg: 'ar-h-10 ar-rounded-md ar-px-8',
        icon: 'ar-h-9 ar-w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
export type ButtonVariants = VariantProps<typeof buttonVariants>;

@Directive({
  selector: '[hlmBtn]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmButtonDirective {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  private readonly _settableClass = signal<ClassValue>('');

  protected _computedClass = computed(() =>
    hlm(
      buttonVariants({ variant: this._variant(), size: this._size() }),
      this._settableClass(),
      this.userClass(),
    ),
  );

  setClass(value: ClassValue) {
    this._settableClass.set(value);
  }

  private readonly _variant = signal<ButtonVariants['variant']>('default');
  @Input()
  set variant(variant: ButtonVariants['variant']) {
    this._variant.set(variant);
  }

  private readonly _size = signal<ButtonVariants['size']>('default');
  @Input()
  set size(size: ButtonVariants['size']) {
    this._size.set(size);
  }
}
