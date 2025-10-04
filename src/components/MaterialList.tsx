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

const MaterialList = () => {
  const [courses, setCourse] = useState("");
  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourse(data);
    }
    fetchCourses();
    console.log("courses: ", courses);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <FilterMaterial />

      <div className="w-full grid gap-3 outline-1 p-5 rounded-[10px]">
        <div className="flex justify-between items-center ">
          <h2 className="font-semibold">Year 4 - Computer Science Materials</h2>
          <div className="flex flex-row items-center gap-3">
            <p className="hidden md:block">24 material found</p>
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
            <Grid2x2 className="hidden md:block" size={18} />
            <List className="hidden md:block" size={18} />
          </div>
        </div>
        {course.map((dep, index) => (
          <Card
            key={index}
            className="cursor-pointer grid grid-cols-1 md:grid-cols-2"
          >
            <CardHeader className="flex flex-row-reverse justify-between md:justify-start md:flex-row md:items-center md:gap-3.5">
              <Image
                src={"/department_icons/is.png"}
                width={30}
                height={30}
                alt="course Icons"
              />
              <div className="grid gap-1">
                <CardTitle>{dep.name}</CardTitle>
                <div className="flex gap-2">
                  <CardDescription>{dep.nickName}</CardDescription>
                  <CardDescription>{dep.author}</CardDescription>
                  <CardDescription className="font-medium">
                    {dep.size}mb
                  </CardDescription>
                  <CardDescription>{dep.updatedDate}</CardDescription>
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
      </div>
    </div>
  );
};

export default MaterialList;

const course = [
  {
    name: "C++",
    nickName: "CS",
    author: "Prof Yohannes",
    couseCode: "cs-1011",
    updatedDate: 4,
    size: " 2.4",
  },
  {
    name: "Networking",
    nickName: "IS",
    author: "Prof Yohannes",
    couseCode: "is-451",
    updatedDate: 4,
    size: " 2.4",
  },
  {
    name: "Dsa",
    nickName: "Med",
    author: "Prof Yohannes",
    couseCode: "med-101",
    updatedDate: 4,
    size: " 2.4",
  },
  {
    name: "Numerical Analysis",
    nickName: "Pharma",
    author: "Prof Yohannes",
    couseCode: "pharma-11",
    updatedDate: 4,
    size: " 2.4",
  },
  {
    name: "Operating System",
    nickName: "CS",
    author: "Prof Yohannes",
    couseCode: "cs-1011",
    updatedDate: 4,
    size: " 2.4",
  },
];
