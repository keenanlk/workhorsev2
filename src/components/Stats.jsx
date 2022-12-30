import { useState, useEffect } from "react";
import { Box, Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react";

const Stats = ({ jobs }) => {
  function getTotalCustomers() {
    return jobs.reduce((acc, job) => {
      if (!acc.includes(job.name)) acc.push(job.name);
      return acc;
    }, [])?.length;
  }

  function getTotalIncome() {
    return jobs.reduce((acc, job) => {
      acc += job.total;
      return acc;
    }, 0);
  }

  const [totalJobs, setTotalJobs] = useState(jobs.length);

  const [totalCustomers, setTotalCustomers] = useState(() =>
    getTotalCustomers()
  );

  const [totalIncome, setTotalIncome] = useState(() => getTotalIncome());

  useEffect(() => {
    setTotalIncome(getTotalIncome);
    setTotalCustomers(getTotalCustomers);
    setTotalJobs(jobs.length);
  }, [jobs]);

  return (
    <Box>
      <StatGroup>
        <Stat p={3}>
          <StatLabel>Total Jobs</StatLabel>
          <StatNumber>{totalJobs}</StatNumber>
        </Stat>
        <Stat p={3}>
          <StatLabel>Total Customers</StatLabel>
          <StatNumber>{totalCustomers}</StatNumber>
        </Stat>
        <Stat p={3}>
          <StatLabel>Total Income</StatLabel>
          <StatNumber>${Number(totalIncome).toFixed(2)}</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default Stats;
