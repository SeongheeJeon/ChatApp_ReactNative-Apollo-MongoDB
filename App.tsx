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
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const httpLink = createHttpLink({
    uri: 'http://10.0.2.2:4000/graphql',
  });

  const authLink = setContext(async (_, {headers}) => {
    const token = await AsyncStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? token : undefined,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
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
