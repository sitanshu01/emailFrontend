import { useState } from "react";
import Navbar1 from "../components/navbarAdmin1";
import StudentCard from "../components/studentcards";

function StudentInfo() {
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState("all");
  const [branch, setBranch] = useState("all");
  const [count, setCount] = useState(0);
  const branches = [
    "CS",
    "DCS",
    "EC",
    "DEC",
    "EE",
    "ME",
    "MNC",
    "CH",
    "CE",
    "EP",
    "CH",
    "MS",
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar1 />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2 px-4 sm:px-8 mt-8">
        <div className="mt-4 mb-4 sm:mb-10 sm:ml-10 sm:mt-15">
          <h1 className=" font-bold text-2xl sm:text-3xl">Students Requests</h1>
          <h2 className="text-sm sm:text-base">
            Review and verify students details here
          </h2>
        </div>
        <div className="px-4 sm:px-0 mb-3 flex">
          <div className="m-2">
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="m-2">
            <select
              name="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              {branches.map((branch, i) => {
                return (
                  <option className="px-2 py-1" value={branch} key={i}>
                    {branch}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            type="submit"
            className="ml-4 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleOnClick}
          >
            Apply Filter
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {count === 0 ? (
          <h1>No Student found</h1>
        ) : (
          students.map((student, index) => (
            <StudentCard key={index} name={student.name} roll={student.roll} />
          ))
        )}
      </div>
    </div>
  );
}
export default StudentInfo;

