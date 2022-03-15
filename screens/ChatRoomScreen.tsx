import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AuthUser,
  Chatroom,
  Message as MessageModel,
  RootStackScreenProps,
} from '../types';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';
import {gql, useQuery} from '@apollo/client';

const CHATROOM_QUERY = gql`
  query chatroom($id: String) {
    chatroom(id: $id) {
      id
    }
  }
`;

const CHATROOM_MESSAGES_QUERY = gql`
  query chatroomMessages($chatroomId: String) {
    chatroomMessages(chatroomId: $chatroomId) {
      content
      userID
      forUserID
    }
  }
`;

const ChatRoomScreen: React.FC<RootStackScreenProps<'ChatRoom'>> = ({
  route,
}) => {
  const [chatroom, setChatroom] = useState<Chatroom | null>(null);
  const [messages, setMessages] = useState<[MessageModel] | undefined>();
  const [authUser, setAuthUser] = useState<AuthUser | undefined>(
    route.params.authUser,
  );

  useQuery(CHATROOM_QUERY, {
    variables: {id: route.params.chatroomId},
    onCompleted: data => {
      console.log('ChatRoomScreen chatroom query complete');
      setChatroom(data.chatroom);
    },
    onError: error => {
      console.log(`ChatRoomScreen chatroom query error! ${error}`);
    },
  });

  useQuery(CHATROOM_MESSAGES_QUERY, {
    variables: {chatroomId: route.params.chatroomId},
    onCompleted: data => {
      console.log('ChatRoomScreen messages query complete');
      setMessages(
        data.chatroomMessages.filter(
          (message: {forUserID: string}) => message.forUserID === authUser?.id,
        ),
      );
    },
    onError: error => {
      console.log(`ChatRoomScreen messages query error! ${error}`);
    },
  });

  useEffect(() => {
    chatroom && fetchAllUsers();
  }, [chatroom]);

  const fetchAllUsers = async () => {
    if (!chatroom) {
      console.log("chatroom isn't set");
      return;
    }
  };

  if (!chatroom) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={messages?.reverse()}
        renderItem={({item}) => <Message message={item} authUser={authUser} />}
        inverted
      />
      <MessageInput chatroom={chatroom} />
    </SafeAreaView>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
});
