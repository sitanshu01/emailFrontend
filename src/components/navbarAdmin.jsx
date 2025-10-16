import { Link, useNavigate } from "react-router-dom";

function NavbarAdmin() {
  const navigate = useNavigate();
  return (
    <nav className=" text-black px-4 py-2.5 fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur">
      <div className="flex justify-between items-center gap-2 pr-4 sm:pr-8 ">
        <div onClick={() => navigate("/")} className="flex items-center gap-2">
          <img
            src="/src/assets/nithlogo.png"
            alt="NITH Logo"
            className="h-8 w-8 sm:h-10 sm:w-10"
          />
          <span className="text-black mt-1.5 font-bold text-[16px] sm:text-[20px]">
            NIT Hamirpur
          </span>
        </div>
        <div className="hidden sm:flex gap-4 font-bold text-[16px] sm:text-[18px] space-x-5 sm:space-x-7 z-10 ">
          <Link to="/admin/createform" className="hover:text-blue-800">
            Create Form
          </Link>
          <Link to="/admin/studentinfo" className="hover:text-blue-800">
            Students
          </Link>
          <Link to="/admin/forms" className="hover:text-blue-800">
            Forms
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default NavbarAdmin;
