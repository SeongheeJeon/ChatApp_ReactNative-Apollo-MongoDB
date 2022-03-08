import {
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation registerUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      name
    }
  }
`;

const SignUpScreen = () => {
  const [username, setUsername] = useState<String | undefined>();
  const [email, setEmail] = useState<String | undefined>();
  const [password, setPassword] = useState<String | undefined>();
  const [secondPassword, setSecondPassword] = useState<String | undefined>();

  const navigation = useNavigation();

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
        registerInput: {
          username,
          email,
          password,
        },
      },
    });
    if (loading) console.log('Submitting ... ');
    if (error) console.log(`Submission error! ${error}`);
  };

  const goToSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create a new account</Text>
      <Text style={styles.subtitle}>Username *</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={setUsername}
      />
      <Text style={styles.subtitle}>Email *</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <Text style={styles.subtitle}>Password *</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={setPassword}
      />
      <Text style={styles.subtitle}>Confirm Password *</Text>
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

      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, {backgroundColor: 'white', marginTop: 'auto'}]}
        onPress={goToSignIn}>
        <Text style={[styles.buttonText, {color: 'orange'}]}>Sign In Here</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
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
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
