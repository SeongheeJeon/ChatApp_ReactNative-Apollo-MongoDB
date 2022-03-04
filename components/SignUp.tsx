import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React from 'react';
const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a new account</Text>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        placeholderTextColor="white"
        // onChangeText={val => this.onChangeText('username', val)}
      />
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="white"
        // onChangeText={val => this.onChangeText('email', val)}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="white"
        // onChangeText={val => this.onChangeText('password', val)}
      />

      <Button
        title="Sign Up"
        // onPress={this.signUp}
      />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 45,
    padding: 8,
    marginVertical: 10,
    color: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    fontSize: 18,
    fontWeight: '500',
  },
});
