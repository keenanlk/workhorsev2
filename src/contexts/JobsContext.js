import { createContext, useContext, useEffect, useState } from "react";
import { listJobs } from "../gql/queries";
import { CreateJob, DeleteJob, UpdateJob } from "../gql/mutations";
import { API } from "aws-amplify";
import { useQuery, useMutation } from "@apollo/client";

const jobsContext = createContext();

export function JobsContextProvider({ children }) {
  const { loading, error, data } = useQuery(listJobs);

  const [
    createJob,
    { data: createJobData, loading: createJobLoading, error: createJobError },
  ] = useMutation(CreateJob, {
    refetchQueries: [{ query: listJobs, variables: {} }],
  });

  async function addJob(job) {
    const date = new Date(job.date);
    date.setHours(date.getHours() + 12);
    await createJob({
      variables: {
        input: {
          ...job,
          date: Math.floor(date.getTime() / 1000),
        },
      },
    });
  }

  const [
    deleteJob,
    { data: deleteJobData, loading: deleteJobLoading, error: deleteJobError },
  ] = useMutation(DeleteJob, {
    refetchQueries: [{ query: listJobs }],
  });

  const [
    updateJob,
    { data: updateJobData, loading: updateJobLoading, error: updateJobError },
  ] = useMutation(UpdateJob, {
    refetchQueries: [{ query: listJobs }],
  });

  async function removeJob(id) {
    await deleteJob({
      variables: {
        input: {
          id: id,
        },
      },
    });
  }

  async function saveJob(job) {
    delete job.__typename;
    const date = new Date(job.date);
    date.setHours(date.getHours() + 5);

    delete job.createdAt;
    delete job.updatedAt;
    delete job.owner;
    await updateJob({
      variables: {
        input: { ...job, date: Math.floor(date.getTime() / 1000) },
      },
    });
  }

  return (
    <jobsContext.Provider
      value={{
        jobs: data?.listJobs?.items || [],
        addJob,
        loading:
          loading || createJobLoading || deleteJobLoading || updateJobLoading,
        removeJob,
        saveJob,
      }}
    >
      {children}
    </jobsContext.Provider>
  );
}

export function useJobs() {
  return useContext(jobsContext);
}
