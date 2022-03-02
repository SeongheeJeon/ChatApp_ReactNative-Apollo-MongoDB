/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {ApolloProvider, useQuery} from '@apollo/client';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

const App = () => {
  const client = new ApolloClient({
    // uri: 'https://48p1r2roz4.sse.codesandbox.io',
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <StatusBar />
        <Text>hi seonghee</Text>
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
