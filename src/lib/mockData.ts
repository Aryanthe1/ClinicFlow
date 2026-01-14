// Mock data for HealthScan Pro demo

export interface Patient {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  avatar?: string;
}

export interface Document {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  type: 'lab_result' | 'prescription' | 'imaging' | 'consultation' | 'other';
  status: 'pending_review' | 'approved' | 'needs_changes';
  uploadedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  fileUrl?: string;
  notes?: string;
  /** If the document was flagged as needing changes, store the requested change text here */
  requestedChanges?: string;
}

export interface Notification {
  id: string;
  type: 'new_document' | 'approval' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  documentId?: string;
}

// Demo accounts
export const DEMO_ACCOUNTS = {
  clinician: {
    email: 'clinician@example.com',
    password: 'demo123',
    name: 'Dr. Sarah Mitchell',
    role: 'clinician' as const,
    specialty: 'General Medicine',
  },
  patient: {
    email: 'patient@example.com',
    password: 'demo123',
    name: 'John Anderson',
    role: 'patient' as const,
    dateOfBirth: '1985-03-15',
  },
};

// Mock patients
export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'John Anderson',
    email: 'patient@example.com',
    dateOfBirth: '1985-03-15',
  },
  {
    id: 'p2',
    name: 'Emily Chen',
    email: 'emily.chen@email.com',
    dateOfBirth: '1992-07-22',
  },
  {
    id: 'p3',
    name: 'Michael Roberts',
    email: 'michael.r@email.com',
    dateOfBirth: '1978-11-08',
  },
];

// Mock documents/reports
export const mockDocuments: Document[] = [
  {
    id: 'd1',
    patientId: 'p1',
    patientName: 'John Anderson',
    title: 'Complete Blood Count (CBC)',
    type: 'lab_result',
    status: 'approved',
    uploadedAt: '2024-01-15T09:30:00Z',
    reviewedAt: '2024-01-15T14:20:00Z',
    reviewedBy: 'Dr. Sarah Mitchell',
    notes: 'All values within normal range. Continue current medication.',
  },
  {
    id: 'd2',
    patientId: 'p1',
    patientName: 'John Anderson',
    title: 'Chest X-Ray Report',
    type: 'imaging',
    status: 'approved',
    uploadedAt: '2024-01-10T11:00:00Z',
    reviewedAt: '2024-01-10T16:45:00Z',
    reviewedBy: 'Dr. Sarah Mitchell',
    notes: 'No abnormalities detected. Lungs clear.',
  },
  {
    id: 'd3',
    patientId: 'p1',
    patientName: 'John Anderson',
    title: 'Lipid Panel Results',
    type: 'lab_result',
    status: 'pending_review',
    uploadedAt: '2024-01-18T08:15:00Z',
  },
  {
    id: 'd4',
    patientId: 'p2',
    patientName: 'Emily Chen',
    title: 'Thyroid Function Test',
    type: 'lab_result',
    status: 'pending_review',
    uploadedAt: '2024-01-17T10:00:00Z',
  },
  {
    id: 'd5',
    patientId: 'p2',
    patientName: 'Emily Chen',
    title: 'Annual Physical Report',
    type: 'consultation',
    status: 'approved',
    uploadedAt: '2024-01-05T09:00:00Z',
    reviewedAt: '2024-01-05T17:30:00Z',
    reviewedBy: 'Dr. Sarah Mitchell',
    notes: 'Overall health excellent. Recommended vitamin D supplement.',
  },
  {
    id: 'd6',
    patientId: 'p3',
    patientName: 'Michael Roberts',
    title: 'MRI Brain Scan',
    type: 'imaging',
    status: 'needs_changes',
    uploadedAt: '2024-01-16T14:30:00Z',
    requestedChanges: 'Image quality insufficient. Please rescan.',
  },
  {
    id: 'd7',
    patientId: 'p3',
    patientName: 'Michael Roberts',
    title: 'Prescription - Blood Pressure',
    type: 'prescription',
    status: 'approved',
    uploadedAt: '2024-01-12T11:20:00Z',
    reviewedAt: '2024-01-12T12:00:00Z',
    reviewedBy: 'Dr. Sarah Mitchell',
    notes: 'Amlodipine 5mg once daily. Refill for 90 days.',
  },
];

// Mock notifications for clinician
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'new_document',
    title: 'New Document Uploaded',
    message: 'John Anderson uploaded Lipid Panel Results',
    timestamp: '2024-01-18T08:15:00Z',
    read: false,
    documentId: 'd3',
  },
  {
    id: 'n2',
    type: 'new_document',
    title: 'New Document Uploaded',
    message: 'Emily Chen uploaded Thyroid Function Test',
    timestamp: '2024-01-17T10:00:00Z',
    read: false,
    documentId: 'd4',
  },
  {
    id: 'n3',
    type: 'new_document',
    title: 'Document Needs Attention',
    message: 'MRI scan from Michael Roberts requires review',
    timestamp: '2024-01-16T14:30:00Z',
    read: true,
    documentId: 'd6',
  },
];

// Helper functions
export const getDocumentStatusColor = (status: Document['status']) => {
  switch (status) {
    case 'approved':
      return 'success';
    case 'pending_review':
      return 'warning';
    case 'needs_changes':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export const getDocumentStatusLabel = (status: Document['status']) => {
  switch (status) {
    case 'approved':
      return 'Approved';
    case 'pending_review':
      return 'Needs Review';
    case 'needs_changes':
      return 'Needs Changes';
    default:
      return status;
  }
};

export const getDocumentTypeIcon = (type: Document['type']) => {
  switch (type) {
    case 'lab_result':
      return 'flask';
    case 'prescription':
      return 'pill';
    case 'imaging':
      return 'scan';
    case 'consultation':
      return 'stethoscope';
    default:
      return 'file';
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
