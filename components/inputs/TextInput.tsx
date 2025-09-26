// components/inputs/TextInput.tsx
'use client';

import { InfoCircledIcon } from '@radix-ui/react-icons';
import React, { forwardRef } from 'react';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  fullWidth?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({
    label,
    error,
    hint,
    required = false,
    fullWidth = true,
    className = '',
    id,
    ...props
  }, ref) => {
    const inputId = id || props.name || `text-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-primary/50 mb-1"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type="text"
            className={`
              w-full px-3 py-2 
              border rounded-lg
              text-sm text-primary/90
              placeholder:text-primary/40
              transition-colors duration-200
              ${error
                ? 'border-error focus:border-error focus:ring-error'
                : 'border-primary/50 focus:border-base focus:ring-base'
              }
              focus:outline-none focus:ring-2 focus:ring-opacity-20
              disabled:bg-primary/5 disabled:text-primary/50 disabled:cursor-not-allowed
              ${className}
            `}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />

          {error && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <InfoCircledIcon className="h-4 w-4 text-error" />
            </div>
          )}
        </div>

        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1 text-xs text-primary/50">
            {hint}
          </p>
        )}

        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-xs text-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;