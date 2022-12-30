import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Button,
  Input,
  useToast,
  Spinner,
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import getTableColumns from "../utils/tableColumns";
import { FiPlus } from "react-icons/fi";
import ConfirmDeleteAlert from "../components/ConfirmDeleteAlert";
import JobsTable from "../components/JobsTable";

import { useJobs } from "../contexts/JobsContext";
import { CSVLink } from "react-csv";

const Home = () => {
  const { jobs, addJob, removeJob, loading } = useJobs();
  const [newJob, setNewJob] = useState(false);
  const [search, setSearch] = useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);

  const years = jobs
    ?.reduce(
      (acc, job) => {
        const date = new Date(job.date * 1000);
        const year = date.getFullYear();
        if (!acc.includes(year)) acc.push(year);
        return acc;
      },
      [2022]
    )
    .sort((a, b) => b - a) || [2022];

  const [filteredJobs, setFilteredJobs] = useState(() => sortAndFilterJobs());
  const [csvData, setCsvData] = useState();

  const toast = useToast();

  function sortAndFilterJobs() {
    const jobsToSort = jobs ? [...jobs] : [];
    if (jobsToSort?.length) {
      return jobsToSort
        .sort((a, b) => {
          return b.date - a.date;
        })
        .filter((job) =>
          search ? job.name.toLowerCase().includes(search.toLowerCase()) : true
        )
        .filter((job) => {
          const date = new Date(job.date * 1000);
          return date.getFullYear() === years[tabIndex];
        });
    }

    return jobsToSort;
  }

  useEffect(() => {
    const sortedAndFiltered = sortAndFilterJobs();
    setFilteredJobs(sortedAndFiltered);
  }, [search, tabIndex]);

  useEffect(() => {
    if (jobs?.length) {
      const sorted = sortAndFilterJobs();
      setFilteredJobs(sorted);
    }
  }, [jobs]);

  function createNewJob(job) {
    setNewJob(false);
    addJob(job);
    toast({ title: "Job Created", status: "success", duration: 4000 });
  }

  const columnHelper = createColumnHelper();
  const columns = getTableColumns(columnHelper, filteredJobs);

  function toCSV(array) {
    // Create an array for the CSV rows
    const rows = [];

    // Add the header row
    rows.push([
      "name",
      "date",
      "description",
      "labor",
      "mileage",
      "partsCost",
      "partsTax",
      "total",
    ]);

    // Convert the array of objects to an array of rows
    array.forEach((item) => {
      // Convert the date to a human-readable string
      const dateString = new Date(item.date * 1000).toString();

      // Create an array for the current row
      const row = [
        item.name,
        dateString,
        item.description,
        item.labor,
        item.mileage,
        item.partsCost,
        item.partsTax,
        item.total,
      ];

      // Add the row to the array
      rows.push(row);
    });

    // Wrap the rows array in another array and return it
    return [rows];
  }

  useEffect(() => {
    debugger;
    if (filteredJobs?.length) {
      const data = toCSV(filteredJobs);
      setCsvData(data);
    }
  }, [filteredJobs]);

  const table = useReactTable({
    data: filteredJobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function cancelNewJob() {
    setNewJob(false);
  }

  function confirmDelete(row) {
    const job = row.original;
    setConfirmDeleteOpen({ id: job.id, name: job.name });
  }

  function cancelDelete() {
    setConfirmDeleteOpen(null);
  }

  async function deleteJob() {
    await removeJob(confirmDeleteOpen.id);
    setConfirmDeleteOpen(null);
    toast({ title: "Job Deleted", status: "info", duration: 4000 });
  }

  return (
    <>
      <Box p={2}>
        <>
          {confirmDeleteOpen && (
            <ConfirmDeleteAlert
              deleteData={confirmDeleteOpen}
              cancelDelete={cancelDelete}
              deleteJob={deleteJob}
            />
          )}

          <Heading p={4}>
            Jobs{"  "}
            <Button onClick={() => setNewJob(true)}>
              <FiPlus />
            </Button>
            {csvData && <CSVLink data={filteredJobs}>Export to CSV</CSVLink>}
          </Heading>

          <Input
            variant="flushed"
            placeholder="search"
            size="lg"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <Tabs onChange={(index) => setTabIndex(index)}>
            <TabList>
              {years && years.map((year) => <Tab key={year}>{year}</Tab>)}
            </TabList>
            <TabPanels>
              {years &&
                years.map((year) => (
                  <TabPanel pt="1rem" key={year} p={0}>
                    <JobsTable
                      table={table}
                      loading={loading}
                      newJob={newJob}
                      filteredJobs={filteredJobs}
                      confirmDelete={confirmDelete}
                      createNewJob={createNewJob}
                      cancelNewJob={cancelNewJob}
                    />
                  </TabPanel>
                ))}
            </TabPanels>
          </Tabs>
        </>
      </Box>
    </>
  );
};

export default Home;
