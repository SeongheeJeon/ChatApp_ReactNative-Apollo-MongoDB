import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/core';
import {AuthUser} from '../types';

type Props = {
  authUser: AuthUser;
};

const HomeHeader: React.FC<Props> = ({authUser}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        marginRight: 30,
        alignItems: 'center',
      }}>
      <Image
        source={{
          uri: authUser.imageUri,
        }}
        style={{width: 30, height: 30, borderRadius: 30}}
      />

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

      <Pressable
        onPress={() =>
          navigation.navigate('UsersScreen', {authUser: authUser})
        }>
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
