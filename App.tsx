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
import {ApolloProvider, useQuery, useMutation} from '@apollo/client';
import {Pressable, SafeAreaView, StatusBar, Text, FlatList} from 'react-native';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

const SAY_HELLO = gql`
  query Query {
    hello
  }
`;

function SayHello() {
  const {loading, error, data} = useQuery(SAY_HELLO);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  console.log(data);
  if (!data) return <Text>empty...</Text>;

  return <Text>{data.hello}</Text>;
}

const App = () => {
  const client = new ApolloClient({
    uri: 'http://10.0.2.2:4000/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <StatusBar />
        <SayHello />
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
