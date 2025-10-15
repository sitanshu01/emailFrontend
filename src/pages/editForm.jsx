import { useState, useEffect } from "react";
import Navbar1 from "../components/navbarAdmin1";
import { adminAPI } from "../api/adminV0";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Copy } from "lucide-react";

const EditForm = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", type: "TEXT", required: true },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [shareId, setShareId] = useState("");
  const [copied, setCopied] = useState(false);

  // Fetch form data on mount
  useEffect(() => {
    const fetchForm = async () => {
      if (!formId) {
        setError("Form ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await adminAPI.getForm(formId);
        const form = response.data;
        
        setFormName(form.formName);
        setIsPublished(form.published || false);
        
        // Transform questions to match the state format
        const transformedQuestions = form.question.map((q) => {
          const questionData = {
            id: q.id, // Keep ID for tracking
            question: q.question,
            type: q.type,
            required: q.required,
          };
          
          // Only add options if it's MCQ
          if (q.type === "MCQ" && q.options && q.options.length > 0) {
            questionData.options = q.options.map((opt) => opt.option);
          }
          
          return questionData;
        });
        
        setQuestions(transformedQuestions);
        setError(null);
      } catch (err) {
        console.error("Error fetching form:", err);
        setError(err.response?.data?.message || "Failed to fetch form");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  // Add new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", type: "TEXT", required: true },
    ]);
  };

  // Remove question
  const removeQuestion = (index) => {
    if (questions.length === 1) {
      alert("You must have at least one question");
      return;
    }
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  // Add option
  const addOption = (qIndex) => {
    const updated = [...questions];
    if (!updated[qIndex].options) {
      updated[qIndex].options = [];
    }
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  // Remove option
  const removeOption = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].options.splice(oIndex, 1);
    setQuestions(updated);
  };

  // Handle changes
  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formName.trim()) {
      alert("Form name is required");
      return;
    }
    
    if (questions.some(q => !q.question.trim())) {
      alert("All questions must have text");
      return;
    }
    
    try {
      // Clean up questions before sending
      const cleanedQuestions = questions.map((q) => {
        const cleanQuestion = {
          question: q.question,
          type: q.type,
          required: q.required,
        };
        
        // Only include options if type is MCQ and options exist
        if (q.type === "MCQ" && q.options && q.options.length > 0) {
          const filteredOptions = q.options.filter(opt => opt.trim() !== "");
          if (filteredOptions.length === 0) {
            throw new Error("MCQ questions must have at least one option");
          }
          cleanQuestion.options = filteredOptions;
        } else if (q.type === "MCQ") {
          throw new Error("MCQ questions must have at least one option");
        }
        
        return cleanQuestion;
      });

      const payload = { formName, questions: cleanedQuestions };
      const response = await adminAPI.updateForm(formId, payload);
      console.log("Form updated:", response);
      alert("Form updated successfully!");
      navigate("/admin/forms");
    } catch (error) {
      console.log(error);
      alert(error.message || "Failed to update form. Please check your input.");
    }
  };

const handlePublishToggle = async () => {
  if (!formId) return;
  try {
    const newPublishStatus = !isPublished;
    let response;
    
    // Use if-else to call the appropriate API
    if (newPublishStatus) {
      // Publishing the form
      response = await adminAPI.publishForm(formId);
    } else {
      // Unpublishing the form
      response = await adminAPI.unpublishForm(formId);
    }
    
    setIsPublished(newPublishStatus);
    console.log(response);
    
    // If publishing, copy shareId to clipboard
    if (newPublishStatus && response.data?.shareId) {
      setShareId(response.data.shareId);///submit/form/:shareId
      const shareLink = `${window.location.origin}/submit/form/${response.data.shareId}`;
      await navigator.clipboard.writeText(shareLink);
      alert(`Form published successfully! Share link copied to clipboard`);
    } else {
      alert(`Form unpublished successfully!`);
    }
    
  } catch (err) {
    console.error("Failed to toggle publish status:", err);
    alert("Failed to update publish status.");
  }
};

  if (loading) {
    return (
      <>
        <Navbar1 />
        <div className="max-w-3xl mx-auto p-6 mt-20">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading form...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar1 />
        <div className="max-w-3xl mx-auto p-6 mt-20">
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
      </>
    );
  }

  return (
    <>
      <Navbar1 />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Update Form</h2>
          <button
            onClick={() => navigate("/admin/forms")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>

        <input
          type="text"
          placeholder="Form Name"
          value={formName}
          required
          onChange={(e) => setFormName(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Copy className="w-5 h-5 cursor-pointer text-gray-600 mb-4">
          <button onClick={async()=>{
            await navigator.clipboard.writeText(shareId);
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
            }}></button>
        </Copy>
        {copied && (
          <span className="text-green-600 font-semibold text-sm animate-fade">
            Copied!
          </span>
        )}

        <Link to={`/submit/form/${shareId}`}>Form Link</Link>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border border-gray-200 rounded p-4 mb-4">
            <div className="flex items-center mb-3">
              <input
                type="text"
                placeholder={`Question ${qIndex + 1}`}
                value={q.question}
                required
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => removeQuestion(qIndex)}
                className="ml-3 text-white bg-red-600 p-2 rounded-md font-semibold"
              >
                Remove
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-3">
              <label className="flex items-center space-x-2">
                <span className="text-gray-700">Type:</span>
                <select
                  value={q.type}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[qIndex].type = e.target.value;
                    // Initialize options array when switching to MCQ
                    if (e.target.value === "MCQ") {
                      updated[qIndex].options = [""];
                    } else {
                      // Remove options when switching away from MCQ
                      delete updated[qIndex].options;
                    }
                    setQuestions(updated);
                  }}
                  className="border border-gray-300 rounded p-1"
                >
                  <option value="TEXT">Text</option>
                  <option value="MCQ">Multiple Choice</option>
                </select>
              </label>

              <label className="flex items-center space-x-2">
                <span className="text-gray-700">Required:</span>
                <input
                  type="checkbox"
                  checked={q.required}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[qIndex].required = e.target.checked;
                    setQuestions(updated);
                  }}
                  className="h-4 w-4"
                />
              </label>
            </div>

            {q.type === "MCQ" && (
              <div className="pl-4">
                {q.options?.map((opt, oIndex) => (
                  <div
                    key={oIndex}
                    className="flex items-center mb-2 space-x-2"
                  >
                    <input
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={opt}
                      required
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => removeOption(qIndex, oIndex)}
                      className="ml-3 text-white bg-red-600 p-2 rounded-md font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addOption(qIndex)}
                  className="text-blue-500 hover:text-blue-700 font-semibold mt-1"
                >
                  + Add Option
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="flex space-x-4">
          <button
            onClick={addQuestion}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
          >
            + Add Question
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          >
            Update Form
          </button>
          <button
            onClick={handlePublishToggle}
            className={`${
              isPublished ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"
            } text-white font-semibold px-4 py-2 rounded`}
          >
            {isPublished ? "Unpublish Form" : "Publish Form"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditForm;