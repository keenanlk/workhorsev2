import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Button } from "@chakra-ui/react";

const JobRowActions = ({ confirmDelete, row, editRow }) => {
  return (
    <>
      <Button size="sm" variant="ghost" onClick={() => editRow(row)}>
        <FiEdit color="#90CDF4" size="18px" />
      </Button>
      <Button size="sm" variant="ghost" onClick={() => confirmDelete(row)}>
        <FiTrash2 color="red" size="18px" />
      </Button>
    </>
  );
};

export default JobRowActions;
