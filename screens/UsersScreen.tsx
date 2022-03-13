import React, {useState, useEffect} from 'react';

import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import UserItem from '../components/UserItem';
import {gql, useQuery} from '@apollo/client';
import {AuthUser, RootStackScreenProps} from '../types';

const GET_USERS_QUERY = gql`
  query users {
    users {
      id
      email
      imageUri
    }
  }
`;

const UsersScreen: React.FC<RootStackScreenProps<'UsersScreen'>> = ({
  route,
}) => {
  const [otherUsers, setOtherUsers] = useState([]);
  const [authUser, setAuthUser] = useState<AuthUser | undefined>();
  const {data, loading, error} = useQuery(GET_USERS_QUERY);

  useEffect(() => {
    setAuthUser(route.params.authUser);
  }, [route]);

  useEffect(() => {
    if (loading) console.log('Submitting ... ');
    if (error) console.log(`UsersScreen query ERROR! ${error}`);
    if (data && authUser) {
      console.log('UsersScreen getUsersQuery complete');
      const fetchedUsers = data.users.filter(
        (user: AuthUser) => user.id !== authUser.id,
      );
      setOtherUsers(fetchedUsers);
    }
  }, [loading, error, data, authUser]);

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={otherUsers}
        renderItem={({item}) => <UserItem authUser={authUser} user={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  button: {
    backgroundColor: '#3777f0',
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
