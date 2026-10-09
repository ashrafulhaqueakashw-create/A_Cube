import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface StatCardProps {
  title?: string;
  label?: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, label, value, icon, color, trend, className }) => {
  const displayTitle = label || title || '';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{displayTitle}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
                {trend && (
                  <span
                    className={cn(
                      "flex items-center text-sm font-medium",
                      trend.isPositive ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {trend.isPositive ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    )}
                    {Math.abs(trend.value)}%
                  </span>
                )}
              </div>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export { StatCard };
export default StatCard;
