import React from 'react';

interface FieldWrapProps {
  label?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function FieldWrap({ label, error, hint, children }: FieldWrapProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-soil-900">{label}</label>}
      {children}
      {hint && !error && <span className="text-xs text-soil-900/60">{hint}</span>}
      {error && <span className="text-xs text-clay-500">{error}</span>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', ...rest }, ref) => (
    <FieldWrap label={label} error={error} hint={hint}>
      <input
        ref={ref}
        className={`w-full rounded-card border ${error ? 'border-clay-500' : 'border-soil-100'} bg-white px-3.5 py-2.5 text-[15px] text-soil-900 placeholder:text-soil-900/40 focus:border-field-500 ${className}`}
        {...rest}
      />
    </FieldWrap>
  )
);
Input.displayName = 'Input';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, className = '', ...rest }, ref) => (
    <FieldWrap label={label} error={error} hint={hint}>
      <select
        ref={ref}
        className={`w-full rounded-card border ${error ? 'border-clay-500' : 'border-soil-100'} bg-white px-3.5 py-2.5 text-[15px] text-soil-900 focus:border-field-500 ${className}`}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldWrap>
  )
);
Select.displayName = 'Select';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', ...rest }, ref) => (
    <FieldWrap label={label} error={error} hint={hint}>
      <textarea
        ref={ref}
        className={`w-full rounded-card border ${error ? 'border-clay-500' : 'border-soil-100'} bg-white px-3.5 py-2.5 text-[15px] text-soil-900 placeholder:text-soil-900/40 focus:border-field-500 ${className}`}
        {...rest}
      />
    </FieldWrap>
  )
);
Textarea.displayName = 'Textarea';
