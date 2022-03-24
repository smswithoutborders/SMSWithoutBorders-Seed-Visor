import React from "react";

export const Dashboard = () => {
  return (
    <div className="min-h-screen p-4 prose bg-slate-800 max-w-none prose-invert md:p-12">
      <div className="flex items-center justify-between">
        <h1 className="my-0 text-3xl"> Seeders</h1>
        <button className="px-6 py-1 border border-gray-100 rounded-3xl">
          refresh
        </button>
      </div>
    </div>
  );
};
