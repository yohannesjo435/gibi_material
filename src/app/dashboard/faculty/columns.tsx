"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Course = {
  id: string;
  courseName: string;
  fileType: "pdf" | "ppt" | " docs" | "epub";
  uploadDate: string;
  courseCode: string;
};

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "courseName",
    header: "Course Name",
  },
  {
    accessorKey: "fileType",
    header: "File Type",
  },
  {
    accessorKey: "uploadDate",
    header: "Upload Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;
      console.log("row: ", row);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-[12px] underline font-medium">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(course.courseCode)}
            >
              Copy courseCode
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem> Edit</DropdownMenuItem>
            <DropdownMenuItem className="bg-red-500 text-white rounded-[1px]">
              {" "}
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
