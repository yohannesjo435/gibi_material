import React from "react";
import UploadCourseForm from "../components/UploadCourseForm";

function page() {
  return (
    <div className="w-[87%] m-auto my-10 grid gap-3">
      <h1 className="text-4xl">Owner Panel</h1>
      {/* the table goes here */}
      <UploadCourseForm />
    </div>
  );
}

export default page;
