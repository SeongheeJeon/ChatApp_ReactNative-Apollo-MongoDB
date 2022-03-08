import React, {useEffect} from 'react';
import {gql, useQuery, useReactiveVar} from '@apollo/client';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInNav from './SignInNav';
import SignOutNav from './SignOutNav';
import {RootStackParamList} from '../types';
import {isSignInVar} from './index';

const GETAUTHUSER_QUERY = gql`
  query getAuthUser {
    getAuthUser {
      id
      email
    }
  }
`;
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNav = () => {
  const {loading, error, data} = useQuery(GETAUTHUSER_QUERY);
  const isSignIn = useReactiveVar(isSignInVar);

  // check if user authenticated (have valid token)
  useEffect(() => {
    if (loading) console.log('Submitting ... ');
    if (error) console.log(`rootnavigator query error! ${error}`);
    if (data) {
      if (data.getAuthUser) {
        console.log('RootNav getAuthUser data : ', data);
        isSignInVar(true);
      } else {
        console.log('RootNav NO TOKEN');
      }
    }
  }, [loading, error, data]);

  return (
    <Stack.Navigator>
      {isSignIn ? (
        <Stack.Screen
          name="AuthedScreen"
          component={SignInNav}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="UnAuthedScreen"
          component={SignOutNav}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNav;
