import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {Chatroom, User} from '../types';
import {gql, useQuery} from '@apollo/client';

const CHATROOM_QUERY = gql`
  query chatroom($id: String) {
    chatroom(id: $id) {
      id
    }
  }
`;

const CHATROOMUSERS_QUERY = gql`
  query chatroomUsers($chatroomId: String) {
    chatroomUsers(chatroomId: $chatroomId) {
      id
      email
      imageUri
    }
  }
`;

const ChatRoomHeader = ({chatroomId, authUser}) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [chatroom, setChatroom] = useState<Chatroom | undefined>(undefined);

  useQuery(CHATROOM_QUERY, {
    variables: {id: chatroomId},
    onCompleted: data => {
      console.log('ChatRoomHeader chatroom query complete');
      setChatroom(data.chatroom);
    },
    onError: error => {
      console.log(`ChatRoomHeader chatroom query error! ${error}`);
    },
    skip: !chatroomId,
  });

  useQuery(CHATROOMUSERS_QUERY, {
    variables: {chatroomId: chatroomId},
    onCompleted: data => {
      console.log('ChatRoomHeader chatroomUsers query complete');
      setAllUsers(data.chatroomUsers);
    },
    onError: error => {
      console.log(`ChatRoomHeader chatroomUsers query error! ${error}`);
    },
    skip: !chatroomId,
  });

  useEffect(() => {
    allUsers &&
      authUser &&
      setUser(allUsers.find(user => user.id !== authUser.id) || null);
  }, [allUsers, authUser]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: chatroom?.imageUri || user?.imageUri,
        }}
        style={styles.image}
      />
      <Pressable style={styles.infoWrapper}>
        <Text style={styles.infoText}>{chatroom?.name || user?.email}</Text>
      </Pressable>
      <Feather name="camera" size={24} color="black" style={styles.icon} />
      <Feather name="edit-2" size={24} color="black" style={styles.icon} />
    </View>
  );
};

export default ChatRoomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 70,
    marginLeft: -25,
  },
  image: {width: 30, height: 30, borderRadius: 30},
  infoWrapper: {flex: 1, marginLeft: 10},
  infoText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {marginHorizontal: 10},
});
