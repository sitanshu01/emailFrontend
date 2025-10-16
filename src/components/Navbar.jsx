import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className=" text-black px-4 py-2.5 fixed top-0 left-0 w-full z-50 ">
      <div className="flex justify-between items-center gap-2 pr-8 ">
        <div
          onClick={() => navigate("/")}
          className="flex justify-center items-center gap-2"
        >
          <img
            src="/src/assets/nithlogo.png"
            alt="NITH Logo"
            className="h-10 w-10"
          />
          <span className="text-black mt-1.5 font-bold text-[20px]">
            NIT Hamirpur
          </span>
        </div>
        <div className="flex gap-4 font-bold text-[18px] space-x-7 z-60 ">
          <a href="#home" className="hover:text-blue-800">
            Home
          </a>
          <a href="#about" className="hover:text-blue-800">
            About Us
          </a>
          <Link to="/login" className="hover:text-blue-800">
            Login
          </Link>
          <Link to="/signup" className="hover:text-blue-800">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
