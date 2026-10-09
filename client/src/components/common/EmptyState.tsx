import React from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: React.ReactNode | React.ComponentType<any>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  const renderIcon = () => {
    if (React.isValidElement(icon)) return icon;
    if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null)) {
      const IconComp = icon as React.ComponentType<{ className?: string }>;
      return <IconComp className="h-8 w-8" />;
    }
    return icon as React.ReactNode;
  };

  return (
    <div
      className={cn(
        "flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50",
        className
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
        {renderIcon()}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      {description && (
        <p className="mb-6 max-w-sm text-muted-foreground">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};

export { EmptyState };
export default EmptyState;
