import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { DocumentViewer } from "@/components/documents/DocumentViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { mockDocuments, DEMO_ACCOUNTS, type Document } from "@/lib/mockData";
import { Search, FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const PatientReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  const patientDocuments = mockDocuments.filter((d) => d.patientId === "p1");
  const approvedDocs = patientDocuments.filter((d) => d.status === "approved");
  const pendingDocs = patientDocuments.filter((d) => d.status === "pending_review");
  const needsChanges = patientDocuments.filter((d) => d.status === "needs_changes");

  const filterBySearch = (docs: typeof patientDocuments) => {
    if (!searchQuery) return docs;
    return docs.filter((d) => {
      const q = searchQuery.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.notes?.toLowerCase().includes(q) ||
        d.requestedChanges?.toLowerCase().includes(q)
      );
    });
  };

  return (
    <DashboardLayout role="patient" userName={DEMO_ACCOUNTS.patient.name}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">My Reports</h1>
        <p className="text-muted-foreground">
          View and manage all your medical documents.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all" className="gap-2">
            <FileText className="w-4 h-4" />
            All ({patientDocuments.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Approved ({approvedDocs.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="w-4 h-4" />
            Pending ({pendingDocs.length})
          </TabsTrigger>
          <TabsTrigger value="changes" className="gap-2">
            <AlertTriangle className="w-4 h-4" />
            Needs Changes ({needsChanges.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filterBySearch(patientDocuments).length > 0 ? (
            filterBySearch(patientDocuments).map((doc) => (
              <DocumentCard 
                key={doc.id} 
                document={doc} 
                onView={setSelectedDocument}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No documents found
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {filterBySearch(approvedDocs).length > 0 ? (
            filterBySearch(approvedDocs).map((doc) => (
              <DocumentCard 
                key={doc.id} 
                document={doc} 
                onView={setSelectedDocument}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No approved documents
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterBySearch(pendingDocs).length > 0 ? (
            filterBySearch(pendingDocs).map((doc) => (
              <DocumentCard 
                key={doc.id} 
                document={doc} 
                onView={setSelectedDocument}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No pending documents
            </div>
          )}
        </TabsContent>

        <TabsContent value="changes" className="space-y-4">
          {filterBySearch(needsChanges).length > 0 ? (
            filterBySearch(needsChanges).map((doc) => (
              <DocumentCard 
                key={doc.id} 
                document={doc} 
                onView={setSelectedDocument}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No documents need changes
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Document Viewer Modal */}
      <DocumentViewer
        document={selectedDocument}
        open={!!selectedDocument}
        onOpenChange={(open) => !open && setSelectedDocument(null)}
      />
    </DashboardLayout>
  );
};

export default PatientReports;
