"use client";
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

export const FilterMaterial = ({
  selectedYear,
  activeYear,
  activeFileType,
  onYearSelect,
  onFileTypeSelect,
}: {
  selectedYear: Array<string>;
  onYearSelect: (year: string) => void;
  onFileTypeSelect: (type: string | null) => void;
  activeYear: string | null;
  activeFileType: string | null;
}) => {
  return (
    <div className="outline-1 min-w-2xs p-5 py-10 flex flex-col gap-3 md:gap-5 rounded-[10px] shadow-2xs">
      <Label className="text-red-400">
        replace with search for courses ****
      </Label>
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
        {selectedYear.map((year, i) => (
          <Card key={i} className="p-0">
            <button
              onClick={() => onYearSelect(year)}
              className={`h-full p-6 w-full rounded-xl
                ${
                  activeYear === year
                    ? "bg-blue-500 text-white"
                    : "bg-transparent"
                }
              `}
            >
              {year}
            </button>
          </Card>
        ))}
      </div>

      <div className="hidden md:grid gap-5 mt-3">
        <Label>File Type</Label>
        <div className="flex gap-2">
          {[
            { label: "PDF", value: "pdf", style: "bg-red-100 text-red-500" },
            { label: "PPT", value: "ppt", style: "bg-blue-100 text-blue-600" },
            {
              label: "DOCS",
              value: "docs",
              style: "bg-green-100 text-green-600",
            },
          ].map((type) => (
            <button
              key={type.label}
              onClick={() =>
                onFileTypeSelect(
                  activeFileType === type.value ? null : type.value
                )
              }
              className={`px-3 py-1 rounded-[5px] ${
                activeFileType === type.value
                  ? `${type.style} border-transparent`
                  : "outline-1 text-white font-semiboldbold"
              }`}
            >
              {type.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
