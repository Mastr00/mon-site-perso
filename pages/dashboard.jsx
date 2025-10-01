import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Dashboard from "../components/MyLifeDashboard/Dashboard";

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Dashboard />
    </div>
  );
}

export default withPageAuthRequired(DashboardPage);
