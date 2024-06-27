import React from 'react';

interface CustomCardProps {
    children: React.ReactNode;
    className?: string;
}

export const KartCard: React.FC<CustomCardProps> = ({ children, className }) => {
    return (
        <div className={`flex flex-col items-center justify-center p-6 size-full rounded-lg border text-card-foreground shadow border-purple-0.15 bg-dark bg-opacity-80 shadow-purple-0.5 drop-shadow-sm ${className}`}>
            {children}
        </div>
    )
}