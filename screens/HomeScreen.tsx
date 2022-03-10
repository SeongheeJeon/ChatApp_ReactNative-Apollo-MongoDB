import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ChatRoomItem from '../components/ChatRoomItem';
import HomeHeader from '../navigation/HomeHeader';
import {AuthUser} from '../types';

export type Props = {
  authUser: AuthUser;
};

const HomeScreen: React.FC<Props> = ({authUser}) => {
  const navigation = useNavigation();

  useEffect(() => {
    authUser &&
      navigation.setOptions({
        headerTitle: () => <HomeHeader authUser={authUser} />,
      });
  }, [authUser]);

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
