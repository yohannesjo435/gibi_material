"use client";

import React, { Suspense, useEffect, useState } from "react";
import UploadCourseForm from "../components/UploadCourseForm";
import { SkeletonUploadCourseForm } from "@/components/shared/AppSkeleton";
import { makeColumns, Course } from "./columns";
import { User, MakeUserColumns } from "./userColumns";
import { UserDataTable } from "./users-data-table";
import { DataTable } from "../components/data-table";
import CreateDepartmentForm from "../components/CreateDepartmentForm";
import { supabase } from "@/lib/supabaseClient";

export default function ManagerAdmin() {
  const [materialData, setMaterialData] = useState<Course[]>([]);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMaterials = async () => {
    const { data, error } = await supabase.from("study_material").select("*");
    if (error) {
      console.error("Failed to fetch materials:", error.message);
      return;
    }
    setMaterialData(data || []);
  };

  const loadUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("id, full_name, phone_number, role, status, auth_id");
    if (error) {
      console.error("Failed to fetch users:", error.message);
      return;
    }
    setUsersData(data || []);
  };

  useEffect(() => {
    setLoading(true);
    // kick off both fetches in parallel
    Promise.all([loadUsers(), loadMaterials()]).then(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="w-[90%] m-auto my-10 grid gap-3">
        <h1 className="text-4xl">Manager Panel</h1>
        <h4 className="mb-5 text-gray-500 text-[13px]">
          All users (admin, managers)
        </h4>

        <UserDataTable
          columns={MakeUserColumns(loadUsers)}
          data={usersData}
          meta={{ reloadData: loadUsers }}
        />

        {loading ? <SkeletonUploadCourseForm /> : <UploadCourseForm />}

        <CreateDepartmentForm />
      </div>

      <div className="mx-[2%]">
        <h1 className="text-4xl mt-14 mb-2">All Live Materials</h1>
        <h4 className="mb-7 text-gray-500 text-[13px]">
          View and manage all uploaded materials.
        </h4>
        <DataTable columns={makeColumns(loadMaterials)} data={materialData} />
      </div>
    </div>
  );
}
