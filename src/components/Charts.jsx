import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

const MONTHS = Object.freeze([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

const Charts = ({ jobs }) => {
  const [incomeByMonthChart, setIncomeByMonthChart] = useState();
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legent: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income Chart",
      },
    },
    maintainAspectRatio: false,
  };

  function getIncomeByMonth() {
    const result = MONTHS.reduce((acc, month, index) => {
      const monthNumber = index;
      const jobFormonth = jobs.reduce((total, job) => {
        const jobDate = new Date(job.date * 1000);
        if (jobDate.getMonth() === monthNumber) {
          total += job.total;
        }
        return total;
      }, 0);

      acc[index] = jobFormonth;
      return acc;
    }, []);
    return result;
  }

  function createChart() {
    setIncomeByMonthChart({
      labels: MONTHS,
      datasets: [
        {
          label: "Income",
          data: getIncomeByMonth(),
          backgroundColor: "rgba(66, 153, 225, 0.6)",
        },
      ],
    });
  }

  useEffect(() => {
    createChart();
  }, [jobs]);

  return (
    <>
      <Box p={4} height={"50vh"}>
        {incomeByMonthChart ? (
          <Bar options={options} data={incomeByMonthChart} />
        ) : (
          <h1>Loading</h1>
        )}
      </Box>
    </>
  );
};

export default Charts;
