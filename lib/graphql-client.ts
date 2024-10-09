// lib/graphql-client.ts
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://astralpaints.kwebmakerdigitalagency.com/graphql';

export const client = new GraphQLClient(endpoint);
