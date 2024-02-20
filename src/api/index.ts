import { GraphQLClient, RequestDocument, Variables } from 'graphql-request';

const token = process.env.STRATZ_TOKEN;

const stratzClient = new GraphQLClient('https://api.stratz.com/graphql', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const getDataFromGraphQL = async (
    query: RequestDocument,
    input?: Variables
): Promise<unknown> => {
    return stratzClient.request(query, input);
};
