import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Amplify, Auth } from "aws-amplify";
import config from "./aws-exports";
import { ApolloLink } from "apollo-link";
import { createAuthLink } from "aws-appsync-auth-link";
import { createHttpLink } from "apollo-link-http";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

if (!isLocalhost) {
  config.oauth.redirectSignIn = "https://main.d2pfx7tyhkubif.amplifyapp.com/";
  config.oauth.redirectSignOut = "https://main.d2pfx7tyhkubif.amplifyapp.com/";
} else {
  config.oauth.redirectSignIn = "http://localhost:3000";
  config.oauth.redirectSignOut = "http://localhost:3000";
}
Amplify.configure(config);

const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;
const auth = {
  type: config.aws_appsync_authenticationType,
  jwtToken: async () => {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
  },
};

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createHttpLink({ uri: url }),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
