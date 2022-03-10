import React from 'react';
import {Image, View, Text, Pressable, StyleSheet} from 'react-native';
import {AuthUser} from '../types';

export type Props = {
  authUser: AuthUser;
};

const UserItem: React.FC<Props> = ({authUser}) => {
  return (
    <Pressable style={styles.container}>
      <Image
        source={{
          uri: authUser.imageUri,
        }}
        style={styles.image}
      />

      <View style={styles.rightContainer}>
        <Text style={styles.name}>{authUser.email}</Text>
      </View>
    </Pressable>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  badgeContainer: {
    backgroundColor: '#3777f0',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 45,
    top: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 3,
  },
  text: {
    color: 'grey',
  },
});
