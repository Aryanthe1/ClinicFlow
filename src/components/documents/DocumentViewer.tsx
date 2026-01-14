import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  FlaskConical,
  Pill,
  ScanLine,
  Stethoscope,
  Calendar,
  User,
  CheckCircle,
  Download,
  Printer,
} from "lucide-react";
import {
  type Document,
  getDocumentStatusColor,
  getDocumentStatusLabel,
  formatDateTime,
} from "@/lib/mockData";

interface DocumentViewerProps {
  document: Document | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

// Mock report content based on document type
const getMockReportContent = (doc: Document) => {
  switch (doc.type) {
    case "lab_result":
      return {
        sections: [
          {
            title: "Test Results",
            items: [
              { label: "Hemoglobin", value: "14.2 g/dL", range: "13.5-17.5 g/dL", status: "normal" },
              { label: "White Blood Cells", value: "7,500 /µL", range: "4,500-11,000 /µL", status: "normal" },
              { label: "Platelets", value: "250,000 /µL", range: "150,000-400,000 /µL", status: "normal" },
              { label: "Red Blood Cells", value: "5.1 M/µL", range: "4.5-5.5 M/µL", status: "normal" },
            ],
          },
        ],
      };
    case "imaging":
      return {
        sections: [
          {
            title: "Imaging Findings",
            items: [
              { label: "Exam Type", value: doc.title.includes("X-Ray") ? "X-Ray" : "MRI", status: "info" },
              { label: "Region", value: "Chest / Thorax", status: "info" },
              { label: "Findings", value: "No acute cardiopulmonary abnormality", status: "normal" },
              { label: "Impression", value: "Normal study", status: "normal" },
            ],
          },
        ],
      };
    case "prescription":
      return {
        sections: [
          {
            title: "Prescription Details",
            items: [
              { label: "Medication", value: "Amlodipine 5mg", status: "info" },
              { label: "Dosage", value: "Once daily, morning", status: "info" },
              { label: "Duration", value: "90 days", status: "info" },
              { label: "Refills", value: "3 refills authorized", status: "normal" },
            ],
          },
        ],
      };
    default:
      return {
        sections: [
          {
            title: "Report Summary",
            items: [
              { label: "Status", value: "Complete", status: "normal" },
              { label: "Provider", value: "HealthScan Medical Center", status: "info" },
            ],
          },
        ],
      };
  }
};

export function DocumentViewer({ document, open, onOpenChange }: DocumentViewerProps) {
  if (!document) return null;

  const Icon = typeIcons[document.type];
  const statusColor = getDocumentStatusColor(document.status);
  const statusLabel = getDocumentStatusLabel(document.status);
  const reportContent = getMockReportContent(document);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl mb-1">{document.title}</DialogTitle>
              <DialogDescription className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDateTime(document.uploadedAt)}
                </span>
                <span className="text-muted-foreground/50">•</span>
                <span>{typeLabels[document.type]}</span>
              </DialogDescription>
            </div>
            <StatusBadge variant={statusColor as any}>{statusLabel}</StatusBadge>
          </div>
        </DialogHeader>

        <Separator className="my-4" />

        {/* Patient Info */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{document.patientName}</p>
            <p className="text-sm text-muted-foreground">Patient</p>
          </div>
        </div>

        {/* Report Content */}
        {document.status === "approved" ? (
          <div className="space-y-6">
            {reportContent.sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
                    >
                      <span className="text-sm font-medium">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{item.value}</span>
                        {item.status === "normal" && (
                          <CheckCircle className="w-4 h-4 text-success" />
                        )}
                        {"range" in item && (
                          <span className="text-xs text-muted-foreground">
                            ({item.range})
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Clinician Notes */}
            {document.notes && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                  Clinician Notes
                </h3>
                <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm">{document.notes}</p>
                      {document.reviewedBy && (
                        <p className="text-xs text-muted-foreground mt-2">
                          — {document.reviewedBy}, {document.reviewedAt && formatDateTime(document.reviewedAt)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        ) : document.status === 'needs_changes' ? (
          <div className="space-y-4">
            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <h3 className="font-semibold text-sm text-destructive uppercase tracking-wide mb-2">
                Requested Changes
              </h3>
              <p className="text-sm text-destructive">{document.requestedChanges || 'No details provided.'}</p>
              {document.reviewedBy && (
                <p className="text-xs text-muted-foreground mt-2">
                  — {document.reviewedBy}, {document.reviewedAt && formatDateTime(document.reviewedAt)}
                </p>
              )}
            </div>
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-warning" />
              </div>
              <h3 className="font-semibold text-lg mb-2">This report needs changes</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                The clinician has requested changes to this document. Please review the requested changes and resubmit the report.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-warning" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Pending Review</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              This document is currently being reviewed by your clinician. You'll be able to view the full report once it's approved.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
