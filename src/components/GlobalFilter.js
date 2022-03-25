import React from "react";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <input
      autoFocus
      type="search"
      className="w-full px-4 py-1.5 bg-transparent border border-gray-500 rounded-3xl focus:outline-none appearance-none focus:ring-0 focus:border-gray-400"
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`search ${count} records...`}
    />
  );
};
