import React, { useMemo, Fragment } from "react";
import { InlineLoader, Table } from "components";
import { FiAlertCircle } from "react-icons/fi";
import { useQuery } from "react-query";
import { getSeeders } from "services";

export const Dashboard = () => {
  const {
    data = [],
    isError,
    isLoading,
    dataUpdatedAt,
    remove,
    refetch,
  } = useQuery("seeders", getSeeders, {
    refetchInterval: Number(process.env.REACT_APP_POLLING_INTERVAL),
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

  function handleUpdate() {
    remove();
    refetch();
  }

  if (isError) {
    return (
      <div className="min-h-screen px-6 py-20 prose bg-transparent max-w-none prose-invert md:p-20">
        <h1 className="flex items-center">
          <FiAlertCircle size={36} />
          <span className="ml-2 text-3xl">An error occured</span>
        </h1>
        <p className="my-8 text-xl font-light">
          Sorry we could not fetch Seeders. If error persists, please contact
          support
        </p>
        <button
          className="px-8 py-2 border border-gray-400 hover:text-gray-800 rounded-3xl hover:bg-white hover:border-none"
          onClick={() => refetch()}
        >
          try again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 prose bg-transparent max-w-none prose-invert md:p-12">
      <div className="flex items-center justify-between">
        <h1 className="my-0 text-3xl"> Seeders</h1>
        <button
          className="px-6 py-1 border border-gray-400 hover:text-gray-800 rounded-3xl hover:bg-white hover:border-none"
          onClick={() => handleUpdate()}
        >
          refresh
        </button>
      </div>

      {isLoading ? (
        <InlineLoader className="my-8" />
      ) : (
        <Fragment>
          <Table columns={columns} data={memoizedData} />
          <p className="text-sm text-center md:text-right">
            last updated: {new Date(dataUpdatedAt).toLocaleString()}
          </p>
        </Fragment>
      )}
    </div>
  );
};
