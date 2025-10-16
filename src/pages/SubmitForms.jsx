import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { studentAPI } from "../api/student";

const SubmitForms = () => {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        const response = await studentAPI.getForm(shareId);
        setFormData(response.data);

        // Initialize answers object with empty values
        const initialAnswers = {};
        response.data.question.forEach((q) => {
          initialAnswers[q.id] = "";
        });
        setAnswers(initialAnswers);
        setError(null);
      } catch (error) {
        console.error("Error fetching form:", error);
        setError(error.response?.data?.message || "Failed to load form");
      } finally {
        setLoading(false);
      }
    };

    if (shareId) {
      fetchForm();
    }
  }, [shareId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const validateForm = () => {
    if (!formData) return false;

    for (const question of formData.question) {
      if (
        question.required &&
        (!answers[question.id] || answers[question.id].trim() === "")
      ) {
        alert(`Please answer the required question: "${question.question}"`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      // Format answers for submission
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, response]) => ({
          questionId,
          response: response.toString(),
        }),
      );

      const payload = {
        response: formattedAnswers,
      };

      await studentAPI.submitForm(shareId, payload);
      setSuccess(true);
      alert("Form submitted successfully!");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/student");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        error.response?.data?.message ||
          "Failed to submit form. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading form...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/student/dashboard")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <svg
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
          <p className="text-gray-600 mb-6">
            Your form has been submitted successfully.
          </p>
          <p className="text-sm text-gray-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (!formData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-8 border-b-4 border-blue-600">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {formData.formName}
          </h1>
          <p className="text-gray-600">
            Please fill out all required fields marked with{" "}
            <span className="text-red-500">*</span>
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-b-2xl shadow-lg"
        >
          <div className="p-8 space-y-8">
            {formData.question.map((question, index) => (
              <div
                key={question.id}
                className="pb-6 border-b border-gray-200 last:border-b-0"
              >
                {/* Question */}
                <label className="block mb-4">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <span className="text-lg font-semibold text-gray-800">
                        {question.question}
                        {question.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </span>
                      <span className="block text-sm text-gray-500 mt-1">
                        {question.type === "MCQ"
                          ? "Multiple Choice"
                          : "Text Answer"}
                      </span>
                    </div>
                  </div>

                  {/* Answer Input */}
                  {question.type === "TEXT" ||
                  question.type === "EMAIL" ||
                  question.type === "NUMBER" ? (
                    <input
                      type={
                        question.type === "EMAIL"
                          ? "email"
                          : question.type === "NUMBER"
                            ? "number"
                            : "text"
                      }
                      value={answers[question.id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                      required={question.required}
                      placeholder="Type your answer here..."
                      className="w-full ml-11 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  ) : question.type === "MCQ" ? (
                    <div className="space-y-3 ml-11">
                      {question.options.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            answers[question.id] === option.option
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option.option}
                            checked={answers[question.id] === option.option}
                            onChange={(e) =>
                              handleAnswerChange(question.id, e.target.value)
                            }
                            required={question.required}
                            className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-gray-700 font-medium">
                            {option.option}
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : null}
                </label>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="p-8 bg-gray-50 rounded-b-2xl border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <span className="text-red-500">*</span> Required fields
              </p>
              <button
                type="submit"
                disabled={submitting}
                className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"
                }`}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Form"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitForms;

