import { useState } from "react";
import InputPlace from "./inputPlace";
import { useNavigate } from "react-router-dom";
import { superAdminAPI } from "../api/superAdmin";

function AdminForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("CS");
  console.log(branch);
  const [loading, setLoading] = useState(false);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, middleName, lastName, email, branch });
    setLoading(true);
    const response = await superAdminAPI.createAdmin({
      firstName: name,
      middleName: middleName,
      lastName: lastName,
      email: email,
      branch: branch,
    });
    console.log(response);
    setLoading(false);
    navigate("/superadmin/viewadmin");
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center sm:text-left">
        Create Admin
      </h2>
      <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <InputPlace
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Middle Name</label>
          <InputPlace
            placeholder="Enter name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <InputPlace
            placeholder="Enter name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <InputPlace
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="branch" className="font-medium">
            Branch
          </label>
          <select
            name="Role"
            className="w-full bg-neutral-200 rounded-md px-2 py-1 mt-2"
            value={branch}
            onChange={(e) => {
              setBranch(e.target.value);
            }}
            disabled={loading}
            required
          >
            {branches.map((branch, i) => {
              return (
                <option className="rounded-md px-2 py-1" value={branch} key={i}>
                  {branch}
                </option>
              );
            })}
          </select>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-black text-white rounded-md py-2 font-medium"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminForm;
