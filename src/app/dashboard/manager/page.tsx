import React, { Suspense } from "react";
import UploadCourseForm from "../components/UploadCourseForm";
import { SkeletonUploadCourseForm } from "@/components/shared/AppSkeleton";
import { columns, Course } from "./columns";
import { userColumns, User } from "./userColumns";

import { UserDataTable } from "./users-data-table";
import { DataTable } from "../components/data-table";
import CreateDepartmentForm from "../components/CreateDepartmentForm";

async function getData(): Promise<Course[]> {
  // Fetch data from your API here.
  return [
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
    {
      id: "1234d34fg",
      courseName: "Veteranry",
      fileType: "pdf",
      uploadDate: "1/23/2005",
      courseCode: "vet101",
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
      uploadDate: "1/23/20013",
      courseCode: "med101",
    },
    {
      id: "1234d34fg",
      courseName: "Veteranry",
      fileType: "pdf",
      uploadDate: "1/23/2006",
      courseCode: "vet101",
    },
    {
      id: "1234wefdfg",
      courseName: "IS",
      fileType: "pdf",
      uploadDate: "1/23/20023",
      courseCode: "is101",
    },
    {
      id: "1234234dfg",
      courseName: "Medicine",
      fileType: "pdf",
      uploadDate: "1/23/20024",
      courseCode: "med101",
    },
    {
      id: "1234d34fg",
      courseName: "Veteranry",
      fileType: "pdf",
      uploadDate: "1/23/2000",
      courseCode: "vet101",
    },
    {
      id: "1234wefdfg",
      courseName: "IS",
      fileType: "pdf",
      uploadDate: "1/23/20024",
      courseCode: "is101",
    },
    {
      id: "1234234dfg",
      courseName: "Medicine",
      fileType: "pdf",
      uploadDate: "1/23/20025",
      courseCode: "med101",
    },
    {
      id: "1234d34fg",
      courseName: "Veteranry",
      fileType: "pdf",
      uploadDate: "1/23/2009",
      courseCode: "vet101",
    },
    {
      id: "1234wefdfg",
      courseName: "IS",
      fileType: "pdf",
      uploadDate: "1/23/20014",
      courseCode: "is101",
    },
    {
      id: "1234234dfg",
      courseName: "Medicine",
      fileType: "pdf",
      uploadDate: "1/23/20019",
      courseCode: "med101",
    },
    {
      id: "1234d34fg",
      courseName: "Veteranry",
      fileType: "pdf",
      uploadDate: "1/23/2003",
      courseCode: "vet101",
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
      uploadDate: "1/23/2003",
      courseCode: "med101",
    },
    {
      id: "1234d34fg",
      courseName: "Veteranry",
      fileType: "pdf",
      uploadDate: "1/23/2003",
      courseCode: "vet101",
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
      uploadDate: "1/23/2003",
      courseCode: "med101",
    },
    {
      id: "1234d34fg",
      courseName: "Veteranry",
      fileType: "pdf",
      uploadDate: "1/23/2003",
      courseCode: "vet101",
    },
  ];
}
async function getUsers(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1234dfg",
      name: "abebe",
      email: "abebe@gmail.com",
      role: "faculty",
      status: "active",
    },
    {
      id: "1234dfefdg",
      name: "mesert",
      email: "abebe@gmail.com",
      role: "faculty",
      status: "active",
    },
    {
      id: "1234wefdfg",
      name: "jo",
      email: "abebe@gmail.com",
      role: "faculty",
      status: "active",
    },
    {
      id: "1234234dfg",
      name: "mike",
      email: "abebe@gmail.com",
      role: "faculty",
      status: "active",
    },
  ];
}

async function page() {
  const MaterialData = await getData();
  const usersData = await getUsers();

  return (
    <div>
      <div className="w-[90%] m-auto my-10 grid gap-3">
        <h1 className="text-4xl">Manager Panel</h1>
        <h4 className="mb-5 text-gray-500 text-[13px]">
          All users (admin, managers)
        </h4>
        <UserDataTable columns={userColumns} data={usersData} />
        {/* the table goes here */}
        <Suspense fallback={<SkeletonUploadCourseForm />}>
          <UploadCourseForm />
        </Suspense>

        <CreateDepartmentForm />
      </div>

      <div className="mx-[2%]">
        <h1 className="text-4xl mt-14 mb-2">All Live Materials</h1>
        <h4 className="mb-7 text-gray-500 text-[13px]">
          View and manage all uploaded materials.
        </h4>
        <DataTable columns={columns} data={MaterialData} />
      </div>
    </div>
  );
}

export default page;
