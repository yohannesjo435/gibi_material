"use client";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterMaterial } from "./FilterMaterial";

import Image from "next/image";
import { Button } from "./ui/button";
import { Eye, HardDriveDownload, LibraryBig } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { SkeletonDepCard } from "./shared/AppSkeleton";
import { toast } from "sonner";

interface CourseType {
  title: string;
  author: string;
  short_name: string;
  department_id: string;
  file_size_bytes: number;
  file_url: string;
  file_key: string;
  file_type: string;
  uploaded_at: string;
  original_filename: string;
  year: string;
}

interface Department {
  available_years: Array<string>;
  faculty_id: string;
  icon_url: string;
  name: string;
  short_name: string;
}

const MaterialList = ({ departmentId }: { departmentId: string }) => {
  const [courses, setCourse] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingFileKey, setDownloadingFileKey] = useState("");

  const [selectedYear, setSelectedYear] = useState([]);
  const [department, setDepartment] = useState<Department | null>(null);

  const [activeYear, setActiveYear] = useState<string | null>("");
  const [activeFileType, setActiveFileType] = useState<string | null>("");
  useEffect(() => {
    async function fetchCourses() {
      try {
        //for getting courses
        const res = await fetch(`/api/departments/${departmentId}/course`);
        if (!res) throw new Error("Failed to fetch Courses. ");
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, [departmentId]);

  useEffect(() => {
    if (courses.length > 0) {
      console.log("courses: ", courses);
    }
    console.log("fetched course: ", courses);
  }, [courses]);

  useEffect(() => {
    async function GetDepartment() {
      const res = await fetch(`/api/departments/${departmentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch Course");
      const data = await res.json();
      setDepartment(data.department);
      setSelectedYear(data.department.available_years);
      console.log("dep: ", data.department);
    }
    GetDepartment();
  }, [departmentId]);
  function byteToMb(byte: number) {
    return (byte / 1000000).toFixed(1);
  }

  function formatDate(raw: string) {
    const date = new Date(raw);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      // timeStyle: "short",
    }).format(date);
  }

  async function handleDownload(
    url: string,
    filename: string,
    file_key: string
  ) {
    try {
      setDownloadingFileKey(file_key);
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`success fully downloaded ${filename}`);
    } catch (err) {
      console.error("Failed to download: ", err);
    } finally {
      setDownloadingFileKey("");
    }
  }

  const filteredCourses = courses.filter((course: CourseType) => {
    const matchesYear = activeYear ? course.year === activeYear : true;

    const matchesType = activeFileType
      ? course.file_type === activeFileType
      : true;

    return matchesYear && matchesType;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <FilterMaterial
        selectedYear={selectedYear}
        activeYear={activeYear}
        onYearSelect={(year) =>
          setActiveYear((prev) => (prev === year ? null : year))
        }
        onFileTypeSelect={(type) =>
          setActiveFileType((prev) => (prev === type ? null : type))
        }
        activeFileType={activeFileType}
        onResults={(list) => setCourse(list as CourseType[])}
      />
      <div className="w-full grid gap-3 outline-1 p-5 rounded-[10px]">
        <div className="flex justify-between items-center max-h-20">
          <h2 className="font-semibold">{department && department.name}</h2>
          <div className="flex flex-row items-center gap-3">
            <p className="hidden md:block">{courses?.length} material found</p>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sort by Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by: </SelectLabel>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4 h-max">
          {loading ? (
            <>
              {Array.from({ length: 2 }, (_, index) => (
                <SkeletonDepCard key={index} />
              ))}
            </>
          ) : (
            <>
              {courses.length === 0 && (
                <h1 className="text-3xl md:text-6xl text-center text-red-500">
                  Nothing Found
                </h1>
              )}
              {filteredCourses.map((dep: CourseType, index) => (
                <Card
                  key={index}
                  className="cursor-pointer min-h-32 w-[100%] grid grid-cols-1 bg-red md:grid-cols-2 py-2"
                >
                  <CardHeader className="flex flex-row-reverse justify-between md:justify-start md:flex-row md:items-center md:gap-3.5">
                    <LibraryBig size={30} />
                    <div className="grid gap-1">
                      <CardTitle>{dep.title}</CardTitle>
                      <div className="flex gap-2">
                        <CardDescription>{dep.short_name}</CardDescription>
                        <CardDescription>{dep.author}</CardDescription>
                        <CardDescription className="font-medium">
                          {byteToMb(dep.file_size_bytes) ?? "_"} mb
                        </CardDescription>
                        <CardDescription>
                          {formatDate(dep.uploaded_at)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-end">
                    <CardAction className="w-full flex justify-end gap-2 md:max-w-max">
                      <a href={dep.file_url} className="w-full">
                        <Button
                          className="w-[100%] md:w-max bg-blue-500 md:bg-gray-200"
                          variant={"outline"}
                        >
                          <Eye />
                          Preview
                        </Button>
                      </a>
                      <Button
                        onClick={() =>
                          handleDownload(
                            dep.file_url,
                            dep.original_filename,
                            dep.file_key
                          )
                        }
                        disabled={downloadingFileKey === dep.file_key}
                        className="hidden md:block bg-blue-500 cursor-pointer"
                      >
                        Download
                      </Button>

                      <Button
                        className="w-[20%] md:hidden cursor-pointer"
                        disabled={downloadingFileKey === dep.file_key}
                        onClick={() =>
                          handleDownload(
                            dep.file_url,
                            dep.original_filename,
                            dep.file_key
                          )
                        }
                      >
                        <HardDriveDownload />
                      </Button>
                    </CardAction>
                  </CardFooter>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialList;
