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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export type User = {
  id: string;
  full_name: string;
  phone_number: string;
  role: "faculty" | "manager" | "pending";
  status: "active" | "pending";
  auth_id: string;
};

export const MakeUserColumns = (onSucess?: () => void): ColumnDef<User>[] => [
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3"
        >
          full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const user = row.original;

      async function handleRoleChange(
        newRole: "faculty" | "manager" | "pending"
      ) {
        if (newRole === user.role) return;

        const { error } = await supabase
          .from("users")
          .update({ role: newRole })
          .eq("id", user.id);

        if (error) {
          toast.error("Failed to Update role");
          console.error(error);
          return;
        }

        toast.success(`Role updated to ${newRole}`);
        onSucess?.();
      }
      return (
        <div className="max-w-[100px]">
          <Select
            value={user.role}
            onValueChange={(val) =>
              handleRoleChange(val as "faculty" | "manager" | "pending")
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={user.role} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>user</SelectLabel>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      async function handleDelete(user: User) {
        if (!window.confirm("Delete this user?")) return;

        const res = await fetch(`/api/users/${user.auth_id}`, {
          method: "DELETE",
        });
        if (!res.ok) return toast.error("Delete failed");
        toast.success("User account fully removed");
        onSucess?.();
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
              onClick={() => navigator.clipboard.writeText(user.phone_number)}
            >
              Copy Phone Number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="bg-red-500 text-white rounded-[1px]"
              onClick={() => handleDelete(user)}
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
