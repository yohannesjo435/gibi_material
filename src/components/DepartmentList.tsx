"use client";
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
import { SkeletonDepCard } from "./shared/AppSkeleton";
import { useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Department {
  id: string;
  name: string;
  short_name: string;
  available_files: number;
  available_years: Array<string>;
  icon_url: string;
}

const DepartmentList = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const [loading, setloading] = useState(true);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Department[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (query.trim().length < 1) return;

    setloading(true);
    try {
      setloading(true);
      const res = await fetch(
        `/api/departments/search?q=${encodeURIComponent(
          query.trim().toLowerCase()
        )}`
      );
      if (!res.ok) {
        console.error("Search request failed", res.status, res.statusText);
        setResults([]);
      } else {
        const json = await res.json();
        // API may return { departments: [...] } or { department: [...] } or raw array
        const list = json?.departments ?? json?.department ?? json ?? [];
        setResults(list);
        console.log("results: ", list);
      }
    } catch {
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("/api/departments");
        if (!res) throw new Error("Failed to fetch Departments. ");
        const data = await res.json();
        setDepartments(data);
      } catch (err) {
        console.error("fetch Error: ", err);
      } finally {
        setloading(false);
      }
    };

    fetchDepartments();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [departmentPerPage] = useState(8);

  //get Current Department
  const indexOfLastDep = currentPage * departmentPerPage;
  const indexOfFirstDep = indexOfLastDep - departmentPerPage;
  const currentDepartment = departments?.slice(indexOfFirstDep, indexOfLastDep);

  //change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex m-auto w-96 gap-3 mb-5 md:mb-7"
      >
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Search departments…"
        />
        <Button type="submit">Search</Button>
        <Button
          variant={"outline"}
          onClick={() => {
            setQuery("");
            setResults([]);
            setCurrentPage(1);
          }}
        >
          Reset
        </Button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
        {loading ? (
          <>
            {Array.from({ length: departmentPerPage }, (_, index) => (
              <SkeletonDepCard key={index} />
            ))}
          </>
        ) : (
          <>
            {(results.length > 0 ? results : currentDepartment || []).map(
              (dep: Department, index) => (
                <Card
                  key={index}
                  className="cursor-pointer"
                  onClick={() => onSelect(dep.id)}
                >
                  <CardHeader className="flex items-center gap-3.5">
                    <Image
                      src={"/is.png"}
                      width={25}
                      height={25}
                      alt="course Icons"
                    />
                    <div>
                      <CardTitle>{dep.name}</CardTitle>
                      <CardDescription>{dep.short_name}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <CardDescription>
                      {dep.available_years.length} Years Available
                    </CardDescription>
                    <CardAction>
                      <Link href={"/"}>
                        <ChevronRight size={15} />
                      </Link>
                    </CardAction>
                  </CardFooter>
                </Card>
              )
            )}
          </>
        )}
      </div>
      <AppPagination
        className="mt-5 md:mt-10 shadow-2xs"
        depPerPage={departmentPerPage}
        totalDep={departments?.length ?? 0}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default DepartmentList;
