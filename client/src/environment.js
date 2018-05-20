import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

const HOST = process.env.REACT_APP_GRAPHQL_HOST || 'http://localhost:30000/graphql';

function fetchQuery(operation, variables) {
  return fetch(HOST, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => response.json());
}

const network = Network.create(fetchQuery);
const source = new RecordSource();
const store = new Store(source);

export default new Environment({
  network,
  store,
});
