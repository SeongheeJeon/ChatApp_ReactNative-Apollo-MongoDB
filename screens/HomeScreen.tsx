import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import ChatRoomItem from '../components/ChatRoomItem';
import HomeHeader from '../components/HomeHeader';
import {AuthUser} from '../types';
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
  const navigation = useNavigation();
  const route = useRoute();
  const [chatrooms, setChatrooms] = useState();

  const {data, loading, error} = useQuery(MYCHATROOMS_QUERY);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => <HomeHeader authUser={authUser || route.params} />,
    });
  }, []);

  useEffect(() => {
    if (loading) console.log('Submitting ... ');
    if (error) console.log(`HomeScreen query error! ${error}`);
    if (data) {
      console.log('HomeScreen myChatrooms query complete ');
      setChatrooms(data.myChatrooms);
    }
  }, [data, loading, error]);

  return (
    <View style={styles.page}>
      <FlatList
        data={chatrooms}
        renderItem={({item}) => (
          <ChatRoomItem authUser={authUser || route.params} chatroom={item} />
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
