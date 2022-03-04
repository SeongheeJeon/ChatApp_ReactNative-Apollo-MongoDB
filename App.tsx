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
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
  useQuery,
  useMutation,
} from '@apollo/client';
import {Pressable, SafeAreaView, StatusBar, Text, FlatList} from 'react-native';
import SignUp from './components/SignUp/SignUp';

const GET_USER = gql`
  query User {
    users {
      name
      description
    }
  }
`;

function GetUser() {
  const {loading, error, data} = useQuery(GET_USER);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  console.log(data);
  if (!data) return <Text>empty...</Text>;

  return (
    <FlatList
      data={data.users}
      renderItem={({item}) => (
        <Text>
          name : {item.name} description : {item.description}
        </Text>
      )}></FlatList>
  );
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
        {/* <GetUser /> */}
        <SignUp />
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
