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
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

export const FilterMaterial = ({
  selectedYear,
  activeYear,
  activeFileType,
  onYearSelect,
  onFileTypeSelect,
  onResults,
}: {
  selectedYear: Array<string>;
  onYearSelect: (year: string) => void;
  onFileTypeSelect: (type: string | null) => void;
  activeYear: string | null;
  activeFileType: string | null;
  onResults?: (results: any[]) => void;
}) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (query.trim().length < 1) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/courses/search?q=${encodeURIComponent(
          query.trim().toLowerCase()
        )}`
      );

      if (!res.ok) {
        console.error("Search request failed", res.status, res.statusText);
        setResults([]);
      } else {
        const json = await res.json();
        // API may return { course: [...] } or { courses: [...] } or raw array
        const list = json?.courses ?? json?.course ?? json ?? [];
        setResults(list);
        onResults?.(list);
        console.log("results: ", list);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="outline-1 min-w-2xs p-5 py-10 flex flex-col gap-3 md:gap-5 rounded-[10px] shadow-2xs">
      <Label className="">Search Course</Label>

      <form className="flex gap-2" onSubmit={handleSearch}>
        <Input
          value={query}
          type="text"
          placeholder="search course"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>

      <Label>Acadmaic Year</Label>
      <div className="grid grid-cols-4 md:grid-cols-2 gap-3 text-center font-semibold text-[14px] cursor-pointer">
        {selectedYear.map((year, i) => (
          <Card key={i} className="p-0">
            <button
              onClick={() => onYearSelect(year)}
              className={`h-full p-6 w-full rounded-xl
                ${
                  activeYear === year
                    ? "bg-blue-500 text-white"
                    : "bg-transparent"
                }
              `}
            >
              {year}
            </button>
          </Card>
        ))}
      </div>

      <div className="hidden md:grid gap-5 mt-3">
        <Label>File Type</Label>
        <div className="flex gap-2">
          {[
            { label: "PDF", value: "pdf", style: "bg-red-100 text-red-500" },
            { label: "PPT", value: "ppt", style: "bg-blue-100 text-blue-600" },
            {
              label: "DOCS",
              value: "docs",
              style: "bg-green-100 text-green-600",
            },
          ].map((type) => (
            <button
              key={type.label}
              onClick={() =>
                onFileTypeSelect(
                  activeFileType === type.value ? null : type.value
                )
              }
              className={`px-3 py-1 rounded-[5px] ${
                activeFileType === type.value
                  ? `${type.style} border-transparent`
                  : "outline-1 text-white font-semiboldbold"
              }`}
            >
              {type.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
