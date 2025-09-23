import React, { Suspense } from "react";
import UploadCourseForm from "../components/UploadCourseForm";
import { SkeletonUploadCourseForm } from "@/components/shared/AppSkeleton";
import { columns, Course } from "./columns";
import { DataTable } from "../components/data-table";

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

async function page() {
  const data = await getData();

  return (
    <div className="w-[87%] m-auto my-10 ">
      <h1 className="text-4xl mb-5">Admin Panel</h1>
      <Suspense fallback={<SkeletonUploadCourseForm />}>
        <UploadCourseForm />
      </Suspense>

      <h1 className="text-4xl mt-10 mb-2">Manage Existing Materials</h1>
      <h4 className="mb-7 text-gray-500 text-[13px]">
        View and manage your uploaded course materials.{" "}
      </h4>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default page;
