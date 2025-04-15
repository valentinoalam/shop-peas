import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: number;
  className?: string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  trend,
  className,
  icon,
}) => {
  const showTrend = trend !== undefined;
  const isPositive = trend && trend > 0;
  
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex justify-between items-start">
        <p className="stat-title">{title}</p>
        {icon && <div>{icon}</div>}
      </div>
      <div className="mt-2">
        <div className="flex items-baseline">
          <h3 className="stat-value">{value}</h3>
          {showTrend && (
            <div 
              className={cn(
                "ml-2 flex items-center text-xs font-medium",
                isPositive ? "text-analytics-green" : "text-analytics-red"
              )}
            >
              {isPositive ? (
                <ArrowUpIcon className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 mr-1" />
              )}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        {description && <p className="stat-description mt-1">{description}</p>}
      </div>
    </div>
  );
};
