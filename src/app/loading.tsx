import { LoaderCircle } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-[#030619] flex justify-center items-center h-full ">
      <LoaderCircle className="animate-spin w-8 h-8" />
    </div>
  );
}

export default Loading;
