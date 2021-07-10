// COMPONENTS
import View from "../components/View";
// APOLLO CLIENT
import { ApolloProvider } from "@apollo/client"
import client from "../graphql/client";
// STYLING
import "../styles/globals.scss";
import "bootstrap/scss/bootstrap.scss";
// ICONS
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <View title="Budget Tracker App"></View>;
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
