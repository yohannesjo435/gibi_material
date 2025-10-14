"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

import { cn } from "@/lib/utils";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
interface Department {
  id: string;
  name: string;
  short_name: string;
  available_files: number;
  available_years: Array<string>;
  icon_url: string;
}

function Page() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setloading] = useState(true);
  const [departmentId, setDepartmentId] = useState("");

  const FetchAllDepartments = () => {
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
  };
  FetchAllDepartments();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-[80vh] w-[90%] m-auto md:mt-10">
      <div className="hidden md:block bg-[url('/graduats.webp')] bg-no-repeat bg-cover w-full rounded-[15px]"></div>
      <div className="w-[80%] m-auto">
        <Card>
          <CardHeader>
            <CardTitle>Signup to your Account</CardTitle>
            <CardDescription>Enter your email to Signup</CardDescription>
            <CardAction>
              <Button variant={"link"}>Signup</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Full name</Label>
                  <Input
                    id="full-name"
                    type="text"
                    placeholder="abebe teshome"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Phone Number</Label>
                  <Input
                    id="phone_number"
                    type="text"
                    placeholder="0901020304"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Select Your department</Label>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <DepartmentDropdown
                      departments={departments}
                      setDepartments={setDepartments}
                      setValue={setDepartmentId}
                      value={departmentId}
                    />
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Signup
            </Button>
            <Button variant="outline" className="w-full">
              Signup with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;

function DepartmentDropdown({
  setValue,
  value,
  departments,
  setDepartments,
}: {
  setValue: (val: string) => void;
  value: string;
  departments: { id: string; name: string }[] | null;
  setDepartments: Dispatch<SetStateAction<Department[]>>;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (search.length >= 2 && filterdDepartments.length === 0) {
        setLoading(true);
        const res = await fetch(
          `/api/departments/search?q=${encodeURIComponent(search)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        if (data.department) {
          setDepartments([data.department[0]]);
          setLoading(false);
        }
      }
      return () => clearTimeout(timeout);
    }, 500);
  }, [search]);

  if (!departments || (departments.length === 0 && !loading)) {
    return (
      <Button variant="outline" disabled className="w-full md:w-[200px]">
        No departments Found
      </Button>
    );
  }

  const filterdDepartments = departments.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-between "
        >
          {value ? (
            <div className="overflow-x-hidden">
              {departments.find((department) => department.id === value)?.name}
            </div>
          ) : (
            "Select department..."
          )}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <Input
            className="mb-2"
            placeholder="Search department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CommandList>
            {loading ? (
              <>
                <CommandEmpty className="flex justify-center py-2">
                  <Spinner />
                </CommandEmpty>
              </>
            ) : (
              <CommandEmpty>No department found.</CommandEmpty>
            )}
            <CommandGroup>
              {filterdDepartments.map((department) => (
                <CommandItem
                  key={department.id}
                  value={department.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === department.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {department.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
