import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { DocumentViewer } from "@/components/documents/DocumentViewer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, Scan, ArrowRight, Plus, AlertTriangle } from "lucide-react";
import { mockDocuments, DEMO_ACCOUNTS, type Document } from "@/lib/mockData";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  const patientDocuments = mockDocuments.filter((d) => d.patientId === "p1");
  const approvedDocs = patientDocuments.filter((d) => d.status === "approved");
  const pendingDocs = patientDocuments.filter((d) => d.status === "pending_review");
  const needsChanges = patientDocuments.filter((d) => d.status === "needs_changes");

  return (
    <DashboardLayout role="patient" userName={DEMO_ACCOUNTS.patient.name}>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          Welcome back, {DEMO_ACCOUNTS.patient.name.split(" ")[0]}! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your medical documents.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Documents"
          value={patientDocuments.length}
          subtitle="All uploaded documents"
          icon={FileText}
          variant="primary"
        />
        <StatsCard
          title="Approved"
          value={approvedDocs.length}
          subtitle="Ready to view"
          icon={CheckCircle}
          variant="success"
        />
        <StatsCard
          title="Pending Review"
          value={pendingDocs.length}
          subtitle="Awaiting clinician"
          icon={Clock}
          variant="warning"
        />
        <StatsCard
          title="Needs Changes"
          value={needsChanges.length}
          subtitle="Action required"
          icon={AlertTriangle}
          variant="destructive"
        />
        <Link to="/patient/scan" className="block">
          <Card className="h-full border-dashed border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all cursor-pointer group">
            <CardContent className="h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-primary">Scan Document</h3>
              <p className="text-xs text-muted-foreground mt-1">Upload new report</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Documents */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Approved Documents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              Approved Reports
            </CardTitle>
            <Link to="/patient/reports">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {approvedDocs.length > 0 ? (
              approvedDocs.slice(0, 3).map((doc) => (
                <DocumentCard 
                  key={doc.id} 
                  document={doc} 
                  onView={setSelectedDocument}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No approved documents yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Pending Documents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-warning" />
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingDocs.length > 0 ? (
              pendingDocs.map((doc) => (
                <DocumentCard 
                  key={doc.id} 
                  document={doc} 
                  onView={setSelectedDocument}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground mb-4">
                  No documents pending review
                </p>
                <Link to="/patient/scan">
                  <Button size="sm" className="gap-2">
                    <Scan className="w-4 h-4" />
                    Scan New Document
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Requested Changes Documents */}
      <div className="mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Requested Changes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {needsChanges.length > 0 ? (
              needsChanges.slice(0, 3).map((doc) => (
                <DocumentCard 
                  key={doc.id} 
                  document={doc} 
                  onView={setSelectedDocument}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No documents require changes
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewer
        document={selectedDocument}
        open={!!selectedDocument}
        onOpenChange={(open) => !open && setSelectedDocument(null)}
      />
    </DashboardLayout>
  );
};

export default PatientDashboard;
