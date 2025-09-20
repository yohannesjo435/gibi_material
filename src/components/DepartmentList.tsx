import {
  Card,
  CardAction,
  // CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppPagination from "./AppPagination";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
const DepartmentList = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [departmentPerPage] = useState(8);

  //get Current Department
  const indexOfLastDep = currentPage * departmentPerPage;
  const indexOfFirstDep = indexOfLastDep - departmentPerPage;
  const currentDepartment = department.slice(indexOfFirstDep, indexOfLastDep);

  //change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
        {currentDepartment.map((dep, index) => (
          <Card
            key={index}
            className="cursor-pointer"
            onClick={() => onSelect(dep.id)}
          >
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
      <AppPagination
        className="mt-5 md:mt-10 shadow-2xs"
        depPerPage={departmentPerPage}
        totalDep={department.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default DepartmentList;

const department = [
  {
    id: "1",
    name: "Computer Science",
    nickName: "CS",
    desc: "Computer Science",
    couseCode: "cs-1011",
    availableYears: 4,
  },
  {
    id: "2",
    name: "Information Science",
    nickName: "IS",
    desc: "Computer Science",
    couseCode: "is-451",
    availableYears: 4,
  },
  {
    id: "3",
    name: "Medicine",
    nickName: "Med",
    desc: "Computer Science",
    couseCode: "med-101",
    availableYears: 4,
  },
  {
    id: "4",
    name: "Pharmacy",
    nickName: "Pharma",
    desc: "Computer Science",
    couseCode: "pharma-11",
    availableYears: 4,
  },
  {
    id: "5",
    name: "Computer Science",
    nickName: "CS",
    desc: "Computer Science",
    couseCode: "cs-1011",
    availableYears: 4,
  },
  {
    id: "4",
    name: "Pharmacy",
    nickName: "Pharma",
    desc: "Computer Science",
    couseCode: "pharma-11",
    availableYears: 4,
  },
  {
    id: "5",
    name: "Computer Science",
    nickName: "CS",
    desc: "Computer Science",
    couseCode: "cs-1011",
    availableYears: 4,
  },
  {
    id: "4",
    name: "Pharmacy",
    nickName: "Pharma",
    desc: "Computer Science",
    couseCode: "pharma-11",
    availableYears: 4,
  },
  {
    id: "5",
    name: "Computer Science",
    nickName: "CS",
    desc: "Computer Science",
    couseCode: "cs-1011",
    availableYears: 4,
  },
  {
    id: "4",
    name: "Pharmacy",
    nickName: "Pharma",
    desc: "Computer Science",
    couseCode: "pharma-11",
    availableYears: 4,
  },
  {
    id: "5",
    name: "Computer Science",
    nickName: "CS",
    desc: "Computer Science",
    couseCode: "cs-1011",
    availableYears: 4,
  },
  {
    id: "4",
    name: "Pharmacy",
    nickName: "Pharma",
    desc: "Computer Science",
    couseCode: "pharma-11",
    availableYears: 4,
  },
  {
    id: "5",
    name: "Computer Science",
    nickName: "CS",
    desc: "Computer Science",
    couseCode: "cs-1011",
    availableYears: 4,
  },
  {
    id: "4",
    name: "Pharmacy",
    nickName: "Pharma",
    desc: "Computer Science",
    couseCode: "pharma-11",
    availableYears: 4,
  },
  {
    id: "5",
    name: "Computer Science",
    nickName: "CS",
    desc: "Computer Science",
    couseCode: "cs-1011",
    availableYears: 4,
  },
  {
    id: "4",
    name: "Pharmacy",
    nickName: "Pharma",
    desc: "Computer Science",
    couseCode: "pharma-11",
    availableYears: 4,
  },
  {
    id: "5",
    name: "Computer Science",
    nickName: "CS",
    desc: "Computer Science",
    couseCode: "cs-1011",
    availableYears: 4,
  },
  {
    id: "4",
    name: "Pharmacy",
    nickName: "Pharma",
    desc: "Computer Science",
    couseCode: "pharma-11",
    availableYears: 4,
  },
  {
    id: "5",
    name: "Computer Science",
    nickName: "CS",
    desc: "Computer Science",
    couseCode: "cs-1011",
    availableYears: 4,
  },
  {
    id: "4",
    name: "Pharmacy",
    nickName: "Pharma",
    desc: "Computer Science",
    couseCode: "pharma-11",
    availableYears: 4,
  },
  {
    id: "5",
    name: "Computer Science",
    nickName: "CS",
    desc: "Computer Science",
    couseCode: "cs-1011",
    availableYears: 4,
  },
];
