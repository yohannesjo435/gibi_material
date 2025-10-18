import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
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
import { LoaderCircle, MessageCircleWarning } from "lucide-react";

export type Course = {
  id: string;
  title: string;
  file_type: "pdf" | "ppt" | "docs";
  uploaded_at: string;
  course_code: string;
  file_url: string;
};

const EditCourseForm = ({
  course,
  onSuccess,
}: {
  course: Course;
  onSuccess?: () => void;
}) => {
  // const [open, setOpen] = useState(sayOpen);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [fileType, setFileType] = useState<"pdf" | "ppt" | "docs">("pdf");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // if (open) {
    setCourseName(course.title);
    setFileType(course.file_type);
    setCourseCode(course.course_code);
    setError(null);
    // }
  }, [course]);

  console.log("course from edit: ", course);

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: updateError } = await supabase
      .from("study_material")
      .update({
        title: courseName,
        file_type: fileType,
        course_code: courseCode,
      })
      .eq("id", course.id);

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    // call parent callback to refresh table
    if (onSuccess) onSuccess();

    //reset input
    setCourseName("");
    setCourseCode("");
    setError(null);
    toast.success("Updated Course Sucessfully");
  }

  return (
    <div>
      <Drawer>
        <DrawerTrigger className="py-1 px-2"> Edit</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Course</DrawerTitle>
            <DrawerDescription>
              Update the information for this course.
            </DrawerDescription>
          </DrawerHeader>

          <form
            onSubmit={handleEdit}
            className="flex flex-col gap-5 px-5 lg:w-[70%] lg:m-auto"
          >
            <div className="grid gap-2">
              <Label>Course Name</Label>
              <Input
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>File Type</Label>
              <Select
                value={fileType}
                onValueChange={(val) =>
                  setFileType(val as "pdf" | "ppt" | "docs")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Change file type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course</SelectLabel>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="PPT">ppt</SelectItem>
                    <SelectItem value="docs">DOCS</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <p className="px-2 text-sm text-yellow-600 flex gap-2 items-center">
              <MessageCircleWarning size={17} />
              If you upload different file Delete the old upload and upload the
              correct file
            </p>
            <Button type="submit">
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin w-8 h-8" /> saving..
                </>
              ) : (
                "Save"
              )}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </form>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {/* <DrawerFooter></DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default EditCourseForm;
