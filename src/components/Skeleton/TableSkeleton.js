import React from "react";
import { Skeleton } from "../../ui/Skeleton";

export default function TableSkeleton() {
  return (
    <div className="flex flex-col gap-[20px] mt-[20px]">
      {Array.from({ length: 10 }, (_, index) => {
        return (
          <div className="flex gap-[20px]" key={index}>
            <Skeleton className="w-[33%] h-[25px] bg-white bg-opacity-5 rounded-[25px]" />
            <Skeleton className="w-[33%] h-[25px] bg-white bg-opacity-5 rounded-[25px]" />
            <Skeleton className="w-[33%] h-[25px] bg-white bg-opacity-5 rounded-[25px]" />
          </div>
        );
      })}
    </div>
  );
}
