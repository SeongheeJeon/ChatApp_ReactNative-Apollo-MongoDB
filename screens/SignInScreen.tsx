import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import asyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {isSignInVar} from '../navigation/index';

const SIGNIN_MUTATION = gql`
  mutation loginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      username
      token
    }
  }
`;

const SignInScreen = () => {
  const [email, setEmail] = useState<String | undefined>();
  const [password, setPassword] = useState<String | undefined>();
  const [signInMutation, {data, loading, error}] = useMutation(SIGNIN_MUTATION);

  const navigation = useNavigation();

  const onPressSignIn = async () => {
    if (!email) {
      Alert.alert('Input the email.');
      return;
    }

    if (email && !password) {
      Alert.alert('Input the password.');
      return;
    }

    await signInMutation({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
      onCompleted: async data => {
        asyncStorage.setItem('token', data.loginUser.token);

        isSignInVar(true);
      },
      onError: data => {
        Alert.alert(data.message);
      },
    });
    if (loading) console.log('Submitting ... ');
    if (error) console.log(`Submission error! ${error}`);
  };

  const onPressFindPW = () => {
    console.log('clicked Forgot Password button');
  };
  const goToSignUp = () => {
    console.log('clicked Sign Up button');
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign in to your account</Text>

      <Text style={styles.subtitle}>Email</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={setEmail}
      />

      <Text style={styles.subtitle}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={setPassword}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.mainButton}
        onPress={onPressSignIn}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.sideButton}
          onPress={onPressFindPW}>
          <Text style={[styles.buttonText, {color: 'orange'}]}>
            Forgot Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.sideButton}
          onPress={goToSignUp}>
          <Text style={[styles.buttonText, {color: 'orange'}]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

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
  mainButton: {
    width: '100%',
    height: 45,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  sideButton: {
    width: '50%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
