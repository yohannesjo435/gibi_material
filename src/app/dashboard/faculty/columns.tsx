"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { ArrowUpDown } from "lucide-react";
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
import EditCourseForm from "../components/EditCourseForm";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export type Course = {
  id: string;
  title: string;
  file_type: "pdf" | "ppt" | "docs";
  uploaded_at: string;
  course_code: string;
  file_url: string;
};

export const makeColumns = (onSuccess?: () => void): ColumnDef<Course>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3"
        >
          Course Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "file_type",
    header: "File Type",
  },
  {
    accessorKey: "uploaded_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3"
        >
          Upload Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;

      async function handleDelete() {
        const confirm = window.confirm(
          "Are you sure you want to delete This course"
        );

        if (!confirm) return;

        // delete from table
        const { error } = await supabase
          .from("study_material")
          .delete()
          .eq("id", course.id);

        if (error) {
          toast.error("Failed to delete course");
          console.log(error);
          return;
        }

        // delete from bucket

        const { error: storageError } = await supabase.storage
          .from("study-materials")
          .remove([course.file_url]);

        if (storageError) {
          toast.warning("Course delted, but file not removed from storage");
          console.warn(storageError.message);
        }
        toast.success("course deleted");
        onSuccess?.();
      }

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
              onClick={() => navigator.clipboard.writeText(course.course_code)}
            >
              Copy courseCode
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <EditCourseForm course={course} onSuccess={onSuccess} />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="bg-red-500 text-white rounded-[1px]"
              onClick={handleDelete}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
