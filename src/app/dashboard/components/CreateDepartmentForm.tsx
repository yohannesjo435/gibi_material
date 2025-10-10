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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CloudUpload } from "lucide-react";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

interface Faculty {
  id: string;
  name: string;
}

const CreateDepartmentForm = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [shortName, setShortName] = useState("");
  const [availableYears, setAvailableYears] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [facultyId, setFacultyId] = useState("");
  const [faculties, setFaculties] = useState<Faculty[]>([]);

  useEffect(() => {
    async function fetchFaculties() {
      try {
        const res = await fetch("/api/faculty");
        if (!res) throw new Error("Failed to fetch faculty. ");
        const data = await res.json();
        setFaculties(data?.faculties || null);
      } catch (err) {
        console.error("fetch Error: ", err);
      }
    }
    fetchFaculties();
  }, []);

  useEffect(() => {
    if (faculties) {
      console.log("all fac: ", faculties);
    }
  }, [faculties]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    function changeAvailbleYearsToArray(availableYears: number) {
      const result = [];
      for (let i = 1; i < availableYears; i++) {
        result.push(`year ${i}`);
      }
      console.log("result: ", result);
      return result;
    }
    const formData = {
      name: departmentName,
      short_name: shortName,
      available_years: changeAvailbleYearsToArray(Number(availableYears)),
      faculty_id: facultyId,
    };
    console.log("form data: ", formData);
    const res = await fetch("/api/departments/create", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    console.log("Server response: ", result);
  }
  return (
    <form className="grid outline-4 mt-20" onSubmit={handleSubmit}>
      <h3 className="text-[28px] font-semibold">Create Deparment</h3>
      <h4 className="mb-7 text-gray-500 text-[13px]">
        Fill out the Form to create new Department
      </h4>

      <div className=" m-auto w-full h-52 border-dashed border-1 border-black dark:border-white rounded-2xl mb-5">
        <div className="text-center flex flex-col justify-center items-center gap-4 w-full h-full">
          <CloudUpload />
          <Label>Upload Department Icon</Label>
          <Input
            className="max-w-48"
            type="file"
            onChange={(e) => setIconFile(e.target.files?.[0] || null)}
            required
          />
        </div>{" "}
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="grid gap-4">
          <Label>Department Name</Label>
          <Input
            name="departmentName"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-4">
          <Label>Short name</Label>
          <Input
            name="shortName"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
          />
        </div>
        <div className="grid gap-4">
          <Label>Available Years</Label>
          <Input
            name="availableYears"
            value={availableYears}
            type="number"
            min={1}
            max={10}
            placeholder="1"
            onChange={(e) => setAvailableYears(e.target.value)}
          />
        </div>

        <div className="flex gap-6 md:gap-2 flex-col md:flex-row my-5 md:my-10 ">
          {/* <div className="grid gap-4 ">
            <Label>choose Faculty </Label>
            <Select
              // onValueChange={setFileType}
              required
            >
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="pdf, ppt, docs " />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>File Type</SelectLabel>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="ppt">PPT</SelectItem>
                  <SelectItem value="docs">docs</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}
          <div className="grid gap-4 ">
            <Label>choose Faculty </Label>
            <FacultyDropdown
              setValue={setFacultyId}
              value={facultyId}
              faculties={faculties}
              setFaculties={setFaculties}
            />
          </div>
        </div>
        <Button
          className="py-5 bg-blue-500 cursor-pointer"
          // disabled={isUploading}
        >
          Upload
        </Button>
      </div>
    </form>
  );
};

export default CreateDepartmentForm;

function FacultyDropdown({
  setValue,
  value,
  faculties,
  setFaculties,
}: {
  setValue: (val: string) => void;
  value: string;
  faculties: { id: string; name: string }[] | null;
  setFaculties: Dispatch<SetStateAction<Faculty[]>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (search.length >= 2 && filterdFaculties.length === 0) {
        const res = await fetch(
          `/api/faculty/search?q=${encodeURIComponent(search)}`
        );
        const data = await res.json();

        if (data.faculties) {
          setFaculties(data.faculties);
        }
      }
      return () => clearTimeout(timeout);
    }, 500);
  }, [search]);

  if (!faculties || faculties.length === 0) {
    return (
      <Button variant="outline" disabled className="w-full md:w-[200px]">
        No faculties available
      </Button>
    );
  }

  const filterdFaculties = faculties.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-between"
        >
          {value
            ? faculties.find((faculty) => faculty.id === value)?.name
            : "Select faculty..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <Input
            className="mb-2"
            placeholder="Search faculty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CommandList>
            <CommandEmpty>No faculty found.</CommandEmpty>
            <CommandGroup>
              {filterdFaculties.map((faculty) => (
                <CommandItem
                  key={faculty.id}
                  value={faculty.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === faculty.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {faculty.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
