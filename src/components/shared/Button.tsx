interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  children,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = `
    inline-flex
    items-center
    justify-center
    font-medium
    rounded-lg
    transition-colors
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;
  
  const variants = {
    primary: 'bg-[#FF66B2] hover:bg-[#ff4d9f] text-white focus:ring-pink-500',
    secondary: 'bg-[#33CCCC] hover:bg-[#2db3b3] text-white focus:ring-teal-500'
  };

  const sizes = {
    sm: 'px-3 h-9 text-sm',
    md: 'px-4 h-12 text-base',
    lg: 'px-6 h-14 text-lg'
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${loading ? 'opacity-50 cursor-wait' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Carregando...
        </>
      ) : (
        children
      )}
    </button>
  );
}