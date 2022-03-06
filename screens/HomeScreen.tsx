import React from 'react';
import {View, StyleSheet} from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';

const HomeScreen = () => {
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
