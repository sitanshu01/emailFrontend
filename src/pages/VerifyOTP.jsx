import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { otpAPI } from "../api/otp.js";
import { handleApiError } from "../utils/errorHandler.js";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(location.state?.email || "");
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const otpString = otp.join("");
      if (otpString.length !== 6) {
        setErrorMsg("Please enter a valid 6-digit OTP");
        return;
      }

      if (!email) {
        setErrorMsg("Email not found. Please try signing up again.");
        return;
      }

      const otpData = {
        email: email,
        otp: otpString
      };

      const response = await otpAPI.verifyOTP(otpData);
      
      if (response.status === "OTP verified") {
        // Navigate to login page after successful verification
        navigate('/login', { 
          state: { message: 'Email verified successfully! Please login.' } 
        });
      } else {
        setErrorMsg("Invalid OTP. Please try again.");
      }
    } catch (error) {
      const errorInfo = handleApiError(error);
      setErrorMsg(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-100">
      <div className="bg-neutral-800/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-neutral-700/50">
        <h1 className="text-3xl font-semibold text-center mb-6 text-neutral-200">
          Verify OTP
        </h1>

        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col items-center gap-6"
        >
          {/* OTP Inputs */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 h-14 text-center text-2xl rounded-lg bg-neutral-700 text-neutral-100 border border-neutral-600 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-500 outline-none transition-all duration-150"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 text-lg shadow-md ${
              loading
                ? "bg-neutral-700 cursor-not-allowed"
                : "bg-neutral-600 hover:bg-neutral-50 hover:text-neutral-800 active:scale-[0.98]"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Error Message */}
        {errorMsg && (
          <p className="text-red-400 text-center mt-4 text-sm">{errorMsg}</p>
        )}

        {/* Resend OTP */}
        <p className="text-neutral-400 text-center mt-6 text-sm">
          Didn’t receive the code?{" "}
          <button
            onClick={() => alert("Resend OTP feature coming soon")}
            className="text-neutral-300 hover:text-neutral-100 underline underline-offset-2"
            type="button"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
