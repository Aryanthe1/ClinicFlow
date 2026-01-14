import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Patient pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientReports from "./pages/patient/PatientReports";
import PatientScan from "./pages/patient/PatientScan";

// Clinician pages
import ClinicianDashboard from "./pages/clinician/ClinicianDashboard";
import ClinicianDocuments from "./pages/clinician/ClinicianDocuments";
import ClinicianNotifications from "./pages/clinician/ClinicianNotifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
        <Routes>
          {/* Landing / Login */}
          <Route path="/" element={<Index />} />

          {/* Patient Routes */}
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/reports" element={<PatientReports />} />
          <Route path="/patient/scan" element={<PatientScan />} />

          {/* Clinician Routes */}
          <Route path="/clinician" element={<ClinicianDashboard />} />
          <Route path="/clinician/documents" element={<ClinicianDocuments />} />
          <Route path="/clinician/notifications" element={<ClinicianNotifications />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
