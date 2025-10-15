import { useEffect, useState } from "react";
import Navbar1 from "../components/navbarAdmin1";
import { adminAPI } from "../api/admin";
import { useNavigate } from "react-router-dom";
import {Plus, Edit, Notebook, NotebookPen, NotebookPenIcon} from 'lucide-react';

function FormsPage() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await adminAPI.getForms();
        setForms(response.data || []);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to load forms.");
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  const handleEdit = (formId) => {
    navigate(`/admin/edit/form/${formId}`);
  };

  const handleViewSubmissions = (formId) => {
    navigate(`/admin/form/submissions/${formId}`);
  };

  const handleCreateNew = () => {
    navigate("/admin/createform");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar1 />
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading forms...</p>
            </div>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">My Forms</h1>
            <p className="text-gray-600 mt-2">
              {forms.length} {forms.length === 1 ? "form" : "forms"} created
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5"/>
            Create New Form
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {forms.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No forms yet
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by creating your first form
            </p>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5"/>
              Create Your First Form
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {forms.map((form) => (
              <div
                key={form.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    {/* Left side - Form info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-semibold text-gray-800">
                          {form.formName}
                        </h2>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            form.published
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {form.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600 mt-3">
                        <div className="flex items-center gap-2">
                          <Notebook className="w-4 h-4"/>
                          <span>
                            {form.question?.length || 0} questions
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <NotebookPenIcon/>
                          <span>
                            Created {new Date(form.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Action buttons */}
                    <div className="flex items-center gap-3 ml-6">
                      <button
                        onClick={() => handleViewSubmissions(form.id)}
                        className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        <Notebook/>
                        View Submissions
                      </button>
                      
                      <button
                        onClick={() => handleEdit(form.id)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        <Edit/>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FormsPage;