import { Tr, Td, Input, Button, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { format } from "date-fns";
import NameInput from "./NameInput";

const NewJobRow = ({ addJob, onCancel }) => {
  const [job, setJob] = useState({
    name: "",
    date: format(new Date(), "yyyy-MM-dd"),
    description: "",
    labor: 0,
    mileage: 0,
    partsCost: 0,
    partsTax: 0,
    total: 0,
  });

  const [saveDisabled, setSaveDisabled] = useState(true);

  useEffect(() => {
    if (job?.name && job?.date) setSaveDisabled(false);
  }, [job?.name, job?.date]);

  useEffect(() => {
    const partsTax = job?.partsCost * 0.07 || 0;
    const total = job?.mileage + job?.labor + partsTax || 0;
    setJob({ ...job, partsTax, total });
  }, [job?.labor, job?.mileage, job?.partsCost]);

  function cancelNewJob() {
    setSaveDisabled(true);
    setJob(null);
    onCancel();
  }

  return (
    <Tr boxShadow="inset 0 0 0 2px rgba(66, 153, 225, 0.6)" rounded="md">
      <Td>
        <NameInput onChange={(e) => setJob({ ...job, name: e.target.value })} />
      </Td>
      <Td>
        <Input
          size="xs"
          type="date"
          value={job?.date}
          onChange={(e) => setJob({ ...job, date: e.target.value })}
        />
      </Td>
      <Td>
        <Input
          size="xs"
          placeholder="Description"
          onChange={(e) => setJob({ ...job, description: e.target.value })}
        />
      </Td>
      <Td>
        <Input
          type="number"
          size="xs"
          placeholder="0"
          onChange={(e) => setJob({ ...job, labor: Number(e.target.value) })}
        />
      </Td>
      <Td>
        <Input
          type="number"
          size="xs"
          placeholder="0"
          onChange={(e) => setJob({ ...job, mileage: Number(e.target.value) })}
        />
      </Td>
      <Td>
        <Input
          type="number"
          size="xs"
          placeholder="0"
          onChange={(e) =>
            setJob({ ...job, partsCost: Number(e.target.value) })
          }
        />
      </Td>
      <Td>${job?.partsTax.toFixed(2)}</Td>
      <Td>${job?.total.toFixed(2)}</Td>
      <Td>
        {saveDisabled ? (
          <Tooltip label="Name and Date are required">
            <Button size="sm" variant="ghost" disabled={true}>
              <FiCheck color="green" size="25px" />
            </Button>
          </Tooltip>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => addJob(job)}>
            <FiCheck color="green" size="25px" />
          </Button>
        )}

        <Button size="sm" variant="ghost" onClick={cancelNewJob}>
          <FiX color="red" size="25px" />
        </Button>
      </Td>
    </Tr>
  );
};

export default NewJobRow;
