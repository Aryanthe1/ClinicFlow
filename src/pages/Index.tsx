import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, User, Stethoscope, ArrowRight, Shield, FileText, Bell } from "lucide-react";
import { DEMO_ACCOUNTS } from "@/lib/mockData";

const Index = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState<"patient" | "clinician">("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const account = activeRole === "clinician" ? DEMO_ACCOUNTS.clinician : DEMO_ACCOUNTS.patient;

    if (email === account.email && password === account.password) {
      navigate(activeRole === "clinician" ? "/clinician" : "/patient");
    } else {
      setError("Invalid credentials. Use demo account.");
    }
  };

  const handleDemoLogin = (role: "patient" | "clinician") => {
    const account = role === "clinician" ? DEMO_ACCOUNTS.clinician : DEMO_ACCOUNTS.patient;
    setEmail(account.email);
    setPassword(account.password);
    setActiveRole(role);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

        {/* Navigation */}
        <nav className="relative z-10 px-6 lg:px-12 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">HealthScan</h1>
                <p className="text-xs text-muted-foreground -mt-0.5">Pro</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Login
              </a>
            </div>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  HIPAA Compliant Platform
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Smart Medical
                  <span className="text-primary"> Document</span> Management
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Seamlessly scan, upload, and manage medical documents with real-time clinician review and notifications.
                </p>
              </div>

              {/* Feature highlights */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Smart Scanning</h3>
                    <p className="text-sm text-muted-foreground">Capture and upload documents instantly</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Real-time Alerts</h3>
                    <p className="text-sm text-muted-foreground">Instant clinician notifications</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Login Card */}
            <div id="login" className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <Card className="shadow-2xl border-border/50">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl">Welcome Back</CardTitle>
                  <CardDescription>Select your role and sign in</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs
                    value={activeRole}
                    onValueChange={(v) => setActiveRole(v as "patient" | "clinician")}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="patient" className="gap-2">
                        <User className="w-4 h-4" />
                        Patient
                      </TabsTrigger>
                      <TabsTrigger value="clinician" className="gap-2">
                        <Stethoscope className="w-4 h-4" />
                        Clinician
                      </TabsTrigger>
                    </TabsList>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      {error && (
                        <p className="text-sm text-destructive text-center">{error}</p>
                      )}

                      <Button type="submit" className="w-full gap-2" size="lg">
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </form>

                    {/* Demo login buttons */}
                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-xs text-muted-foreground text-center mb-3">
                        Quick demo access:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDemoLogin("patient")}
                          className="text-xs"
                        >
                          <User className="w-3 h-3 mr-1.5" />
                          Patient Demo
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDemoLogin("clinician")}
                          className="text-xs"
                        >
                          <Stethoscope className="w-3 h-3 mr-1.5" />
                          Clinician Demo
                        </Button>
                      </div>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="px-6 lg:px-12 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A streamlined workflow for patients and clinicians to manage medical documents efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">1. Scan & Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Patients scan or upload medical documents using their device camera or file picker.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-2xl bg-warning/10 flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-warning" />
                </div>
                <h3 className="text-lg font-semibold mb-2">2. Clinician Review</h3>
                <p className="text-sm text-muted-foreground">
                  Clinicians receive notifications and review uploaded documents for accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-lg font-semibold mb-2">3. Approved & Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Once approved, documents are securely stored and accessible to patients.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <span className="font-semibold">HealthScan Pro</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 HealthScan Pro. Demo Application.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
