import React from 'react';
import {Image, View, Text, Pressable, StyleSheet} from 'react-native';
import {gql, useMutation} from '@apollo/client';

import {AuthUser, User} from '../types';

const CREATE_CHATROOM_MUTATION = gql`
  mutation createChatroom($usersId: [String]) {
    createChatroom(usersId: $usersId) {
      id
      users {
        email
        username
      }
    }
  }
`;

type Props = {
  authUser: AuthUser | undefined;
  user: User;
};

const UserItem: React.FC<Props> = ({authUser, user}) => {
  const [createChatroomMutation, {data, loading, error}] = useMutation(
    CREATE_CHATROOM_MUTATION,
  );

  const onUserPress = () => {
    createChatroomMutation({
      variables: {usersId: [authUser?.id, user.id]},
      onCompleted: data => {
        console.log('UserItem createChatroomMutation completed');
      },
      onError: data => {
        console.log(data.message);
      },
    });

    if (loading) console.log('Submitting ... ');
    if (error) console.log(`Submission error! ${error}`);
  };

  return (
    <Pressable style={styles.container} onPress={onUserPress}>
      <Image
        source={{
          uri: user.imageUri,
        }}
        style={styles.image}
      />

      <View style={styles.rightContainer}>
        <Text style={styles.name}>{user.email}</Text>
      </View>
    </Pressable>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  badgeContainer: {
    backgroundColor: '#3777f0',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 45,
    top: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 3,
  },
  text: {
    color: 'grey',
  },
});
