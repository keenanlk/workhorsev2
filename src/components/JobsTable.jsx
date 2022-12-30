import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Spinner,
  useToast,
  Tfoot,
} from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import NewJobRow from "./NewJobRow";
import JobRowActions from "./JobRowActions";
import EditJobRow from "./EditJobRow";
import { useState } from "react";
import { useJobs } from "../contexts/JobsContext";

const JobsTable = ({
  table,
  loading,
  newJob,
  filteredJobs,
  confirmDelete,
  createNewJob,
  cancelNewJob,
}) => {
  const [editingJob, setEditingJob] = useState(null);
  const { saveJob } = useJobs() || {};
  const toast = useToast();

  function editJobRow(row) {
    setEditingJob(row.original.id);
  }

  function onCancel() {
    setEditingJob(null);
  }

  async function updateJob(row) {
    await saveJob(row);
    setEditingJob(null);
    toast({ title: "Job Updated", status: "success", duration: 4000 });
  }

  return (
    <TableContainer height="100%" overflowX="unset" overflowY="unset">
      <Table size="sm">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "var(--chakra-colors-gray-900)",
                    paddingBottom: "10px",
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
              <Th> </Th>
            </Tr>
          ))}
        </Thead>
        <Tbody>
          <>
            {loading ? (
              <Tr>
                <Td>
                  <Spinner size="xl" />
                </Td>
              </Tr>
            ) : (
              <>
                {newJob && (
                  <NewJobRow addJob={createNewJob} onCancel={cancelNewJob} />
                )}

                {Boolean(filteredJobs?.length) &&
                  table.getRowModel()?.rows?.map((row, index) => {
                    if (editingJob === row.original.id) {
                      return (
                        <EditJobRow
                          key={index}
                          saveJob={updateJob}
                          onCancel={onCancel}
                          job={row.original}
                        />
                      );
                    }

                    return (
                      <Tr key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <Td key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Td>
                          );
                        })}
                        {!editingJob && !newJob && (
                          <Td>
                            <JobRowActions
                              confirmDelete={confirmDelete}
                              row={row}
                              editRow={editJobRow}
                            />
                          </Td>
                        )}
                      </Tr>
                    );
                  })}
              </>
            )}
          </>
        </Tbody>
        <Tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <Tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default JobsTable;
