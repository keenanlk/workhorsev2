import { gql } from "@apollo/client";

export const listJobs = gql`
  query ListJobs(
    $filter: ModelJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
