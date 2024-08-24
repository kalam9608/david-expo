import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type ExamAnswerInput = {
  id: Scalars['Int']['input'];
  selectedOptions: Scalars['String']['input'];
};

export type ExamModel = {
  __typename?: 'ExamModel';
  id: Scalars['ID']['output'];
  selectedOptions: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  saveExams: Scalars['Boolean']['output'];
  updateUser: User;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationSaveExamsArgs = {
  examAnswers: Array<ExamAnswerInput>;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  exams: Array<ExamModel>;
  getUserById?: Maybe<User>;
};

export type UpdateUserInput = {
  firstName: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, firstName?: string | null, email: string } };

export type GetExamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExamsQuery = { __typename?: 'Query', exams: Array<{ __typename?: 'ExamModel', id: string, selectedOptions: string, userId: string }> };

export type GetUserByIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById?: { __typename?: 'User', id: string, firstName?: string | null, email: string } | null };

export type SaveExamsMutationVariables = Exact<{
  examAnswers: Array<ExamAnswerInput> | ExamAnswerInput;
}>;


export type SaveExamsMutation = { __typename?: 'Mutation', saveExams: boolean };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, firstName?: string | null } };


export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    id
    firstName
    email
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetExamsDocument = gql`
    query GetExams {
  exams {
    id
    selectedOptions
    userId
  }
}
    `;

/**
 * __useGetExamsQuery__
 *
 * To run a query within a React component, call `useGetExamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExamsQuery(baseOptions?: Apollo.QueryHookOptions<GetExamsQuery, GetExamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExamsQuery, GetExamsQueryVariables>(GetExamsDocument, options);
      }
export function useGetExamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExamsQuery, GetExamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExamsQuery, GetExamsQueryVariables>(GetExamsDocument, options);
        }
export function useGetExamsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExamsQuery, GetExamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExamsQuery, GetExamsQueryVariables>(GetExamsDocument, options);
        }
export type GetExamsQueryHookResult = ReturnType<typeof useGetExamsQuery>;
export type GetExamsLazyQueryHookResult = ReturnType<typeof useGetExamsLazyQuery>;
export type GetExamsSuspenseQueryHookResult = ReturnType<typeof useGetExamsSuspenseQuery>;
export type GetExamsQueryResult = Apollo.QueryResult<GetExamsQuery, GetExamsQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById {
  getUserById {
    id
    firstName
    email
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const SaveExamsDocument = gql`
    mutation SaveExams($examAnswers: [ExamAnswerInput!]!) {
  saveExams(examAnswers: $examAnswers)
}
    `;
export type SaveExamsMutationFn = Apollo.MutationFunction<SaveExamsMutation, SaveExamsMutationVariables>;

/**
 * __useSaveExamsMutation__
 *
 * To run a mutation, you first call `useSaveExamsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveExamsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveExamsMutation, { data, loading, error }] = useSaveExamsMutation({
 *   variables: {
 *      examAnswers: // value for 'examAnswers'
 *   },
 * });
 */
export function useSaveExamsMutation(baseOptions?: Apollo.MutationHookOptions<SaveExamsMutation, SaveExamsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveExamsMutation, SaveExamsMutationVariables>(SaveExamsDocument, options);
      }
export type SaveExamsMutationHookResult = ReturnType<typeof useSaveExamsMutation>;
export type SaveExamsMutationResult = Apollo.MutationResult<SaveExamsMutation>;
export type SaveExamsMutationOptions = Apollo.BaseMutationOptions<SaveExamsMutation, SaveExamsMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    id
    firstName
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;