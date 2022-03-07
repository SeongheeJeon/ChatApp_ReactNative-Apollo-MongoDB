/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {StatusBar} from 'react-native';

import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './navigation';

const App = () => {
  const client = new ApolloClient({
    uri: 'http://10.0.2.2:4000/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
