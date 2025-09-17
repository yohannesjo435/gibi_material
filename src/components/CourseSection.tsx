import CourseBreadcrump from "./CourseBreadcrump";
import DepartmentSelector from "./DepartmentSelector";
import DepartmentList from "./DepartmentList";
import MaterialList from "./MaterialList";

const CourseSection = () => {
  return (
    <div className="w-[90%] m-auto grid gap-5 my-32">
      <hr />
      <CourseBreadcrump />
      <DepartmentSelector />
      <DepartmentList />
      <MaterialList />
    </div>
  );
};

export default CourseSection;
