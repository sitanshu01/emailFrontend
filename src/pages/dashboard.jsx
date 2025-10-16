import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentAPI } from "../api/student.js";
import InfoCard from "../components/InfoCard"; // Now a display component
import NavbarStudent from "../components/NavbarStudent";
import Footer from "../components/footer";
import { handleApiError } from "../utils/errorHandler.js";

function Dashboard() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const profileResponse = await studentAPI.getProfile();
        if (profileResponse.data) {
          setStudentName(profileResponse.data.firstName || "Student");
        }

        const summaryResponse = await studentAPI.getStudentDashboardSummary();
        if (summaryResponse.data) {
          setDashboardSummary(summaryResponse.data);
        }
      } catch (err) {
        setError(handleApiError(err).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shareId = inputRef.current.value;
    if (!shareId) {
      alert("Please enter a valid Share Id");
      return;
    }
    navigate(`/submit/form/${shareId}`);
  };

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
      <NavbarStudent />
      <div className="max-w-7xl mx-auto p-6 mt-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Welcome, {studentName}!
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Your personalized student dashboard.
        </p>

        {/* Info Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <InfoCard
            title="Total Submissions"
            value={dashboardSummary?.totalSubmissions || 0}
          />
          <InfoCard
            title="Pending Submissions"
            value={dashboardSummary?.pendingSubmissions || 0}
          />
          <InfoCard
            title="Approved Submissions"
            value={dashboardSummary?.approvedSubmissions || 0}
          />
          <InfoCard
            title="Rejected Submissions"
            value={dashboardSummary?.rejectedSubmissions || 0}
          />
        </div>

        {/* Submitted Forms List Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your Submitted Forms
          </h2>
          {dashboardSummary?.formsSummary &&
          dashboardSummary.formsSummary.length > 0 ? (
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
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardSummary.formsSummary.map((form) => (
                    <tr key={form.submissionId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {form.formName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            form.status === "APPROVED"
                              ? "bg-green-100 text-green-800"
                              : form.status === "REJECTED"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {form.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">
              You haven't submitted any forms yet.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
