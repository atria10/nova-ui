// components/inputs/PhoneInput.tsx
'use client';

import { GlobeIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { formatIncompletePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import React, { forwardRef, useEffect, useState } from 'react';

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    fullWidth?: boolean;
    showIcon?: boolean;
    value?: string;
    onChange?: (value: string, isValid: boolean) => void;
    countryCode?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
    ({
        label,
        error,
        hint,
        required = false,
        fullWidth = true,
        showIcon = true,
        className = '',
        id,
        value = '',
        onChange,
        countryCode = 'IT', // Default Italia
        ...props
    }, ref) => {
        const inputId = id || props.name || `phone-${Math.random().toString(36).substr(2, 9)}`;
        const [displayValue, setDisplayValue] = useState('');
        const [isValid, setIsValid] = useState(false);

        // Formatta il valore iniziale
        useEffect(() => {
            if (value) {
                try {
                    // Se il valore non inizia con +, aggiungi il prefisso italiano
                    let phoneValue = value;
                    if (!phoneValue.startsWith('+')) {
                        phoneValue = phoneValue.startsWith('39') ? `+${phoneValue}` : `+39${phoneValue}`;
                    }

                    const formatted = formatIncompletePhoneNumber(phoneValue, countryCode as any);
                    setDisplayValue(formatted);
                    setIsValid(isValidPhoneNumber(phoneValue, countryCode as any));
                } catch {
                    setDisplayValue(value);
                    setIsValid(false);
                }
            }
        }, [value, countryCode]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let inputValue = e.target.value;

            // Rimuovi caratteri non numerici eccetto + all'inizio
            inputValue = inputValue.replace(/[^\d+]/g, '');
            if (inputValue.includes('+') && !inputValue.startsWith('+')) {
                inputValue = inputValue.replace(/\+/g, '');
            }

            // Se l'utente digita solo numeri, aggiungi +39 automaticamente
            if (inputValue && !inputValue.startsWith('+')) {
                if (!inputValue.startsWith('39')) {
                    inputValue = `+39${inputValue}`;
                } else {
                    inputValue = `+${inputValue}`;
                }
            }

            try {
                // Formatta il numero mentre viene digitato
                const formatted = formatIncompletePhoneNumber(inputValue, countryCode as any) || inputValue;
                setDisplayValue(formatted);

                // Valida il numero
                const valid = inputValue.length > 3 && isValidPhoneNumber(inputValue, countryCode as any);
                setIsValid(valid);

                // Chiama onChange con il valore non formattato
                if (onChange) {
                    onChange(inputValue, valid);
                }
            } catch {
                setDisplayValue(inputValue);
                setIsValid(false);
                if (onChange) {
                    onChange(inputValue, false);
                }
            }
        };

        return (
            <div className={`${fullWidth ? 'w-full' : ''}`}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-primary/70 mb-1"
                    >
                        {label}
                        {required && <span className="text-error ml-1">*</span>}
                    </label>
                )}

                <div className="relative">
                    {showIcon && (
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <GlobeIcon className="h-4 w-4 text-primary/40" />
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        type="tel"
                        autoComplete="tel"
                        value={displayValue}
                        onChange={handleChange}
                        placeholder="+39 123 456 7890"
                        className={`
              w-full ${showIcon ? 'pl-10' : 'pl-3'} pr-3 py-2 
              border rounded-lg
              text-sm text-primary/90
              placeholder:text-primary/40
              transition-colors duration-200
              ${error
                                ? 'border-error focus:border-error focus:ring-error'
                                : 'border-primary/30 focus:border-base focus:ring-base'
                            }
              focus:outline-none focus:ring-2 focus:ring-opacity-20
              disabled:bg-primary/10 disabled:text-primary/50 disabled:cursor-not-allowed
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

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;