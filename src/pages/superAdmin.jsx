import AdminForm from "../components/adminForm";  
import NavbarSuperAdmin from "../components/superAdminNavbar";

function SuperAdmin() {
    const name = "Sitanshu"
    return(
        <div className="min-h-screen w-full flex flex-col items-center mb-10">
            <NavbarSuperAdmin/>
            <h1 className="mt-20 font-bold text-3xl">Welcome, {name} </h1>
        </div>

    )
}

export default SuperAdmin