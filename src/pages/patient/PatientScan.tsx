import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DocumentScanner } from "@/components/documents/DocumentScanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DEMO_ACCOUNTS } from "@/lib/mockData";
import { Scan, Info } from "lucide-react";

const PatientScan = () => {
  const handleUploadComplete = (file: File, title: string, type: string) => {
    console.log("Document uploaded:", { file: file.name, title, type });
    // In a real app, this would send the document to the server
  };

  return (
    <DashboardLayout role="patient" userName={DEMO_ACCOUNTS.patient.name}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Scan className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold">Scan Document</h1>
        </div>
        <p className="text-muted-foreground">
          Upload a new medical document for clinician review.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Scanner */}
        <div className="lg:col-span-2">
          <DocumentScanner onUploadComplete={handleUploadComplete} />
        </div>

        {/* Info sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="w-4 h-4 text-info" />
                How it works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <p>Take a photo or upload your medical document</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <p>Add a title and select the document type</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <p>Submit for clinician review</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-success/10 text-success font-semibold flex items-center justify-center shrink-0 text-xs">
                  ✓
                </span>
                <p>Once approved, view the report in your dashboard</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-muted">
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Tips for best results</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Ensure good lighting when taking photos</li>
                <li>• Keep the document flat and in focus</li>
                <li>• Include all pages of multi-page documents</li>
                <li>• Use PDF format for best quality</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientScan;
