import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import clsx from "clsx";
const CourseBreadcrump = ({
  onDepartmentClick,
  selectedDepartmentId,
}: {
  onDepartmentClick: () => void;
  selectedDepartmentId: string | null;
}) => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={onDepartmentClick}
              className={clsx("cursor-pointer", {
                "font-bold": !selectedDepartmentId,
              })}
            >
              Department
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {selectedDepartmentId && (
            <BreadcrumbItem>
              <BreadcrumbLink
                className={clsx("cursor-pointer", {
                  "font-bold": selectedDepartmentId,
                })}
              >
                Course
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default CourseBreadcrump;
