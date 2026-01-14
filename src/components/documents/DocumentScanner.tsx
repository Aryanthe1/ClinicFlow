import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera, Upload, FileText, X, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentScannerProps {
  onUploadComplete?: (file: File, documentTitle: string, documentType: string) => void;
}

export function DocumentScanner({ onUploadComplete }: DocumentScannerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadComplete(false);

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploadComplete(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!selectedFile || !documentTitle || !documentType) return;

    setIsUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsUploading(false);
    setUploadComplete(true);

    onUploadComplete?.(selectedFile, documentTitle, documentType);

    // Reset after 3 seconds
    setTimeout(() => {
      handleRemoveFile();
      setDocumentTitle("");
      setDocumentType("");
      setUploadComplete(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
        <CardContent className="p-6">
          {!selectedFile ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Upload Medical Document</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Take a photo or upload from your device
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <Button
                  onClick={() => cameraInputRef.current?.click()}
                  className="gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Take Photo
                </Button>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Supported formats: JPG, PNG, PDF (max 10MB)
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview */}
              <div className="relative">
                {preview ? (
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                    <img
                      src={preview}
                      alt="Document preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] rounded-lg bg-muted flex items-center justify-center">
                    <FileText className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveFile}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <FileText className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium truncate">{selectedFile.name}</span>
                <span className="text-xs text-muted-foreground ml-auto shrink-0">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Details Form */}
      {selectedFile && (
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="text-lg">Document Details</CardTitle>
            <CardDescription>
              Provide information about the document for clinician review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Document Title</Label>
              <Input
                id="title"
                placeholder="e.g., Blood Test Results from Jan 2024"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Document Type</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lab_result">Lab Result</SelectItem>
                  <SelectItem value="imaging">Imaging / X-Ray</SelectItem>
                  <SelectItem value="prescription">Prescription</SelectItem>
                  <SelectItem value="consultation">Consultation Report</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full mt-4"
              size="lg"
              onClick={handleUpload}
              disabled={!documentTitle || !documentType || isUploading || uploadComplete}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : uploadComplete ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Upload Complete!
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Submit for Review
                </>
              )}
            </Button>

            {uploadComplete && (
              <p className="text-sm text-center text-success animate-fade-in">
                Your document has been submitted for clinician review.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
