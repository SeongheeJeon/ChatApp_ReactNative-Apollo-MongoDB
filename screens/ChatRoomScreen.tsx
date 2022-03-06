import {Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

const ChatRoomScreen = () => {
  return (
    <SafeAreaView style={styles.page}>
      <Text>ChatRoomScreen</Text>
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
