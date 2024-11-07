import { forwardRef } from 'react';

// Base input styles
const baseInputStyles = `
  h-12 w-full
  px-4
  rounded-lg
  border border-gray-300
  bg-white
  text-gray-900
  placeholder-gray-400
  shadow-sm
  transition-colors
  hover:border-gray-400
  focus:border-[#FF66B2]
  focus:ring-2
  focus:ring-[#FF66B2]
  focus:ring-opacity-20
  focus:outline-none
  disabled:bg-gray-50
  disabled:text-gray-500
  disabled:cursor-not-allowed
`;

// Input with icon styles
const inputWithIconStyles = `
  pl-12
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, error, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={`${baseInputStyles} ${leftIcon ? inputWithIconStyles : ''} ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <div>
        <textarea
          ref={ref}
          className={`${baseInputStyles} min-h-[96px] py-3 ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, className = '', children, ...props }, ref) => {
    return (
      <div>
        <select
          ref={ref}
          className={`${baseInputStyles} appearance-none bg-no-repeat bg-right-4 pr-10 ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
          } ${className}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundSize: '20px',
            backgroundPositionX: 'calc(100% - 8px)', // Posiciona a seta à direita
            backgroundPositionY: 'center', // Centraliza verticalmente a seta
          }}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);


Select.displayName = 'Select';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div>
        <label className="inline-flex items-center min-h-[48px] cursor-pointer">
          <input
            type="checkbox"
            ref={ref}
            className={`
              h-5 w-5
              rounded
              border-gray-300
              text-[#FF66B2]
              shadow-sm
              focus:border-[#FF66B2]
              focus:ring
              focus:ring-[#FF66B2]
              focus:ring-opacity-20
              focus:ring-offset-0
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          <span className="ml-3 text-gray-700">{label}</span>
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div>
        <label className="inline-flex items-center min-h-[48px] cursor-pointer">
          <input
            type="radio"
            ref={ref}
            className={`
              h-5 w-5
              border-gray-300
              text-[#FF66B2]
              shadow-sm
              focus:border-[#FF66B2]
              focus:ring
              focus:ring-[#FF66B2]
              focus:ring-opacity-20
              focus:ring-offset-0
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          <span className="ml-3 text-gray-700">{label}</span>
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel = ({ children, required, className = '', ...props }: FormLabelProps) => {
  return (
    <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${className}`} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};