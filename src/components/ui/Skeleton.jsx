import { cn } from '../../utils/cn';

export const SkeletonCard = ({ className }) => (
    <div className={cn('animate-pulse', className)}>
        <div className="bg-gray-300 dark:bg-gray-700 rounded-lg aspect-video w-full"></div>
        <div className="mt-3 space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
    </div>
);

export const SkeletonText = ({ lines = 3, className }) => (
    <div className={cn('animate-pulse space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
            <div
                key={i}
                className="h-4 bg-gray-300 dark:bg-gray-700 rounded"
                style={{ width: `${100 - i * 10}%` }}
            ></div>
        ))}
    </div>
);

export const SkeletonHero = () => (
    <div className="animate-pulse">
        <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-[70vh] w-full"></div>
        <div className="mt-6 space-y-4 max-w-2xl">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
    </div>
);

const Skeleton = { Card: SkeletonCard, Text: SkeletonText, Hero: SkeletonHero };

export default Skeleton;
