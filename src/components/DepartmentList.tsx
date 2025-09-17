import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
const DepartmentList = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {department.map((dep, index) => (
        <Card key={index} className="cursor-pointer">
          <CardHeader className="flex items-center gap-3.5">
            <Image
              src={"/department_icons/is.png"}
              width={25}
              height={25}
              alt="course Icons"
            />
            <div>
              <CardTitle>{dep.name}</CardTitle>
              <CardDescription>{dep.nickName}</CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <CardDescription>
              {dep.availableYears} Years Available
            </CardDescription>
            <CardAction>
              <Link href={"/"}>
                <ChevronRight size={15} />
              </Link>
            </CardAction>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DepartmentList;

const department = [
  {
    name: "Computer Science",
    nickName: "CS",
    desc: "Computer Science",
    couseCode: "cs-1011",
    availableYears: 4,
  },
  {
    name: "Information Science",
    nickName: "IS",
    desc: "Computer Science",
    couseCode: "is-451",
    availableYears: 4,
  },
  {
    name: "Medicine",
    nickName: "Med",
    desc: "Computer Science",
    couseCode: "med-101",
    availableYears: 4,
  },
  {
    name: "Pharmacy",
    nickName: "Pharma",
    desc: "Computer Science",
    couseCode: "pharma-11",
    availableYears: 4,
  },
  {
    name: "Computer Science",
    nickName: "CS",
    desc: "Computer Science",
    couseCode: "cs-1011",
    availableYears: 4,
  },
];
