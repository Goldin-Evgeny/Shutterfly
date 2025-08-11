import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import classNames from './Button.module.css';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline';
  size?: 'default' | 'sm';
};

// Helper function to build class names
const buildButtonClasses = (
  variant: string = 'default',
  size: string = 'default'
) => {
  const classes = [classNames.button];
  // Add variant class
  if (variant) {
    classes.push(classNames[variant as keyof typeof classNames]);
  }

  // Add size class
  if (size && size !== 'default') {
    classes.push(classNames[size as keyof typeof classNames]);
  }

  return classes.join(' ');
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const buttonClasses = buildButtonClasses(variant, size);

    return (
      <Comp
        className={`${buttonClasses} ${className || ''}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
