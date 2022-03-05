import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerUser(
      registerInput: {username: $username, email: $email, password: $password}
    ) {
      name
    }
  }
`;

const SignUp = () => {
  const [username, setUsername] = useState<String | undefined>();
  const [email, setEmail] = useState<String | undefined>();
  const [password, setPassword] = useState<String | undefined>();
  const [secondPassword, setSecondPassword] = useState<String | undefined>();

  const [signUpMutation, {data, loading, error}] = useMutation(
    CREATE_ACCOUNT_MUTATION,
  );

  const onPressSignUp = async () => {
    if (password !== secondPassword) {
      Alert.alert('Please check the password!');
      return;
    }

    await signUpMutation({
      variables: {
        username,
        email,
        password,
      },
    });
    if (loading) console.log('Submitting ... ');
    if (error) console.log(`Submission error! ${error}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create a new account</Text>
      <Text>Username *</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={setUsername}
      />
      <Text>Email *</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <Text>Password *</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={setPassword}
      />
      <Text>Confirm Password *</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={setSecondPassword}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={onPressSignUp}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
