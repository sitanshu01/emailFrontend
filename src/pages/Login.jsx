import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/auth.js";
import { handleApiError } from "../utils/errorHandler.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const credentials = {
        email,
        password,
        role
      };

      const response = await authAPI.signin(credentials);
      console.log(response);
      if (response.message === 'signin success') {
        // Store user data
        const userData = {
          email,
          role
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Navigate based on role
        switch (role) {
          case 'STUDENT':
            navigate('/student/dashboard');
            break;
          case 'ADMIN':
            navigate('/admin');
            break;
          case 'SUPERADMIN':
            navigate('/superadmin');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (error) {
      const errorInfo = handleApiError(error);
      setError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex">
      <div className="w-1/2 h-full bg-neutral-950 text-white">
        <div className="flex flex-col gap-3 items-center justify-center w-full h-full py-5">
          <h1 className="w-full text-center font-bold text-2xl">
            Login to your account
          </h1>
          <p className="w-full text-center text-neutral-400">
            Login to Online Email Allotment System by NITH
          </p>
          
          {error && (
            <div className="w-2/3 bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-md text-center">
              {error}
            </div>
          )}
          
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col gap-5 w-full items-center justify-around "
          >
            <div className="flex flex-col w-2/3 gap-3">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                placeholder="hello@gmail.com"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-neutral-800 text-sm outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md"
              />
            </div>
            <div className="flex flex-col w-2/3 gap-3">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <input
                placeholder=""
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-neutral-800 text-sm outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md"
              />
              <a href="" className="">
                Forgot Your{" "}
                <span className="underline underline-offset-1">Password</span>?
              </a>
            </div>
            <select
              name="Role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
              className="w-2/3 bg-neutral-800 rounded-md px-2 py-1 mt-2"
            >
              <option className="rounded-md px-2 py-1 " value="STUDENT">
                Student
              </option>
              <option className="rounded-md px-2 py-1" value="ADMIN">
                Admin
              </option>
              <option className="rounded-md px-2 py-1" value="SUPERADMIN">
                Super Admin
              </option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className={`w-2/3 rounded-md px-3 py-1 font-medium transition-colors ${
                loading 
                  ? 'bg-neutral-600 text-neutral-400 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <h1>
              Don't have a account?{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
                className="underline underline-offset-1 text-sm"
              >
                SignUp
              </span>
            </h1>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-full bg-neutral-500"></div>
    </div>
  );
};

export default Login;
