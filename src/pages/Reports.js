import {
  Box,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Spinner,
} from "@chakra-ui/react";
import { useJobs } from "../contexts/JobsContext";
import { useState, useEffect } from "react";
import Stats from "../components/Stats";
import Charts from "../components/Charts";

const Reports = () => {
  const { jobs, addJob, loading, removeJob } = useJobs() || {};
  const [tabIndex, setTabIndex] = useState(0);

  const years = jobs
    ?.reduce((acc, job) => {
      const date = new Date(job.date * 1000);
      const year = date.getFullYear();
      if (!acc.includes(year)) acc.push(year);
      return acc;
    }, [])
    .sort((a, b) => b - a) || [2022];

  const [filteredJobs, setFilteredJobs] = useState(() => sortAndFilterJobs());

  function sortAndFilterJobs() {
    const jobsToSort = jobs ? [...jobs] : [];
    if (jobsToSort?.length) {
      return jobsToSort
        .sort((a, b) => {
          return b.date - a.date;
        })
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
  }, [tabIndex, jobs]);

  return (
    <>
      <Box p={4}>
        {filteredJobs?.length ? (
          <Tabs onChange={(index) => setTabIndex(index)}>
            <TabList>
              {years && years.map((year) => <Tab key={year}>{year}</Tab>)}
            </TabList>
            <TabPanels>
              {years &&
                years.map((year) => (
                  <TabPanel key={year}>
                    <Stats jobs={filteredJobs} />
                    <Charts jobs={filteredJobs} />
                  </TabPanel>
                ))}
            </TabPanels>
          </Tabs>
        ) : (
          <Spinner />
        )}
      </Box>
    </>
  );
};

export default Reports;
