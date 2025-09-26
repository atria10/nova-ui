// components/design-system/Button.tsx
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const buttonVariants = {
  color: {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    neutral: 'btn-neutral',
  },
  style: {
    filled: '', // default filled style
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  },
  size: {
    sm: 'btn-sm h-8 px-3 text-sm',
    md: 'btn-md h-10 px-4 text-base',
    lg: 'btn-lg h-12 px-6 text-lg',
  },
};

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  color?: keyof typeof buttonVariants.color;
  style?: keyof typeof buttonVariants.style;
  size?: keyof typeof buttonVariants.size;
  // Keep variant for backward compatibility
  variant?: keyof typeof buttonVariants.color | 'outline' | 'ghost';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    color,
    style = 'filled',
    size = 'md',
    variant, // backward compatibility
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    // Handle backward compatibility with variant prop
    let resolvedColor = color;
    let resolvedStyle = style;

    if (variant && !color) {
      if (variant === 'outline' || variant === 'ghost') {
        resolvedStyle = variant;
        resolvedColor = resolvedColor || 'primary';
      } else {
        resolvedColor = variant;
      }
    }

    // Default to primary if no color specified
    resolvedColor = resolvedColor || 'primary';

    return (
      <button
        className={cn(
          'btn rounded-md cursor-pointer',
          buttonVariants.color[resolvedColor],
          buttonVariants.style[resolvedStyle],
          buttonVariants.size[size],
          loading && 'loading',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
/*
Usage Examples:

// New flexible API
<Button color="warning" style="outline">Warning Outline</Button>
<Button color="success" style="ghost">Success Ghost</Button>
<Button color="info" style="filled">Info Filled</Button>
<Button color="error" style="outline">Error Outline</Button>

// Backward compatibility - still works
<Button variant="primary">Primary</Button>
<Button variant="outline">Outline (primary)</Button>
<Button variant="ghost">Ghost (primary)</Button>

// All combinations now possible:
<Button color="primary" style="outline">Primary Outline</Button>
<Button color="secondary" style="ghost">Secondary Ghost</Button>
<Button color="accent" style="outline">Accent Outline</Button>
<Button color="info" style="ghost">Info Ghost</Button>
<Button color="success" style="outline">Success Outline</Button>
<Button color="warning" style="ghost">Warning Ghost</Button>
<Button color="error" style="outline">Error Outline</Button>
*/