import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
const DepartmentSelector = () => {
  return (
    <>
      <div className="flex m-auto w-96 gap-3 mb-5 md:mb-7">
        <Input />
        <Button>Search</Button>
      </div>
    </>
  );
};

export default DepartmentSelector;
