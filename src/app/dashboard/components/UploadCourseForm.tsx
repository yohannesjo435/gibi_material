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

const UploadCourseForm = () => {
  return (
    <div className="grid">
      <h3 className="text-[18px] font-semibold">Upload Course</h3>
      <h4 className="mb-7 text-gray-500 text-[13px]">
        Fill out the course and upload new materials
      </h4>

      <div className=" m-auto w-full h-52 border-dashed border-1 border-black dark:border-white rounded-2xl mb-5">
        <UploadInput />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="grid gap-4">
          <Label>Course Name</Label>
          <Input />
        </div>
        <div className="grid gap-4">
          <Label>Tag</Label>
          <Input />
        </div>

        <div className="grid gap-4">
          <Label>Short Description</Label>
          <Textarea />
        </div>

        <div className="grid gap-4 my-10 ">
          <Label>File Type</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="pdf, ppt, docs " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>File Type</SelectLabel>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="ppt">PPT</SelectItem>
                <SelectItem value="docs">docs</SelectItem>
                <SelectItem value="pub">pub</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button className="py-5 bg-blue-500 cursor-pointer">Upload</Button>
      </div>
    </div>
  );
};

export default UploadCourseForm;

export function UploadInput() {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-4 w-full h-full">
      <CloudUpload />
      <Label>Upload</Label>
      <Input className="max-w-48" type="file"></Input>
    </div>
  );
}
