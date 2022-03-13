import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import ChatRoomItem from '../components/ChatRoomItem';
import HomeHeader from '../components/HomeHeader';
import {AuthUser} from '../types';

type Props = {
  authUser: AuthUser;
};

const HomeScreen: React.FC<Props> = ({authUser}) => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => <HomeHeader authUser={authUser || route.params} />,
    });
  }, []);

  return (
    <View style={styles.page}>
      <ChatRoomItem />
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
