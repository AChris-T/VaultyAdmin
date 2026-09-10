'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  trailing?: ReactNode;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, trailing, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="w-full text-left">
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-sans font-medium text-black"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={`w-full rounded-xl border px-4 py-3 text-sm font-medium font-sans text-black outline-none transition placeholder:text-black/35 ${
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-100'
                : 'border-[#D2D2D2] focus:border-[#D2D2D2] focus:ring-1 focus:ring-[#D2D2D2]'
            } ${trailing ? 'pr-11' : ''} ${className ?? ''}`}
            {...props}
          />
          {trailing && (
            <div className="absolute inset-y-0 right-3 flex items-center">
              {trailing}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
