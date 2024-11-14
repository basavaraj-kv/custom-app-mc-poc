import { isApolloError } from '@apollo/client';
import {
  transformLocalizedStringToLocalizedField,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';

import axios from 'axios'; 
import createHttpUserAgent from '@commercetools/http-user-agent';
import {
  buildApiUrl,
  executeHttpClientRequest,
} from '@commercetools-frontend/application-shell';

export const getErrorMessage = (error) =>
  error.graphQLErrors?.map((e) => e.message).join('\n') || error.message;

export const extractErrorFromGraphQlResponse = (graphQlResponse) => {
  if (graphQlResponse instanceof Error && isApolloError(graphQlResponse)) {
    if (
      typeof graphQlResponse.networkError?.result !== 'string' &&
      graphQlResponse.networkError?.result?.errors.length > 0
    ) {
      return graphQlResponse?.networkError?.result.errors;
    }

    if (graphQlResponse.graphQLErrors?.length > 0) {
      return graphQlResponse.graphQLErrors;
    }
  }

  return graphQlResponse;
};

const getNameFromPayload = (payload) => ({
  name: transformLocalizedStringToLocalizedField(payload.name),
});

const convertAction = (actionName, actionPayload) => ({
  [actionName]:
    actionName === 'changeName'
      ? getNameFromPayload(actionPayload)
      : actionPayload,
});

export const createGraphQlUpdateActions = (actions) =>
  actions.reduce(
    (previousActions, { action: actionName, ...actionPayload }) => [
      ...previousActions,
      convertAction(actionName, actionPayload),
    ],
    []
  );

export const convertToActionData = (draft) => ({
  ...draft,
  name: transformLocalizedFieldToLocalizedString(draft.nameAllLocales || []),
});

const userAgent = createHttpUserAgent({
  name: 'axios-client',
  version: '1.0.0',
  libraryName: window.app.applicationName,
  contactEmail: 'support@my-company.com',
});

export const  axioHandler = async(url, config = {}) => {
  const data = await executeHttpClientRequest(
    async (options) => {
      const res = await axios(buildApiUrl(url), {
        ...config,
        headers: options.headers,
        withCredentials: options.credentials === 'include',
      });
      return {
        data: res.data,
        statusCode: res.status,
        getHeader: (key) => res.headers[key],
      };
    },
    { userAgent, headers: config.headers }
  );
  return data;
}
