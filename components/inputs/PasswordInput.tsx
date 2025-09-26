// components/inputs/PasswordInput.tsx
'use client';

import { CheckIcon, Cross1Icon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon } from '@radix-ui/react-icons';
import React, { forwardRef, useState } from 'react';

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  fullWidth?: boolean;
  showIcon?: boolean;
  showStrength?: boolean;
  showRequirements?: boolean;
  minLength?: number;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ 
    label, 
    error, 
    hint, 
    required = false, 
    fullWidth = true,
    showIcon = true,
    showStrength = false,
    showRequirements = false,
    minLength = 8,
    className = '',
    id,
    value,
    onChange,
    ...props 
  }, ref) => {
    const inputId = id || props.name || `password-${Math.random().toString(36).substr(2, 9)}`;
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const password = value as string || '';
    
    // Calcola la forza della password
    const calculateStrength = (): PasswordStrength => {
      if (!password) return { score: 0, label: '', color: '' };
      
      let score = 0;
      
      // Lunghezza
      if (password.length >= minLength) score++;
      if (password.length >= 12) score++;
      
      // Caratteri diversi
      if (/[a-z]/.test(password)) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;
      
      // Determina label e colore
      if (score <= 2) return { score: 1, label: 'Debole', color: 'bg-error' };
      if (score <= 4) return { score: 2, label: 'Media', color: 'bg-yellow-500' };
      if (score <= 5) return { score: 3, label: 'Buona', color: 'bg-blue-500' };
      return { score: 4, label: 'Forte', color: 'bg-green-500' };
    };
    
    const strength = showStrength ? calculateStrength() : null;
    
    // Requisiti password
    const requirements = [
      { met: password.length >= minLength, text: `Almeno ${minLength} caratteri` },
      { met: /[a-z]/.test(password), text: 'Una lettera minuscola' },
      { met: /[A-Z]/.test(password), text: 'Una lettera maiuscola' },
      { met: /[0-9]/.test(password), text: 'Un numero' },
      { met: /[^A-Za-z0-9]/.test(password), text: 'Un carattere speciale' },
    ];
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {showIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockClosedIcon className="h-4 w-4 text-primary/40" />
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`
              w-full ${showIcon ? 'pl-10' : 'pl-3'} pr-10 py-2 
              border rounded-lg
              text-sm text-primary/90
              placeholder:text-primary/40
              transition-colors duration-200
              ${error 
                ? 'border-error focus:border-error focus:ring-error' 
                : 'border-primary/30 focus:border-base focus:ring-base'
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
          
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary/40 hover:text-primary/60"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeClosedIcon className="h-4 w-4" />
            ) : (
              <EyeOpenIcon className="h-4 w-4" />
            )}
          </button>
        </div>
        
        {/* Indicatore forza password */}
        {showStrength && password && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-primary/60">Forza password</span>
              {strength && (
                <span className={`text-xs font-medium ${
                  strength.color === 'bg-error' ? 'text-error' :
                  strength.color === 'bg-warning-500' ? 'text-warning/60' :
                  strength.color === 'bg-info-500' ? 'text-info/60' :
                  'text-success/60'
                }`}>
                  {strength.label}
                </span>
              )}
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    strength && strength.score >= level 
                      ? strength.color 
                      : 'bg-primary/20'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Requisiti password */}
        {showRequirements && isFocused && password && (
          <div className="mt-2 p-2 bg-primary/5 rounded-lg">
            <p className="text-xs font-medium text-primary/70 mb-1">Requisiti password:</p>
            <ul className="space-y-1">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-center text-xs">
                  {req.met ? (
                    <CheckIcon className="h-3 w-3 text-success/60 mr-1" />
                  ) : (
                    <Cross1Icon className="h-3 w-3 text-primary/40 mr-1" />
                  )}
                  <span className={req.met ? 'text-success-70' : 'text-primary/50'}>
                    {req.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1 text-xs text-primary/60">
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

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;