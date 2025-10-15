import Navbar from "../components/Navbar";
import InutPlace from "../components/inputPlace";
import InfoCard from "../components/InfoCard";
import Footer from "../components/footer";
import { useEffect, useRef, useState } from "react";
import { studentAPI } from "../api/student.js";
import { handleApiError } from "../utils/errorHandler.js";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        setLoading(true);
        const response = await studentAPI.getProfile();
        
        if (response.data) {
          console.log(response.data);
          setStudentName(response.data.firstName || "Student");
          // You might want to set status based on form submissions
          setStatus("Not submitted");
        }
      } catch (error) {
        const errorInfo = handleApiError(error);
        setError(errorInfo.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, []);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const shareId = inputRef.current.value;
    if(!shareId){
      alert("Please enter a valid Share Id");
      return;
    }
    navigate(`/submit/form/${shareId}`);
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center mb-10">
        <Navbar></Navbar>
        <h1 className="text-4xl font-bold pb-2 mt-15 ">Student Dashboard</h1>
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-medium">Hello, {studentName}</h1>
            <h2 className="text-1xl font-medium m-8 px-5 ">
              Welcome to your student portal.View your information and submit your
              email allotement request.
            </h2>
            <h1>
              Your current form status is{" "}
              <span className="font-medium">{status}</span>
            </h1>
          </>
        )}
        
      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-10 gap-4 bg-neutral-100 p-5 rounded-md w-1/3">
        <h1 className="w-full">Enter Share Id</h1>
        <input ref={inputRef} className="px-2 py-1 outline-1 rounded-md w-full" type="text" placeholder="Enter share ID "/>
        <button className="px-5 py-2 rounded-md bg-blue-600 text-white" type="submit">Fill form</button>
      </form>
      </div>
      <Footer />
    </>
  );
}
export default Dashboard;

