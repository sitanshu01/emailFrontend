import { superAdminAPI } from "../api/superAdmin";
import AdminCard from "../components/adminCard";
import NavbarSuperAdmin from "../components/superAdminNavbar";
import { useEffect, useState } from "react";
import UserCard from "../components/userCard";

function GetAdmins() {
  const [admins, setAdmins] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await superAdminAPI.getAdmins();
        setAdmins(response.data);
        setCount(response.data.length || 0);
        console.log(response.data);
        console.log(response);
        console.log("hello");
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div>
      <NavbarSuperAdmin></NavbarSuperAdmin>
      <div className="flex justify-between items-center gap-2 pr-8">
        <div className="mt-19 mb-10 ml-10">
          <h1 className="font-bold text-3xl">Admins</h1>
          <h2>Manage and review admin users here</h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {count === 0 ? (
          <h1 className="text-xl font-medium">No admins Found</h1>
        ) : (
          admins.map((admin, index) => (
            // <AdminCard key={index} name={admin.firstName} branch={admin.branch} />
            <UserCard
              key={index}
              id={admin.id}
              name={admin.firstName}
              middlename={admin.middleName}
              lastname={admin.lastName}
              email={admin.email}
              branch={admin.branch}
              role="Admin"
              status={admin.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default GetAdmins;
