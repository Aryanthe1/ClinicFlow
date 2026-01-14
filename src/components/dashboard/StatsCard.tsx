import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning" | "info" | "destructive";
}

const variantStyles = {
  default: {
    icon: "bg-muted text-muted-foreground",
    card: "",
  },
  primary: {
    icon: "bg-primary/10 text-primary",
    card: "border-primary/20 hover:border-primary/40",
  },
  success: {
    icon: "bg-success/10 text-success",
    card: "border-success/20 hover:border-success/40",
  },
  warning: {
    icon: "bg-warning/10 text-warning",
    card: "border-warning/20 hover:border-warning/40",
  },
  info: {
    icon: "bg-info/10 text-info",
    card: "border-info/20 hover:border-info/40",
  },
  destructive: {
    icon: "bg-destructive/10 text-destructive",
    card: "border-destructive/20 hover:border-destructive/40",
  },
};

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatsCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-lg cursor-default",
        styles.card
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
              {trend && (
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.isPositive ? "text-success" : "text-destructive"
                  )}
                >
                  {trend.isPositive ? "+" : ""}
                  {trend.value}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", styles.icon)}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
