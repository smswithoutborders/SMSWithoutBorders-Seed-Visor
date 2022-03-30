import React, { Fragment } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import { GlobalFilter } from "components";
import { FiAlertCircle } from "react-icons/fi";

export const Table = ({ columns, data }) => {
  const {
    rows,
    state,
    prepareRow,
    headerGroups,
    getTableProps,
    setGlobalFilter,
    getTableBodyProps,
    preGlobalFilteredRows,
  } = useTable(
    { columns, data },
    useFilters, // useFilters!
    useGlobalFilter
  );

  return (
    <Fragment>
      <div className="mt-8">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="overflow-auto">
        <table className="table-auto" {...getTableProps()}>
          <thead>
            {headerGroups.map((group) => (
              <tr className="p-2" {...group.getHeaderGroupProps()}>
                {group.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.length ? (
              rows.map((row) => {
                prepareRow(row);
                return (
                  <tr className="p-2" {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>
                        {cell.value ? cell.render("Cell") : "N/A"}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-lg text-center">
                  <div className="inline-flex items-center">
                    <FiAlertCircle size={24} />
                    <span className="ml-2">Sorry, no data available</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};
