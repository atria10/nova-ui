// components/inputs/EmailInput.tsx
'use client';

import { EnvelopeClosedIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import React, { forwardRef } from 'react';

export interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  fullWidth?: boolean;
  showIcon?: boolean;
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({
    label,
    error,
    hint,
    required = false,
    fullWidth = true,
    showIcon = true,
    className = '',
    id,
    ...props
  }, ref) => {
    const inputId = id || props.name || `email-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-primary/60 mb-1"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {showIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <EnvelopeClosedIcon className="h-4 w-4 text-primary/65" />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type="email"
            autoComplete="email"
            className={`
              w-full ${showIcon ? 'pl-10' : 'pl-3'} pr-3 py-2 
              border rounded-lg
              text-sm text-primary/90
              placeholder:text-primary/50
              transition-colors duration-200
              ${error
                ? 'border-error focus:border-error focus:ring-error'
                : 'border-primary/30 focus:border-base focus:ring-base'
              }
              focus:outline-none focus:ring-2 focus:ring-opacity-20
              disabled:bg-primary/20 disabled:text-primary/65 disabled:cursor-not-allowed
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
          <p id={`${inputId}-hint`} className="mt-1 text-xs text-primary/65">
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

EmailInput.displayName = 'EmailInput';

export default EmailInput;