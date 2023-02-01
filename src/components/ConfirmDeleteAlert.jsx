import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

const ConfirmDeleteAlert = ({ deleteData, cancelDelete, deleteJob }) => {
  const cancelRef = useRef();
  return (
    <AlertDialog
      isOpen={deleteData}
      onClose={cancelDelete}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Job
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this job for{" "}
            <strong>{deleteData.name}</strong>?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={cancelDelete} ref={cancelRef}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={deleteJob} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDeleteAlert;
