/**
 * LoadingSpinner Component
 * 
 * A reusable loading spinner with customizable size and optional text.
 * Uses Tailwind CSS animations for the spinning effect.
 * 
 * Follows SRP - Only handles loading indicator presentation.
 * 
 * @param size - Size of the spinner ('sm', 'md', 'lg'). Defaults to 'md'
 * @param text - Optional loading text to display below spinner
 */
interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
}

const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
};

export function LoadingSpinner({size = 'md', text}: LoadingSpinnerProps) {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div
                className={`${sizeClasses[size]} border-teal-600 border-t-transparent rounded-full animate-spin`}
                role="status"
                aria-label="Cargando"
            />
            {text && <p className="text-gray-600 text-center mt-2">{text}</p>}
        </div>
    );
}

export default LoadingSpinner;

