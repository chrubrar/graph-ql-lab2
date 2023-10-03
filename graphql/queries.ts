import { gql } from "@apollo/client";

export const GET_NOVELS = gql`query Novels {
    novels {
      id
      authors {
        id
        name
        novelID
      }
      createdAt
      image
      title
      updatedAt
    }
  }
  `;

export const GET_NOVEL = gql`query Novel($id: ID!) {
    novel(id: $id) {
      id
      image
      title
      updatedAt
      createdAt
      authors {
        id
        name
        novelID
      }
    }
  }`;