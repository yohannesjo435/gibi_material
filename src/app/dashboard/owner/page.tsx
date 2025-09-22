import React, { Suspense } from "react";
import UploadCourseForm from "../components/UploadCourseForm";
import { UploadCourseFormSkeleton } from "@/components/shared/AppSkeleton";

function page() {
  return (
    <div className="w-[87%] m-auto my-10 grid gap-3">
      <h1 className="text-4xl">Owner Panel</h1>
      {/* the table goes here */}
      <Suspense fallback={<UploadCourseFormSkeleton />}>
        <UploadCourseForm />
      </Suspense>
    </div>
  );
}

export default page;
