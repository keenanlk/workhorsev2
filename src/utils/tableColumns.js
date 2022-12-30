import { format } from "date-fns";

const getTableColumns = (columnHelper, jobs) => {
  return [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => format(new Date(info.getValue() * 1000), "MM/dd/yyyy"),
    }),
    columnHelper.accessor("description", {
      header: "Description",
    }),
    columnHelper.accessor("labor", {
      header: "Labor",
      cell: (info) => `$${info.getValue()}`,
      footer: () => {
        const total = jobs.reduce((acc, job) => {
          acc += job.labor;
          return acc;
        }, 0);
        return `$${total.toFixed(2)}`;
      },
    }),
    columnHelper.accessor("mileage", {
      header: "Mileage",
      cell: (info) => `$${info.getValue()}`,
      footer: () => {
        const total = jobs.reduce((acc, job) => {
          acc += job.mileage;
          return acc;
        }, 0);
        return `$${total.toFixed(2)}`;
      },
    }),
    columnHelper.accessor("partsCost", {
      header: "Parts Cost",
      cell: (info) => `$${info.getValue()}`,
      footer: () => {
        const total = jobs.reduce((acc, job) => {
          acc += job.partsCost;
          return acc;
        }, 0);
        return `$${total.toFixed(2)}`;
      },
    }),
    columnHelper.accessor("partsTax", {
      header: "Parts Tax",
      cell: (info) => `$${info.getValue().toFixed(2)}`,
      footer: () => {
        const total = jobs.reduce((acc, job) => {
          acc += job.partsTax;
          return acc;
        }, 0);
        return `$${total.toFixed(2)}`;
      },
    }),
    columnHelper.accessor("total", {
      header: "Total",
      cell: (info) => `$${info.getValue().toFixed(2)}`,
      footer: () => {
        const total = jobs.reduce((acc, job) => {
          acc += job.total;
          return acc;
        }, 0);
        return `$${total.toFixed(2)}`;
      },
    }),
  ];
};

export default getTableColumns;
