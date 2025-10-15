import { useEffect, useState } from "react";
import Navbar1 from "../components/navbarAdmin1";
import { adminAPI } from "../api/adminV0";
import { useNavigate, useParams } from "react-router-dom";

function SubmissionsPage() {
  const navigate = useNavigate();
  const { formId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSubmission, setExpandedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!formId) {
        setError("Form ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await adminAPI.getSubmissions(formId);
        setSubmissions(response.submissions || []);
        setFormData(response.form || null);
        setError(null);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setError("Failed to load submissions.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [formId]);

  const toggleSubmission = (submissionId) => {
    setExpandedSubmission(expandedSubmission === submissionId ? null : submissionId);
  };

  const exportToCSV = () => {
    if (!submissions.length || !formData) return;

    // Create CSV headers
    const headers = ["Submission ID", "Name", "Email", "Roll Number", "Branch", "Submitted At"];
    formData.question.forEach((q) => {
      headers.push(q.question);
    });

    // Create CSV rows
    const rows = submissions.map((sub) => {
      const row = [
        sub.id,
        `${sub.user.firstName} ${sub.user.middleName || ""} ${sub.user.lastName || ""}`.trim(),
        sub.user.email,
        sub.user.rollNumber || "N/A",
        sub.user.branch,
        new Date(sub.createdAt).toLocaleString(),
      ];

      // Add answers in order of questions
      formData.question.forEach((q) => {
        const answer = sub.answer.find((ans) => ans.question.id === q.id);
        row.push(answer ? answer.response : "No answer");
      });

      return row;
    });

    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.formName}_submissions.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar1 />
        <div className="max-w-7xl mx-auto p-6 mt-20">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading submissions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar1 />
        <div className="max-w-7xl mx-auto p-6 mt-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate("/admin/forms")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />
      <div className="max-w-7xl mx-auto p-6 mt-20">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {formData?.formName || "Form Submissions"}
              </h1>
              <p className="text-gray-600">
                Total Submissions: <span className="font-semibold">{submissions.length}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportToCSV}
                disabled={submissions.length === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-colors duration-200 ${
                  submissions.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export CSV
              </button>
              <button
                onClick={() => navigate("/admin/forms")}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-2.5 rounded-lg"
              >
                Back to Forms
              </button>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        {submissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <svg
              className="w-24 h-24 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No submissions yet</h3>
            <p className="text-gray-500">
              Submissions will appear here once students start filling out the form
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission, index) => (
              <div
                key={submission.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Submission Header */}
                <div
                  className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSubmission(submission.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {submission.user.firstName} {submission.user.middleName || ""}{" "}
                          {submission.user.lastName || ""}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            {submission.user.email}
                          </span>
                          {submission.user.rollNumber && (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                />
                              </svg>
                              {submission.user.rollNumber}
                            </span>
                          )}
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                            {submission.user.branch}
                          </span>
                          <span className="text-gray-500">
                            {new Date(submission.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-transform ${
                        expandedSubmission === submission.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Submission Details */}
                {expandedSubmission === submission.id && (
                  <div className="border-t border-gray-200 p-5 bg-gray-50">
                    <h4 className="font-semibold text-gray-700 mb-4">Responses:</h4>
                    <div className="space-y-4">
                      {submission.answer.map((ans) => (
                        <div key={ans.id} className="bg-white rounded-lg p-4 border border-gray-200">
                          <p className="font-medium text-gray-700 mb-2">{ans.question.question}</p>
                          <p className="text-gray-600 pl-4 border-l-4 border-blue-500">
                            {ans.response || (
                              <span className="text-gray-400 italic">No answer provided</span>
                            )}
                          </p>
                          <span className="text-xs text-gray-500 mt-2 inline-block">
                            Type: {ans.question.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SubmissionsPage;