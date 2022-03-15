import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import ChatRoomItem from '../components/ChatRoomItem';
import HomeHeader from '../components/HomeHeader';
import {
  AuthUser,
  Chatroom,
  RootStackRouteProps,
  RootStackSNavigationProps,
} from '../types';
import {gql, useQuery} from '@apollo/client';

const MYCHATROOMS_QUERY = gql`
  query myChatrooms {
    myChatrooms {
      id
      imageUri
      name
      newMessages
    }
  }
`;

type Props = {
  authUser: AuthUser;
};

const HomeScreen: React.FC<Props> = ({authUser}) => {
  const navigation = useNavigation<RootStackSNavigationProps<'Home'>>();
  const route = useRoute<RootStackRouteProps<'Home'>>();
  const [chatrooms, setChatrooms] = useState<[Chatroom] | undefined>();

  useQuery(MYCHATROOMS_QUERY, {
    onCompleted: data => {
      console.log('HomeScreen myChatrooms query complete ');
      setChatrooms(data.myChatrooms);
    },
    onError: error => {
      console.log(`HomeScreen query error! ${error}`);
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <HomeHeader authUser={authUser || route.params?.authUser} />
      ),
    });
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={chatrooms}
        renderItem={({item}) => (
          <ChatRoomItem
            authUser={authUser || route.params?.authUser}
            chatroom={item}
          />
        )}></FlatList>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
});
