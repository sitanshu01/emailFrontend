import { Link, useNavigate } from "react-router-dom";

function NavbarStudent() {
  const navigate = useNavigate();
  return (
    <nav className=" text-black px-4 py-2.5 fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur">
      <div className="flex justify-between items-center gap-2 pr-8">
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
        <div className="flex gap-4 font-bold text-[18px] space-x-7 z-60">
          <Link to="/student/dashboard" className="hover:text-blue-800">
            Dashboard
          </Link>
          <Link to="/logout" className="hover:text-blue-800">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarStudent;
