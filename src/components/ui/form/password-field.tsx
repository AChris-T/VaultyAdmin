'use client';

import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import TextField from './text-field';
import { IconEye, IconEyeOff } from '../icons';

type PasswordFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  label: string;
  error?: string;
};

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <TextField
        ref={ref}
        label={label}
        error={error}
        type={visible ? 'text' : 'password'}
        trailing={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="text-black/40 transition hover:text-black/70"
          >
            {visible ? (
              <IconEyeOff className="h-4 w-4" />
            ) : (
              <IconEye className="h-4 w-4" />
            )}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordField.displayName = 'PasswordField';

export default PasswordField;
