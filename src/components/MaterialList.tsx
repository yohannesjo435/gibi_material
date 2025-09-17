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
import Image from "next/image";
import { Button } from "./ui/button";
import { Eye, Grid2x2, List } from "lucide-react";

const MaterialList = () => {
  return (
    <div className="grid gap-3">
      <div className="flex justify-between items-center ">
        <h2 className="font-semibold">Year 4 - Computer Science Materials</h2>

        <div className="flex flex-row items-center gap-3">
          <p>24 material found</p>

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
          <Grid2x2 size={18} />
          <List size={18} />
        </div>
      </div>

      {course.map((dep, index) => (
        <Card key={index} className="cursor-pointer grid grid-cols-2">
          <CardHeader className="flex items-center gap-3.5">
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
                <CardDescription>{dep.size}</CardDescription>
                <CardDescription>{dep.updatedDate}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <CardAction className="flex gap-2">
              <Button variant={"outline"} className="bg-gray-200">
                <Eye />
                Preview
              </Button>
              <Button className="bg-blue-500">Download</Button>
            </CardAction>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MaterialList;

const course = [
  {
    name: "Computer Science",
    nickName: "CS",
    author: "Prof Yohannes",
    couseCode: "cs-1011",
    updatedDate: 4,
    size: " 2.4",
  },
  {
    name: "Information Science",
    nickName: "IS",
    author: "Prof Yohannes",
    couseCode: "is-451",
    updatedDate: 4,
    size: " 2.4",
  },
  {
    name: "Medicine",
    nickName: "Med",
    author: "Prof Yohannes",
    couseCode: "med-101",
    updatedDate: 4,
    size: " 2.4",
  },
  {
    name: "Pharmacy",
    nickName: "Pharma",
    author: "Prof Yohannes",
    couseCode: "pharma-11",
    updatedDate: 4,
    size: " 2.4",
  },
  {
    name: "Computer Science",
    nickName: "CS",
    author: "Prof Yohannes",
    couseCode: "cs-1011",
    updatedDate: 4,
    size: " 2.4",
  },
];
