import React from "react";
import UploadCourseForm from "../components/UploadCourseForm";

function page() {
  return (
    <div className="w-[87%] m-auto my-10 grid gap-3">
      <UploadCourseForm />
      <h1 className="text-4xl">Admin Panel</h1>
      <h3>User Mangment</h3>
    </div>
  );
}

export default page;
