import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  FlaskConical,
  Pill,
  ScanLine,
  Stethoscope,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import {
  type Document,
  getDocumentStatusColor,
  getDocumentStatusLabel,
  formatDate,
} from "@/lib/mockData";

interface DocumentCardProps {
  document: Document;
  showPatientName?: boolean;
  showActions?: boolean;
  onView?: (doc: Document) => void;
  onApprove?: (doc: Document) => void;
  onReject?: (doc: Document) => void;
}

const typeIcons = {
  lab_result: FlaskConical,
  prescription: Pill,
  imaging: ScanLine,
  consultation: Stethoscope,
  other: FileText,
};

const typeLabels = {
  lab_result: "Lab Result",
  prescription: "Prescription",
  imaging: "Imaging",
  consultation: "Consultation",
  other: "Document",
};

export function DocumentCard({
  document,
  showPatientName = false,
  showActions = false,
  onView,
  onApprove,
  onReject,
}: DocumentCardProps) {
  const Icon = typeIcons[document.type];
  const statusColor = getDocumentStatusColor(document.status);
  const statusLabel = getDocumentStatusLabel(document.status);

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-border/50 hover:border-primary/30 cursor-pointer"
      onClick={() => onView?.(document)}
    >
      <CardContent className="p-0">
        <div className="flex items-stretch">
          {/* Icon section */}
          <div
            className={cn(
              "w-16 sm:w-20 flex items-center justify-center shrink-0",
              document.status === "pending_review" && "bg-warning/5",
              document.status === "approved" && "bg-success/5",
              document.status === "needs_changes" && "bg-destructive/5"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                document.status === "pending_review" && "bg-warning/10 text-warning",
                document.status === "approved" && "bg-success/10 text-success",
                document.status === "needs_changes" && "bg-destructive/10 text-destructive"
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
          </div>

          {/* Content section */}
          <div className="flex-1 p-4 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {document.title}
                </h3>
                {showPatientName && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Patient: {document.patientName}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(document.uploadedAt)}
                  </span>
                  <span className="capitalize text-muted-foreground/70">
                    {typeLabels[document.type]}
                  </span>
                </div>
              </div>
              <StatusBadge variant={statusColor as any}>{statusLabel}</StatusBadge>
            </div>

            {document.status === 'needs_changes' && document.requestedChanges ? (
              <div className="text-sm text-muted-foreground mt-3 bg-destructive/5 rounded-lg p-2">
                <strong className="block text-sm text-destructive">Requested changes:</strong>
                <p className="mt-1 line-clamp-2">{document.requestedChanges}</p>
              </div>
            ) : (
              document.notes && (
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2 bg-muted/50 rounded-lg p-2">
                  {document.notes}
                </p>
              )
            )}

            {/* Actions */}
            {showActions && (
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50" onClick={(e) => e.stopPropagation()}>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    onView?.(document);
                  }}
                >
                  <Eye className="w-4 h-4 mr-1.5" />
                  View
                </Button>
                {document.status === "pending_review" && (
                  <>
                    <Button
                      size="sm"
                      className="flex-1 sm:flex-none bg-success hover:bg-success/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        onApprove?.(document);
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-1.5" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1 sm:flex-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        onReject?.(document);
                      }}
                    >
                      <XCircle className="w-4 h-4 mr-1.5" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
