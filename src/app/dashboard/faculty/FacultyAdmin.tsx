"use client";

import React, { useEffect, useState } from "react";
import UploadCourseForm from "../components/UploadCourseForm";
import { SkeletonUploadCourseForm } from "@/components/shared/AppSkeleton";
import { columns, Course } from "./columns";
import { DataTable } from "../components/data-table";
import { supabase } from "@/lib/supabaseClient";
const SAMPLE_DATA: Course[] = [
  {
    id: "1234dfg",
    courseName: "cs",
    fileType: "pdf",
    uploadDate: "1/23/2001",
    courseCode: "cs101",
  },
  {
    id: "1234dfefdg",
    courseName: "Biology",
    fileType: "pdf",
    uploadDate: "1/23/2002",
    courseCode: "bio101",
  },
  {
    id: "1234wefdfg",
    courseName: "IS",
    fileType: "pdf",
    uploadDate: "1/23/2003",
    courseCode: "is101",
  },
  {
    id: "1234234dfg",
    courseName: "Medicine",
    fileType: "pdf",
    uploadDate: "1/23/2004",
    courseCode: "med101",
  },
];

function FacultyAdmin() {
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMaterials() {
      setLoading(false);

      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user.id;

      if (!userId) {
        console.error("No user session");
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("department_id")
        .eq("auth_id", userId)
        .maybeSingle();

      if (profileError || !profile) {
        console.error("Failed to load profile", profileError);
        setLoading(false);
        return;
      }

      console.log("departmetn id: ", profile.department_id);
      const { data: materials, error: materialsError } = await supabase
        .from("study_material")
        .select("*")
        .eq("department_id", profile.department_id);

      if (materialsError) {
        console.error("Failed to fetch Materials", materialsError);
      } else {
        setData(materials);
      }
      setLoading(false);
    }
    loadMaterials();
  }, []);

  return (
    <div className="w-[87%] m-auto my-10 ">
      <h1 className="text-4xl mb-5">Admin Panel</h1>
      <UploadCourseForm />

      <h1 className="text-4xl mt-14 mb-2">Manage Existing Materials</h1>
      <h4 className="mb-7 text-gray-500 text-[13px]">
        View and manage your uploaded course materials.
      </h4>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default FacultyAdmin;
