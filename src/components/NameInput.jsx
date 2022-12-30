import { useJobs } from "../contexts/JobsContext";
import { Input } from "@chakra-ui/react";

const NameInput = ({ onChange, value }) => {
  const { jobs } = useJobs() || {};

  const names = jobs?.reduce((acc, job) => {
    if (!acc.includes(job.name)) acc.push(job.name);
    return acc;
  }, []);

  return (
    <>
      <Input
        list="name"
        size="xs"
        placeholder="Name"
        onChange={onChange}
        value={value}
      />
      <datalist id="name">
        {names?.map((name, index) => {
          return <option key={index} value={name}></option>;
        })}
      </datalist>
    </>
  );
};

export default NameInput;
