"use client";
import React, { useEffect, useState } from "react";
import ManagerAdmin from "./manager/ManagerAdmin";
import FacultyAdmin from "./faculty/FacultyAdmin";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import getUserRole from "@/hooks/getUserRole";
import Loading from "../loading";

function Dashboard() {
  const { loading } = useAuthRedirect();
  const [role, setRole] = useState<string>();

  console.log("auth redirect: ", loading);

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getUserRole();
      if (role) {
        console.log("role: ", role);
      }
      setRole(role?.role);
    };

    fetchRole();
  }, []);

  if (loading || role === null) return <Loading />;
  return (
    <>
      {role === "faculty" && <FacultyAdmin />}
      {role === "manager" && <ManagerAdmin />}
    </>
  );
}

export default Dashboard;
