import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

const ConfirmDeleteAlert = ({ deleteData, cancelDelete, deleteJob }) => {
  return (
    <AlertDialog isOpen={deleteData} onClose={cancelDelete}>
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
            <Button onClick={cancelDelete}>Cancel</Button>
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
