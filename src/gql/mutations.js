import { gql } from "@apollo/client";

export const CreateJob = gql`
  mutation CreateJob(
    $input: CreateJobInput!
    $condition: ModelJobConditionInput
  ) {
    createJob(input: $input, condition: $condition) {
      id
      name
      date
      description
      labor
      mileage
      partsCost
      partsTax
      total
      createdAt
      updatedAt
      owner
    }
  }
`;

export const DeleteJob = gql`
  mutation DeleteJob(
    $input: DeleteJobInput!
    $condition: ModelJobConditionInput
  ) {
    deleteJob(input: $input, condition: $condition) {
      id
      name
      date
      description
      labor
      mileage
      partsCost
      partsTax
      total
      createdAt
      updatedAt
      owner
    }
  }
`;

export const UpdateJob = gql`
  mutation UpdateJob(
    $input: UpdateJobInput!
    $condition: ModelJobConditionInput
  ) {
    updateJob(input: $input, condition: $condition) {
      id
      name
      date
      description
      labor
      mileage
      partsCost
      partsTax
      total
      createdAt
      updatedAt
      owner
    }
  }
`;
