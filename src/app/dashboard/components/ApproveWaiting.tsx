import React from "react";
import Image from "next/image";

export const ApproveWaiting = () => {
  return (
    <div className=" w-full flex flex-col items-center">
      <Image
        src={"/sand_clock.svg"}
        alt="not approved yet wait until you get approved. "
        width={330}
        height={300}
      ></Image>

      <h1 className="text-3xl mb-[10px] font-mono">Not Yet Approved</h1>
      <p className="text-[16px] font-mono">
        Please wait for your request to be approved
      </p>
    </div>
  );
};
