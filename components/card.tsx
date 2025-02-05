"use client";
import React from "react";

const Card = ({
  title,
  color,
  children,
}: {
  title: string;
  color?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="rounded-md bg-slate-800 justify-items-center py-4 grow flex-1">
      <p className="text-sm mb-4 text-[18px]">
        <span className={`text-[${color}]`}>{title}</span>
      </p>
      {children}
    </div>
  );
};

export default Card;
