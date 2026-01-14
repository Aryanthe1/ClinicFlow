import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { DocumentViewer } from "@/components/documents/DocumentViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockDocuments, mockPatients, DEMO_ACCOUNTS, type Document } from "@/lib/mockData";
import {
  Search,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Filter,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ClinicianDocuments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patientFilter, setPatientFilter] = useState("all");
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [documents, setDocuments] = useState(mockDocuments);

  const pendingDocs = documents.filter((d) => d.status === "pending_review");
  const approvedDocs = documents.filter((d) => d.status === "approved");
  const needsChanges = documents.filter((d) => d.status === "needs_changes");

  const filterDocs = (docs: typeof documents) => {
    let filtered = docs;

    if (searchQuery) {
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (patientFilter !== "all") {
      filtered = filtered.filter((d) => d.patientId === patientFilter);
    }

    return filtered;
  };

  const handleApprove = (doc: Document) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === doc.id
          ? {
              ...d,
              status: "approved" as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: DEMO_ACCOUNTS.clinician.name,
              notes: reviewNotes || d.notes,
            }
          : d
      )
    );
    setSelectedDoc(null);
    setReviewNotes("");
    toast.success("Document approved successfully");
  };

  const handleReject = (doc: Document) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === doc.id
          ? {
              ...d,
              status: "needs_changes" as const,
              requestedChanges: reviewNotes || "Please provide clearer documentation.",
            }
          : d
      )
    );
    setSelectedDoc(null);
    setReviewNotes("");
    toast.error("Document marked as needs changes");
  };

  const handleViewDocument = (doc: Document) => {
    setViewingDoc(doc);
  };

  return (
    <DashboardLayout role="clinician" userName={DEMO_ACCOUNTS.clinician.name}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">Documents</h1>
        <p className="text-muted-foreground">
          Review and manage patient documents.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, patient, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={patientFilter} onValueChange={setPatientFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by patient" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Patients</SelectItem>
            {mockPatients.map((patient) => (
              <SelectItem key={patient.id} value={patient.id}>
                {patient.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="w-4 h-4" />
            Pending ({pendingDocs.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Approved ({approvedDocs.length})
          </TabsTrigger>
          <TabsTrigger value="changes" className="gap-2">
            <AlertTriangle className="w-4 h-4" />
            Needs Changes ({needsChanges.length})
          </TabsTrigger>
          <TabsTrigger value="all" className="gap-2">
            <FileText className="w-4 h-4" />
            All ({documents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {filterDocs(pendingDocs).length > 0 ? (
            filterDocs(pendingDocs).map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                showPatientName
                showActions
                onApprove={() => setSelectedDoc(doc)}
                onReject={() => setSelectedDoc(doc)}
                onView={handleViewDocument}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No pending documents
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {filterDocs(approvedDocs).length > 0 ? (
            filterDocs(approvedDocs).map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                showPatientName
                onView={handleViewDocument}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No approved documents
            </div>
          )}
        </TabsContent>

        <TabsContent value="changes" className="space-y-4">
          {filterDocs(needsChanges).length > 0 ? (
            filterDocs(needsChanges).map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                showPatientName
                onView={handleViewDocument}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No documents need changes
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {filterDocs(documents).length > 0 ? (
            filterDocs(documents).map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                showPatientName
                showActions={doc.status === "pending_review"}
                onApprove={() => setSelectedDoc(doc)}
                onReject={() => setSelectedDoc(doc)}
                onView={handleViewDocument}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No documents found
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Review Document</DialogTitle>
            <DialogDescription>
              {selectedDoc?.title} from {selectedDoc?.patientName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Review Notes (Optional)</Label>
              <Textarea
                placeholder="Add notes for the patient or for your records..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedDoc(null)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedDoc && handleReject(selectedDoc)}
              className="w-full sm:w-auto"
            >
              Needs Changes
            </Button>
            <Button
              onClick={() => selectedDoc && handleApprove(selectedDoc)}
              className="w-full sm:w-auto bg-success hover:bg-success/90"
            >
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Viewer */}
      <DocumentViewer
        document={viewingDoc}
        open={!!viewingDoc}
        onOpenChange={(open) => !open && setViewingDoc(null)}
      />
    </DashboardLayout>
  );
};

export default ClinicianDocuments;
