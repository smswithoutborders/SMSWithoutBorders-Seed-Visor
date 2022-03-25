import React, { useMemo, Fragment } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import { InlineLoader, GlobalFilter } from "components";
import { FiAlertCircle } from "react-icons/fi";
import { useQuery } from "react-query";
import { getSeeders } from "services";

export const Dashboard = () => {
  const {
    data = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery("seeders", getSeeders, {
    refetchInterval: 10000,
  });
  const memoizedData = useMemo(() => data, [data]);
  const columns = useMemo(
    () => [
      {
        Header: "Country",
        accessor: "country", // accessor is the "key" in the data
      },
      {
        Header: "IMSI",
        accessor: "IMSI",
      },
      {
        Header: "MSISDN",
        accessor: "MSISDN",
      },
      {
        Header: "LPS",
        accessor: "LPS",
      },
      {
        Header: "Type",
        accessor: "seed_type",
      },
    ],
    []
  );

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
    { columns, data: memoizedData },
    useFilters, // useFilters!
    useGlobalFilter
  );

  return (
    <div className="min-h-screen p-6 prose bg-slate-800 max-w-none prose-invert md:p-12">
      <div className="flex items-center justify-between">
        <h1 className="my-0 text-3xl"> Seeders</h1>
        <button
          className="px-6 py-1 border border-gray-400 hover:text-gray-800 rounded-3xl hover:bg-white hover:border-none"
          onClick={() => refetch()}
        >
          refresh
        </button>
      </div>

      {isLoading || isFetching ? (
        <InlineLoader className="my-8" />
      ) : (
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
      )}
    </div>
  );
};
