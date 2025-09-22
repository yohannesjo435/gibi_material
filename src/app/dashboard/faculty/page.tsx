import React from "react";
import UploadCourseForm from "../components/UploadCourseForm";

function page() {
  return (
    <div className="w-[87%] m-auto my-10 ">
      <h1 className="text-4xl mb-10">Admin Panel</h1>
      <UploadCourseForm />
    </div>
  );
}

export default page;
