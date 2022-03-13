import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {gql, useMutation, useQuery} from '@apollo/client';
import {AuthUser, Chatroom, User} from '../types';

const CHATROOMUSERS_QUERY = gql`
  query chatroomUsers($chatroomId: String) {
    chatroomUsers(chatroomId: $chatroomId) {
      email
      imageUri
    }
  }
`;
type Props = {
  authUser: AuthUser;
  chatroom: Chatroom;
};

const ChatRoomItem: React.FC<Props> = ({authUser, chatroom}) => {
  const navigation = useNavigation();
  const [otherUser, setOtherUser] = useState<User | undefined>();
  const {data, loading, error} = useQuery(CHATROOMUSERS_QUERY, {
    variables: {chatroomId: chatroom.id},
  });

  useEffect(() => {
    if (loading) console.log('Submitting ... ');
    if (error) console.log(`ChatRoomItem query error! ${error}`);
    if (data) {
      console.log('ChatRoomItem chatroomUsers query complete');
      const user = data.chatroomUsers.find(
        (user: {email: string}) => user.email !== authUser.email,
      );
      setOtherUser(user);
    }
  }, [data, loading, error]);

  const onPress = async () => {
    navigation.navigate('ChatRoom');
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {chatroom && (
        <Image
          source={{
            uri: chatroom.imageUri || otherUser?.imageUri || undefined,
          }}
          style={styles.image}
        />
      )}

      {!!chatroom.newMessages && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatroom.newMessages}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          {chatroom && (
            <Text style={styles.name}>
              {chatroom.name || otherUser?.email || '알수없음'}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ChatRoomItem;

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
