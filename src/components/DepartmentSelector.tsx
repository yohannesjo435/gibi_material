import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
const DepartmentSelector = () => {
  return (
    <>
      <div className="flex m-auto w-96 gap-3">
        <Input />
        <Button>Search</Button>
      </div>
    </>
  );
};

export default DepartmentSelector;
