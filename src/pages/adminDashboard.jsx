import React, { useEffect, useState } from "react";
import NavbarAdmin from "../components/navbarAdmin";
import InfoCard from "../components/InfoCard"; // Now a display component
import { adminAPI } from "../api/admin";
import { handleApiError } from "../utils/errorHandler";

function AdminDashboard() {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.getAdminDashboardSummary();
        if (response.data) {
          setSummaryData(response.data);
        }
      } catch (err) {
        setError(handleApiError(err).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <div className="max-w-7xl mx-auto p-6 mt-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Admin Dashboard
        </h1>

        {/* Info Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <InfoCard title="Total Forms" value={summaryData?.totalForms || 0} />
          <InfoCard
            title="Total Submissions"
            value={summaryData?.totalSubmissions || 0}
          />
          <InfoCard
            title="Pending Submissions"
            value={summaryData?.pendingSubmissions || 0}
          />
          <InfoCard
            title="Approved Submissions"
            value={summaryData?.approvedSubmissions || 0}
          />
          <InfoCard
            title="Rejected Submissions"
            value={summaryData?.rejectedSubmissions || 0}
          />
        </div>

        {/* Forms List Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your Forms & Submission Status
          </h2>
          {summaryData?.formsSummary && summaryData.formsSummary.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Form Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Pending
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Approved
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rejected
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {summaryData.formsSummary.map((form) => (
                    <tr key={form.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {form.formName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {form.pending}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {form.approved}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {form.rejected}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">
              No forms created yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

