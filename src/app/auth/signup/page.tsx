"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatPhone, phoneToEmail } from "@/lib/phone";
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

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const FetchAllDepartments = () => {
    useEffect(() => {
      const fetchDepartments = async () => {
        try {
          const res = await fetch("/api/departments");
          if (!res) throw new Error("Failed to fetch Departments. ");
          if (!res.ok) {
            console.log("fialed to fetch Department");
            return;
          }
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setloading(true);

    const normalizedPhone = formatPhone(phone);

    if (!normalizedPhone) {
      toast.error("Please enter a valid Ethiopian phone number");
      setloading(false);
      return;
    }

    const email = phoneToEmail(normalizedPhone);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        phone: normalizedPhone,
        email: email,
        password,
        departmentId,
      }),
    });

    const { error } = await res.json();
    setloading(false);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Signup successful! Awaiting approval.");
      router.push("/auth/login");
    }

    //reset input field
    setFullName("");
    setPhone("");
    setDepartmentId("");
    setPassword("");
  }
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
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Full name</Label>
                  <Input
                    id="full-name"
                    name="full-name"
                    type="text"
                    placeholder="abebe teshome"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="">
                    Phone Number{" "}
                    <span className="text-red-500">(start with 09)</span>
                  </Label>
                  <Input
                    id="phone_number"
                    name="phone-number"
                    type="text"
                    placeholder="0901020304"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mt-5">
                <Button type="submit" className="w-full" disabled={loading}>
                  Signup
                </Button>
              </div>
            </form>
          </CardContent>
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

        if (data.department && data.department?.length) {
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

  const filterdDepartments = (departments ?? []).filter((f) =>
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
