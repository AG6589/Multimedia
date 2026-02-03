import { cn } from '../../utils/cn';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-netflix-red hover:bg-netflix-red/90 text-white shadow-lg hover:shadow-xl',
        secondary: 'bg-amazon-orange hover:bg-amazon-orange/90 text-white shadow-lg hover:shadow-xl',
        outline: 'border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800',
        ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
