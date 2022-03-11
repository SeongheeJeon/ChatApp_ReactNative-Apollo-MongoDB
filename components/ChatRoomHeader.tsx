import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/core';

const ChatRoomHeader = () => {
  const navigation = useNavigation();

  const openInfo = () => {
    navigation.navigate('GroupInfoScreen');
  };

  return (
    <View>
      <Pressable onPress={openInfo}>
        <Text>ChatRoomName</Text>
      </Pressable>
    </View>
  );
};

export default ChatRoomHeader;
