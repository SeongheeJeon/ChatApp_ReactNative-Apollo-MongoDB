import React, {useEffect, useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthUser, RootStackParamList} from '../types';

import ChatRoomScreen from '../screens/ChatRoomScreen';
import GroupInfoScreen from '../screens/GroupInfoScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import UsersScreen from '../screens/UsersScreen';
import ChatRoomHeader from '../components/ChatRoomHeader';

const GETAUTHUSER_QUERY = gql`
  query getAuthUser {
    getAuthUser {
      id
      username
      email
      imageUri
    }
  }
`;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNav = () => {
  const {loading, error, data} = useQuery(GETAUTHUSER_QUERY);
  const [authUser, setAuthUser] = useState<AuthUser | undefined>();

  // check if user authenticated (have valid token)
  useEffect(() => {
    if (loading) console.log('Submitting ... ');
    if (error) console.log(`rootnavigator query error! ${error}`);
    if (data) {
      if (data.getAuthUser) {
        console.log('RootNav getAuthUser complete');
        setAuthUser(data.getAuthUser);
      } else {
        console.log('RootNav getAuthUser : NO TOKEN');
      }
    }
  }, [loading, error, data]);

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={
          authUser ? () => <HomeScreen authUser={authUser} /> : SignInScreen
        }
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={() => ({
          headerTitle: () => <ChatRoomHeader />,
        })}
      />
      <Stack.Screen name="GroupInfoScreen" component={GroupInfoScreen} />
      <Stack.Screen
        name="UsersScreen"
        options={{
          title: 'Users',
        }}
        component={UsersScreen}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default RootNav;
