import { Tr, Td, Input, Button, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { format } from "date-fns";

import NameInput from "./NameInput";

const EditJobRow = ({ saveJob, onCancel, job }) => {
  const [modifiedJob, setModifiedJob] = useState({
    ...job,
    date: format(new Date(job.date * 1000), "yyyy-MM-dd"),
  });

  const [saveDisabled, setSaveDisabled] = useState(true);

  useEffect(() => {
    if (job !== modifiedJob && modifiedJob.name && modifiedJob.date)
      setSaveDisabled(false);
  }, [job, modifiedJob]);

  useEffect(() => {
    const partsTax = modifiedJob.partsCost * 0.07 || 0;
    const total = modifiedJob.mileage + modifiedJob.labor + partsTax || 0;
    setModifiedJob({ ...modifiedJob, partsTax, total });
  }, [modifiedJob.partsCost, modifiedJob.mileage, modifiedJob.labor]);

  function cancelEdit() {
    setSaveDisabled(true);
    setModifiedJob(null);
    onCancel();
  }

  return (
    <Tr boxShadow="inset 0 0 0 2px rgba(66, 153, 225, 0.6)" rounded="md">
      <Td>
        <NameInput
          value={modifiedJob.name}
          onChange={(e) =>
            setModifiedJob({ ...modifiedJob, name: e.target.value })
          }
        />
      </Td>
      <Td>
        <Input
          size="xs"
          type="date"
          value={modifiedJob.date}
          onChange={(e) =>
            setModifiedJob({ ...modifiedJob, date: e.target.value })
          }
        />
      </Td>
      <Td>
        <Input
          size="xs"
          placeholder="Description"
          value={modifiedJob.description}
          onChange={(e) =>
            setModifiedJob({ ...modifiedJob, description: e.target.value })
          }
        />
      </Td>
      <Td>
        <Input
          type="number"
          size="xs"
          placeholder="0"
          value={Number(modifiedJob.labor)}
          onChange={(e) =>
            setModifiedJob({ ...modifiedJob, labor: Number(e.target.value) })
          }
        />
      </Td>
      <Td>
        <Input
          type="number"
          size="xs"
          placeholder="0"
          value={Number(modifiedJob.mileage)}
          onChange={(e) =>
            setModifiedJob({ ...modifiedJob, mileage: Number(e.target.value) })
          }
        />
      </Td>
      <Td>
        <Input
          type="number"
          size="xs"
          placeholder="0"
          value={Number(modifiedJob.partsCost)}
          onChange={(e) =>
            setModifiedJob({
              ...modifiedJob,
              partsCost: Number(e.target.value),
            })
          }
        />
      </Td>
      <Td>${modifiedJob.partsTax.toFixed(2)}</Td>
      <Td>${modifiedJob.total.toFixed(2)}</Td>
      <Td>
        {saveDisabled ? (
          <Tooltip label="Name and Date are required">
            <Button size="sm" variant="ghost" disabled={true}>
              <FiCheck color="green" size="25px" />
            </Button>
          </Tooltip>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => saveJob(modifiedJob)}
          >
            <FiCheck color="green" size="25px" />
          </Button>
        )}

        <Button size="sm" variant="ghost" onClick={cancelEdit}>
          <FiX color="red" size="25px" />
        </Button>
      </Td>
    </Tr>
  );
};

export default EditJobRow;
