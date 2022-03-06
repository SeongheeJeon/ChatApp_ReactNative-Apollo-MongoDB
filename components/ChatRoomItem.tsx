import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/core';

const ChatRoomItem = () => {
  const navigation = useNavigation();

  const onPress = async () => {
    navigation.navigate('ChatRoom');
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text>ChatRoomItem</Text>
    </Pressable>
  );
};

export default ChatRoomItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
