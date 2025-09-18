import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const FilterMaterial = () => {
  return (
    <div className="outline-1 min-w-2xs p-5 py-10 flex flex-col gap-3 md:gap-5 rounded-[10px] shadow-2xs">
      <Label>Department</Label>
      <Select>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Select Course" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Course</SelectLabel>
            <SelectItem value="computer science">Computer Science</SelectItem>
            <SelectItem value="information science">
              Information Science
            </SelectItem>
            <SelectItem value="bio tech"> Bio Tech</SelectItem>
            <SelectItem value="medicine">medicine</SelectItem>
            <SelectItem value="IT">IT</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label>Acadmaic Year</Label>
      <div className="grid grid-cols-4 md:grid-cols-2 gap-3 text-center font-semibold text-[14px] cursor-pointer">
        <Card className="p-0">
          <button className="h-full p-6 w-full focus:bg-blue-500 focus:text-white rounded-xl">
            Year 1
          </button>
        </Card>
        <Card className="p-0">
          <button className="h-full p-6 w-full focus:bg-blue-500 focus:text-white rounded-xl">
            Year 2
          </button>
        </Card>
        <Card className="p-0">
          <button className="h-full p-6 w-full focus:bg-blue-500 focus:text-white rounded-xl">
            Year 3
          </button>
        </Card>
        <Card className="p-0">
          <button className="h-full p-6 w-full focus:bg-blue-500 focus:text-white rounded-xl">
            Year{" "}
          </button>
        </Card>
      </div>

      <div className="hidden md:grid gap-5 mt-3">
        <Label>File Type</Label>
        <RadioGroup defaultValue="pdf" className="flex">
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="pdf" />
            <Badge className="bg-red-100 text-red-500">PDF</Badge>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="ppt" />
            <Badge className="bg-blue-100 text-blue-600">PPT</Badge>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="docs" />
            <Badge className="bg-green-100 text-green-600">Docs</Badge>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
