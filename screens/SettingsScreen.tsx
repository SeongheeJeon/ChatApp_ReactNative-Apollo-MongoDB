import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackScreenProps} from '../types';

const SettingsScreen: React.FC<RootStackScreenProps<'Settings'>> = ({
  navigation,
}) => {
  const signOut = async () => {
    AsyncStorage.removeItem('token');

    navigation.reset({
      index: 0,
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={signOut}
        style={({pressed}) => [
          styles.button,
          pressed ? styles.buttonPressed : {},
        ]}>
        <FontAwesome name="sign-out" size={30} color="black" />
        <Text style={styles.text}>Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 15,
  },
  button: {
    height: 50,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 20,
  },
  buttonPressed: {
    opacity: 0.3,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});
