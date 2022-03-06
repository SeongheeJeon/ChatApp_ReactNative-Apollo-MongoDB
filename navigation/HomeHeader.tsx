import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/core';

const HomeHeader = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        marginRight: 30,
        alignItems: 'center',
      }}>
      <Text
        style={{
          flex: 1,
          textAlign: 'center',
          marginLeft: 50,
          fontWeight: 'bold',
          fontSize: 16,
        }}>
        Signal
      </Text>

      <Pressable onPress={() => navigation.navigate('Settings')}>
        <Feather
          name="settings"
          size={24}
          color="black"
          style={{marginHorizontal: 10}}
        />
      </Pressable>

      <Pressable onPress={() => navigation.navigate('UsersScreen')}>
        <Feather
          name="edit-2"
          size={24}
          color="black"
          style={{marginHorizontal: 10}}
        />
      </Pressable>
    </View>
  );
};

export default HomeHeader;
