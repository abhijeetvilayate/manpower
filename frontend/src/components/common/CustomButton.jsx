import React from 'react';

export default function CustomButton({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    icon: Icon = null,
    iconPosition = 'right',
    className = '',
    ...props
}) {
    const baseStyles =
        'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';

    const variants = {
        primary:
            'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 focus:ring-amber-500',
        secondary:
            'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 focus:ring-slate-700',
        outline:
            'bg-transparent hover:bg-amber-50 text-amber-600 border border-amber-500 focus:ring-amber-500',
        ghost:
            'bg-transparent hover:bg-slate-100 text-slate-700 border-none shadow-none focus:ring-slate-300',
        danger:
            'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20 focus:ring-rose-500',
    };

    const sizes = {
        sm: 'text-xs px-3 py-1.5 gap-1.5',
        md: 'text-sm px-5 py-2.5 gap-2',
        lg: 'text-base px-7 py-3.5 gap-2.5',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md
                } ${className}`}
            {...props}
        >
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
                    {children}
                    {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
                </>
            )}
        </button>
    );
}