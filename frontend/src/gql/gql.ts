/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n\n    fragment ChatFragment on Chat {\n    \n        _id\n        name\n        latestMessage{\n        \n           ...MessageFragment\n\n        }\n\n    }\n\n": types.ChatFragmentFragmentDoc,
    "\n\n    fragment MessageFragment on Messages {\n    \n        _id\n        content\n        createdAt\n        chatId\n        user {\n        \n           _id\n           username\n           email\n\n        }\n\n    }\n\n": types.MessageFragmentFragmentDoc,
    "\n\n      mutation CreateChat($createChatInput: CreateChatInput!){\n      \n          createChat(createChatInput: $createChatInput) {\n          \n              ...ChatFragment\n\n          }\n\n      }\n \n": types.CreateChatDocument,
    "\n    \n    mutation CreateMessage($createMessageInput: CreateMessageInput!){\n    \n        createMessage(createMessageInput: $createMessageInput) {\n        \n           ...MessageFragment\n\n        }\n\n    }\n\n": types.CreateMessageDocument,
    "\n\n    query Chat($_id: String!){\n    \n       chat(_id: $_id){\n       \n          ...ChatFragment\n\n       }\n\n    }\n    \n": types.ChatDocument,
    "\n\n   query Chats($skip: Int!, $limit: Int!) {\n   \n       chats(skip: $skip, limit: $limit) {\n       \n            ...ChatFragment\n       \n       }\n\n   }\n\n": types.ChatsDocument,
    "\n\n    query Me{\n        me {\n\n           _id\n           email\n\n        }\n    }\n\n": types.MeDocument,
    "\n\n    query Messages($chatId: String!, $skip: Int!, $limit: Int!) {\n    \n       messages(chatId: $chatId, skip: $skip, limit: $limit) {\n       \n           ...MessageFragment\n         \n       }\n\n    }\n\n": types.MessagesDocument,
    "\n\n    subscription messageCreated($chatIds: [String!]!){\n    \n       messageCreated(chatIds:$chatIds){\n       \n          ...MessageFragment\n\n       }\n\n    }\n\n": types.MessageCreatedDocument,
    "\n\n   mutation RegisterUser($registerInput: RegisterInput!){\n\n      register(registerInput: $registerInput){\n\n        _id\n        email\n\n      }\n\n   }\n\n": types.RegisterUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\n    fragment ChatFragment on Chat {\n    \n        _id\n        name\n        latestMessage{\n        \n           ...MessageFragment\n\n        }\n\n    }\n\n"): (typeof documents)["\n\n    fragment ChatFragment on Chat {\n    \n        _id\n        name\n        latestMessage{\n        \n           ...MessageFragment\n\n        }\n\n    }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\n    fragment MessageFragment on Messages {\n    \n        _id\n        content\n        createdAt\n        chatId\n        user {\n        \n           _id\n           username\n           email\n\n        }\n\n    }\n\n"): (typeof documents)["\n\n    fragment MessageFragment on Messages {\n    \n        _id\n        content\n        createdAt\n        chatId\n        user {\n        \n           _id\n           username\n           email\n\n        }\n\n    }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\n      mutation CreateChat($createChatInput: CreateChatInput!){\n      \n          createChat(createChatInput: $createChatInput) {\n          \n              ...ChatFragment\n\n          }\n\n      }\n \n"): (typeof documents)["\n\n      mutation CreateChat($createChatInput: CreateChatInput!){\n      \n          createChat(createChatInput: $createChatInput) {\n          \n              ...ChatFragment\n\n          }\n\n      }\n \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    \n    mutation CreateMessage($createMessageInput: CreateMessageInput!){\n    \n        createMessage(createMessageInput: $createMessageInput) {\n        \n           ...MessageFragment\n\n        }\n\n    }\n\n"): (typeof documents)["\n    \n    mutation CreateMessage($createMessageInput: CreateMessageInput!){\n    \n        createMessage(createMessageInput: $createMessageInput) {\n        \n           ...MessageFragment\n\n        }\n\n    }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\n    query Chat($_id: String!){\n    \n       chat(_id: $_id){\n       \n          ...ChatFragment\n\n       }\n\n    }\n    \n"): (typeof documents)["\n\n    query Chat($_id: String!){\n    \n       chat(_id: $_id){\n       \n          ...ChatFragment\n\n       }\n\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\n   query Chats($skip: Int!, $limit: Int!) {\n   \n       chats(skip: $skip, limit: $limit) {\n       \n            ...ChatFragment\n       \n       }\n\n   }\n\n"): (typeof documents)["\n\n   query Chats($skip: Int!, $limit: Int!) {\n   \n       chats(skip: $skip, limit: $limit) {\n       \n            ...ChatFragment\n       \n       }\n\n   }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\n    query Me{\n        me {\n\n           _id\n           email\n\n        }\n    }\n\n"): (typeof documents)["\n\n    query Me{\n        me {\n\n           _id\n           email\n\n        }\n    }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\n    query Messages($chatId: String!, $skip: Int!, $limit: Int!) {\n    \n       messages(chatId: $chatId, skip: $skip, limit: $limit) {\n       \n           ...MessageFragment\n         \n       }\n\n    }\n\n"): (typeof documents)["\n\n    query Messages($chatId: String!, $skip: Int!, $limit: Int!) {\n    \n       messages(chatId: $chatId, skip: $skip, limit: $limit) {\n       \n           ...MessageFragment\n         \n       }\n\n    }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\n    subscription messageCreated($chatIds: [String!]!){\n    \n       messageCreated(chatIds:$chatIds){\n       \n          ...MessageFragment\n\n       }\n\n    }\n\n"): (typeof documents)["\n\n    subscription messageCreated($chatIds: [String!]!){\n    \n       messageCreated(chatIds:$chatIds){\n       \n          ...MessageFragment\n\n       }\n\n    }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\n   mutation RegisterUser($registerInput: RegisterInput!){\n\n      register(registerInput: $registerInput){\n\n        _id\n        email\n\n      }\n\n   }\n\n"): (typeof documents)["\n\n   mutation RegisterUser($registerInput: RegisterInput!){\n\n      register(registerInput: $registerInput){\n\n        _id\n        email\n\n      }\n\n   }\n\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;