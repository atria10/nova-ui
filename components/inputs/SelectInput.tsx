// components/inputs/SelectInput.tsx
'use client';

import { CheckIcon, ChevronDownIcon, Cross2Icon, InfoCircledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React, { forwardRef, useState, useEffect, useMemo, useRef } from 'react';
import { cn } from '../../utils/cn';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  fullWidth?: boolean;
  showIcon?: boolean;
  
  // Select specific props
  options: SelectOption[];
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[] | null) => void;
  onSearchChange?: (search: string) => void;
  
  // Behavior
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  creatable?: boolean;
  
  // Display
  placeholder?: string;
  emptyMessage?: string;
  maxHeight?: string;
  
  // Loading state
  loading?: boolean;
  loadingMessage?: string;
}

const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  ({
    label,
    error,
    hint,
    required = false,
    fullWidth = true,
    showIcon = true,
    className = '',
    id,
    
    // Select props
    options = [],
    value,
    onChange,
    onSearchChange,
    
    // Behavior
    multiple = false,
    searchable = true,
    clearable = true,
    creatable = false,
    
    // Display
    placeholder = multiple ? 'Seleziona opzioni...' : 'Seleziona opzione...',
    emptyMessage = 'Nessuna opzione trovata',
    maxHeight = '200px',
    
    // Loading
    loading = false,
    loadingMessage = 'Caricamento...',
    
    disabled,
    ...props
  }, ref) => {
    const inputId = id || props.name || `select-${Math.random().toString(36).substr(2, 9)}`;
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    
    // Normalize value to always be array for easier handling
    const selectedValues = useMemo(() => {
      if (value === null || value === undefined) return [];
      return Array.isArray(value) ? value : [value];
    }, [value]);

    // Filter options based on search
    const filteredOptions = useMemo(() => {
      if (!search.trim()) return options;
      
      return options.filter(option =>
        option.label.toLowerCase().includes(search.toLowerCase()) ||
        option.value.toString().toLowerCase().includes(search.toLowerCase())
      );
    }, [options, search]);

    // Group options if they have groups
    const groupedOptions = useMemo(() => {
      const grouped = filteredOptions.reduce((acc, option) => {
        const group = option.group || 'default';
        if (!acc[group]) acc[group] = [];
        acc[group].push(option);
        return acc;
      }, {} as Record<string, SelectOption[]>);
      
      return grouped;
    }, [filteredOptions]);

    // Get display text for selected values
    const displayText = useMemo(() => {
      if (selectedValues.length === 0) return '';
      
      const selectedOptions = selectedValues
        .map(val => options.find(opt => opt.value === val))
        .filter(Boolean) as SelectOption[];
        
      if (selectedOptions.length === 0) return '';
      
      if (multiple) {
        return selectedOptions.length === 1 
          ? selectedOptions[0].label
          : `${selectedOptions.length} elementi selezionati`;
      }
      
      return selectedOptions[0].label;
    }, [selectedValues, options, multiple]);

    // Handle option selection
    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return;
      
      let newValue;
      
      if (multiple) {
        const currentValues = selectedValues;
        const isSelected = currentValues.includes(option.value);
        
        if (isSelected) {
          newValue = currentValues.filter(v => v !== option.value);
        } else {
          newValue = [...currentValues, option.value];
        }
      } else {
        newValue = option.value;
        setIsOpen(false);
        setSearch('');
      }
      
      onChange?.(newValue);
    };

    // Handle clear
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(multiple ? [] : null);
      setSearch('');
    };

    // Handle search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearch = e.target.value;
      setSearch(newSearch);
      onSearchChange?.(newSearch);
      setFocusedIndex(-1);
    };

    // Handle create new option
    const handleCreate = () => {
      if (!creatable || !search.trim()) return;
      
      const newOption: SelectOption = {
        value: search.trim(),
        label: search.trim()
      };
      
      handleSelect(newOption);
      setSearch('');
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      const visibleOptions = filteredOptions.filter(opt => !opt.disabled);
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => 
            prev < visibleOptions.length - 1 ? prev + 1 : 0
          );
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : visibleOptions.length - 1
          );
          break;
          
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0 && visibleOptions[focusedIndex]) {
            handleSelect(visibleOptions[focusedIndex]);
          } else if (creatable && search.trim()) {
            handleCreate();
          }
          break;
          
        case 'Escape':
          setIsOpen(false);
          setSearch('');
          setFocusedIndex(-1);
          break;
      }
    };

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearch('');
          setFocusedIndex(-1);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    // Focus search input when opened
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    const hasValue = selectedValues.length > 0;
    const shouldShowClear = clearable && hasValue && !disabled;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} relative`} ref={containerRef}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-base-content/70 mb-1"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {/* Main input trigger */}
          <div
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            className={cn(
              `w-full ${showIcon ? 'pl-10' : 'pl-3'} ${shouldShowClear ? 'pr-16' : 'pr-10'} py-2`,
              "border rounded-lg cursor-pointer",
              "text-sm transition-colors duration-200",
              "flex items-center justify-between",
              error
                ? 'border-error focus-within:border-error focus-within:ring-error'
                : 'border-base-300 focus-within:border-primary focus-within:ring-primary',
              "focus-within:outline-none focus-within:ring-2 focus-within:ring-opacity-20",
              disabled 
                ? "bg-base-200 cursor-not-allowed" 
                : "bg-base-100 hover:border-base-content/40",
              className
            )}
            tabIndex={disabled ? -1 : 0}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-invalid={!!error}
          >
            {showIcon && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-base-content/60" />
              </div>
            )}

            <span className={cn(
              "truncate flex-1 text-left",
              hasValue ? "text-base-content" : "text-base-content/50"
            )}>
              {displayText || placeholder}
            </span>

            <div className="flex items-center gap-1">
              {shouldShowClear && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 hover:bg-base-200 rounded-md transition-colors"
                >
                  <Cross2Icon className="h-3 w-3 text-base-content/60" />
                </button>
              )}
              
              <ChevronDownIcon 
                className={cn(
                  "h-4 w-4 text-base-content/60 transition-transform duration-200",
                  isOpen && "rotate-180"
                )} 
              />
            </div>
          </div>

          {error && (
            <div className="absolute inset-y-0 right-12 flex items-center pr-3 pointer-events-none">
              <InfoCircledIcon className="h-4 w-4 text-error" />
            </div>
          )}

          {/* Dropdown */}
          {isOpen && !disabled && (
            <div className="absolute top-full left-0 right-0 z-20 mt-2 bg-base-100/95 backdrop-blur-xl border border-base-300/60 rounded-xl shadow-2xl shadow-base-content/[0.12] overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-base-100/40 to-transparent pointer-events-none rounded-xl" />
              
              <div className="relative">
                {/* Search input */}
                {searchable && (
                  <div className="p-3 border-b border-base-300/60">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={search}
                      onChange={handleSearchChange}
                      placeholder="Cerca..."
                      className="w-full px-3 py-2 text-sm bg-base-200/50 border border-base-300/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary"
                    />
                  </div>
                )}

                {/* Options list */}
                <div 
                  className="overflow-y-auto p-1"
                  style={{ maxHeight }}
                >
                  {loading ? (
                    <div className="px-3 py-4 text-center text-sm text-base-content/60">
                      {loadingMessage}
                    </div>
                  ) : filteredOptions.length === 0 ? (
                    <div className="px-3 py-4 text-center text-sm text-base-content/60">
                      {emptyMessage}
                      {creatable && search.trim() && (
                        <button
                          onClick={handleCreate}
                          className="block w-full mt-2 px-3 py-2 text-left text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          Crea "{search}"
                        </button>
                      )}
                    </div>
                  ) : (
                    Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                      <div key={groupName}>
                        {groupName !== 'default' && (
                          <div className="px-3 py-2 text-xs font-semibold text-base-content/70 uppercase tracking-wider">
                            {groupName}
                          </div>
                        )}
                        
                        {groupOptions.map((option, index) => {
                          const globalIndex = filteredOptions.indexOf(option);
                          const isSelected = selectedValues.includes(option.value);
                          const isFocused = focusedIndex === globalIndex;
                          
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleSelect(option)}
                              disabled={option.disabled}
                              className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 mx-1 my-0.5",
                                "text-sm font-medium text-left rounded-lg",
                                "transition-all duration-150 ease-out",
                                
                                // States
                                option.disabled
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer hover:bg-base-200/80 active:scale-[0.98]",
                                
                                // Focused
                                isFocused && "bg-base-200/80",
                                
                                // Selected
                                isSelected && "text-primary bg-primary/10",
                                
                                // Default
                                !option.disabled && !isSelected && "text-base-content"
                              )}
                            >
                              {multiple && (
                                <div className="flex items-center justify-center w-4 h-4">
                                  {isSelected && (
                                    <CheckIcon className="w-3.5 h-3.5 text-primary" />
                                  )}
                                </div>
                              )}
                              
                              <span className="flex-1 truncate">
                                {option.label}
                              </span>
                              
                              {!multiple && isSelected && (
                                <CheckIcon className="w-4 h-4 text-primary" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>

                {/* Create option */}
                {creatable && search.trim() && filteredOptions.length > 0 && (
                  <div className="border-t border-base-300/60 p-1">
                    <button
                      onClick={handleCreate}
                      className="w-full px-3 py-2.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors text-left"
                    >
                      Crea "{search}"
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1 text-xs text-base-content/60">
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

SelectInput.displayName = 'SelectInput';

export default SelectInput;

/*
Esempi di utilizzo:

// Select semplice
<SelectInput
  label="Paese"
  options={[
    { value: 'it', label: 'Italia' },
    { value: 'us', label: 'Stati Uniti' },
    { value: 'de', label: 'Germania' }
  ]}
  value={country}
  onChange={setCountry}
  required
/>

// Select multipla con ricerca
<SelectInput
  label="Competenze"
  options={skills}
  value={selectedSkills}
  onChange={setSelectedSkills}
  multiple
  searchable
  placeholder="Seleziona le tue competenze..."
  hint="Puoi selezionare più opzioni"
/>

// Select con gruppi
<SelectInput
  label="Prodotto"
  options={[
    { value: 'mac', label: 'MacBook Pro', group: 'Computer' },
    { value: 'iphone', label: 'iPhone 15', group: 'Telefoni' },
    { value: 'ipad', label: 'iPad Air', group: 'Tablet' }
  ]}
  value={product}
  onChange={setProduct}
/>

// Select creabile
<SelectInput
  label="Tag"
  options={existingTags}
  value={tags}
  onChange={setTags}
  multiple
  creatable
  placeholder="Aggiungi tag..."
/>

// Select con loading
<SelectInput
  label="Città"
  options={cities}
  value={city}
  onChange={setCity}
  loading={isLoadingCities}
  loadingMessage="Caricamento città..."
  onSearchChange={handleCitySearch}
/>
*/