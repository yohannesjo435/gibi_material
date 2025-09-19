"use client";
import CourseBreadcrump from "./CourseBreadcrump";
import DepartmentSelector from "./DepartmentSelector";
import DepartmentList from "./DepartmentList";
import MaterialList from "./MaterialList";
import { useState } from "react";

const CourseSection = () => {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >(null);

  const goBackToDepartments = () => {
    setSelectedDepartmentId(null);
  };

  return (
    <>
      <div className="w-[90%] m-auto grid gap-5 my-32">
        <hr />
        <CourseBreadcrump
          onDepartmentClick={goBackToDepartments}
          selectedDepartmentId={selectedDepartmentId}
        />
        {!selectedDepartmentId && (
          <>
            <DepartmentSelector />
            <DepartmentList onSelect={setSelectedDepartmentId} />
          </>
        )}
        {selectedDepartmentId && <MaterialList />}
      </div>
    </>
  );
};

export default CourseSection;
