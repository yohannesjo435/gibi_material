"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloudUpload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

import { uploadFile } from "@/lib/storage";
import { supabase } from "@/lib/supabaseClient";

const UploadCourseForm = ({
  departmentId,
  facultyId,
  onSuccess,
}: {
  departmentId?: string | null;
  onSuccess?: () => void;
  facultyId: string | null;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSucess, setUploadSucess] = useState(false);

  const [fileType, setFileType] = useState("");
  const bucket = "study_materials";

  const [title, setTitle] = useState("");
  const [tagsState, setTags] = useState("");
  const [descriptionState, setDescription] = useState("");
  const [year, setYear] = useState("");

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      alert("Please fill out all fields and select a file.");
      return;
    }
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const key = `faculty_${facultyId}/department_${departmentId}/${Date.now()}-${sanitizedName}`;

    const form = new FormData(e.currentTarget);
    const courseName = form.get("courseName") as string; //aka title
    const tag = form.get("tag") as string;
    const tags = [tag];
    const description = form.get("description") as string;

    setIsUploading(true);
    try {
      const { url } = await uploadFile(bucket, key, file);

      const { error } = await supabase.from("study_material").insert({
        title: courseName,
        tags,
        description: description,
        file_type: fileType,
        file_url: url,
        file_key: key,
        original_filename: file.name,
        year: "year " + year,
        department_id: departmentId,
      });
      if (error) throw error;
      setUrl(url);
      setUploadSucess(true);
      toast.success("The file has been uploaded");

      // notify parent to refresh materials
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Upload failed: ", err);
    } finally {
      setIsUploading(false);
    }

    //reset inputs
    setTitle("");
    setTags("");
    setDescription("");
    setYear("");
    setFileType("");
  }
  return (
    <form className="grid" onSubmit={handleUpload}>
      <h3 className="text-[18px] font-semibold">Upload Course</h3>
      <h4 className="mb-7 text-gray-500 text-[13px]">
        Fill out the course and upload new materials
      </h4>

      <div className=" m-auto w-full h-52 border-dashed border-1 border-black dark:border-white rounded-2xl mb-5">
        <div className="text-center flex flex-col justify-center items-center gap-4 w-full h-full">
          <CloudUpload />
          <Label>Upload</Label>
          <Input
            className="max-w-48"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        </div>{" "}
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="grid gap-4">
          <Label>Course Name</Label>
          <Input
            name="courseName"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-4">
          <Label>Tag</Label>
          <Input
            name="tag"
            value={tagsState}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="grid gap-4 my-5">
          <Label>Short Description</Label>
          <Textarea
            name="description"
            value={descriptionState}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex my-5 gap-4">
          <div className="grid gap-1">
            <Label>File Type</Label>
            <Select onValueChange={setFileType} required>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="pdf, ppt, docs " />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>File Type</SelectLabel>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="ppt">PPT</SelectItem>
                  <SelectItem value="docs">docs</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1">
            <Label>
              year{" "}
              <span className="text-red-500 text-[13px]">
                (Choose the year for this course)*
              </span>
            </Label>
            <Input
              type="number"
              placeholder="0"
              value={year.toString()}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>

        <Button
          className="py-5 bg-blue-500 cursor-pointer"
          disabled={isUploading}
        >
          Upload
        </Button>
      </div>
    </form>
  );
};

export default UploadCourseForm;
