import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Bell, CheckCircle, Eye } from "lucide-react";
import { type Notification, formatDateTime } from "@/lib/mockData";

interface NotificationCardProps {
  notification: Notification;
  onView?: (notification: Notification) => void;
  onMarkAsRead?: (notification: Notification) => void;
}

export function NotificationCard({
  notification,
  onView,
  onMarkAsRead,
}: NotificationCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-300 overflow-hidden",
        notification.read
          ? "border-border/50 opacity-70"
          : "border-primary/30 bg-primary/5 shadow-md"
      )}
    >
      <CardContent className="p-0">
        <div className="flex items-stretch">
          {/* Status indicator */}
          <div
            className={cn(
              "w-1 shrink-0",
              notification.read ? "bg-muted" : "bg-primary"
            )}
          />

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                  notification.read
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary/10 text-primary"
                )}
              >
                {notification.type === "new_document" ? (
                  <FileText className="w-5 h-5" />
                ) : (
                  <Bell className="w-5 h-5" />
                )}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4
                    className={cn(
                      "font-semibold text-sm",
                      !notification.read && "text-primary"
                    )}
                  >
                    {notification.title}
                  </h4>
                  {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-2">
                  {formatDateTime(notification.timestamp)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
              {notification.documentId && (
                <Button
                  size="sm"
                  variant={notification.read ? "outline" : "default"}
                  onClick={() => onView?.(notification)}
                  className="flex-1 sm:flex-none"
                >
                  <Eye className="w-4 h-4 mr-1.5" />
                  View Document
                </Button>
              )}
              {!notification.read && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onMarkAsRead?.(notification)}
                  className="flex-1 sm:flex-none"
                >
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  Mark as Read
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
