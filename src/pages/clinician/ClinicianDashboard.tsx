import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { NotificationCard } from "@/components/notifications/NotificationCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Users,
  Bell,
  CheckCircle,
  Clock,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { mockDocuments, mockNotifications, mockPatients, DEMO_ACCOUNTS } from "@/lib/mockData";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const ClinicianDashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);

  const pendingDocs = mockDocuments.filter((d) => d.status === "pending_review");
  const approvedDocs = mockDocuments.filter((d) => d.status === "approved");
  const needsChanges = mockDocuments.filter((d) => d.status === "needs_changes");
  const unreadNotifications = notifications.filter((n) => !n.read);

  const handleViewNotification = (notification: typeof notifications[0]) => {
    navigate("/clinician/documents");
  };

  const handleMarkAsRead = (notification: typeof notifications[0]) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );
  };

  return (
    <DashboardLayout role="clinician" userName={DEMO_ACCOUNTS.clinician.name}>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          Good morning, Dr. {DEMO_ACCOUNTS.clinician.name.split(" ").pop()}! 👨‍⚕️
        </h1>
        <p className="text-muted-foreground">
          You have {pendingDocs.length} documents awaiting review.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Pending Review"
          value={pendingDocs.length}
          subtitle="Requires attention"
          icon={Clock}
          variant="warning"
        />
        <StatsCard
          title="Approved"
          value={approvedDocs.length}
          subtitle="This month"
          icon={CheckCircle}
          variant="success"
        />
        <StatsCard
          title="Needs Changes"
          value={needsChanges.length}
          subtitle="Awaiting patient"
          icon={AlertTriangle}
          variant="primary"
        />
        <StatsCard
          title="Total Patients"
          value={mockPatients.length}
          subtitle="Active patients"
          icon={Users}
          variant="info"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Documents requiring review */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                Documents Requiring Review
              </CardTitle>
              <Link to="/clinician/documents">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingDocs.length > 0 ? (
                pendingDocs.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    showPatientName
                  />
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 text-success/50" />
                  <p>All documents have been reviewed!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Notifications sidebar */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
                {unreadNotifications.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                    {unreadNotifications.length}
                  </span>
                )}
              </CardTitle>
              <Link to="/clinician/notifications">
                <Button variant="ghost" size="sm" className="gap-1">
                  All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.slice(0, 3).map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onView={handleViewNotification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClinicianDashboard;
