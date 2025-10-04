"use client";
import {
  Card,
  CardAction,
  CardContent,
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
import { Eye, Grid2x2, List, HardDriveDownload } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { SkeletonDepCard } from "./shared/AppSkeleton";

interface CourseType {
  title: string;
  author: string;
  short_name: string;
  department_id: string;
  file_size_bytes: number;
  file_url: string;
  uploaded_at: string;
}

const MaterialList = ({ departmentId }: { departmentId: string }) => {
  const [courses, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("department Id ", departmentId);
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch(`/api/departments/${departmentId}`);
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
      // console.log("courses: ", courses);
    }
  }, [courses]);

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
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <FilterMaterial />

      <div className="w-full grid gap-3 outline-1 p-5 rounded-[10px]">
        <div className="flex justify-between items-center max-h-20">
          <h2 className="font-semibold">
            Year 4 - Computer Science Materials**
          </h2>
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
            {/* <Grid2x2 className="hidden md:block" size={18} />
            <List className="hidden md:block" size={18} /> */}
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
              {courses.map((dep: CourseType, index) => (
                <Card
                  key={index}
                  className="cursor-pointer max-h-32 w-[100%] grid grid-cols-1 bg-red md:grid-cols-2"
                >
                  <CardHeader className="flex flex-row-reverse justify-between md:justify-start md:flex-row md:items-center md:gap-3.5">
                    <Image
                      src={"/department_icons/is.png"}
                      width={30}
                      height={30}
                      alt="course Icons"
                    />
                    <div className="grid gap-1">
                      <CardTitle>{dep.title}</CardTitle>
                      <div className="flex gap-2">
                        <CardDescription>{dep.short_name}</CardDescription>
                        <CardDescription>{dep.author}</CardDescription>
                        <CardDescription className="font-medium">
                          {byteToMb(dep.file_size_bytes)} mb
                        </CardDescription>
                        <CardDescription>
                          {formatDate(dep.uploaded_at)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-end">
                    <CardAction className="w-full flex justify-end gap-2">
                      <Button
                        variant={"outline"}
                        className="w-[90%] md:w-max bg-blue-500  md:bg-gray-200"
                      >
                        <Eye />
                        Preview
                      </Button>
                      <Button className="hidden md:block bg-blue-500 cursor-pointer">
                        Download
                      </Button>
                      <Button className="w-[10%] md:hidden cursor-pointer ">
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
