import React, { Suspense } from "react";
import UploadCourseForm from "../components/UploadCourseForm";

function page() {
  return (
    <div className="w-[87%] m-auto my-10 ">
      <h1 className="text-4xl mb-5">Admin Panel</h1>
      <Suspense fallback={<UploadCourseForm />}>
        <UploadCourseForm />
      </Suspense>
    </div>
  );
}

export default page;
