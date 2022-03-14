import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
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
    <View style={styles.container}>
      <Image
        source={{
          uri: authUser.imageUri,
        }}
        style={styles.image}
      />

      <Text style={styles.title}>Signal</Text>

      <Pressable onPress={() => navigation.navigate('Settings')}>
        <Feather name="settings" size={24} color="black" style={styles.icon} />
      </Pressable>

      <Pressable
        onPress={() =>
          navigation.navigate('UsersScreen', {authUser: authUser})
        }>
        <Feather name="edit-2" size={24} color="black" style={styles.icon} />
      </Pressable>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 30,
    alignItems: 'center',
  },
  image: {width: 30, height: 30, borderRadius: 30},
  title: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  icon: {marginHorizontal: 10},
});
