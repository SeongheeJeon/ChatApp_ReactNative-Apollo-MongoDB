import React, {useEffect} from 'react';
import {gql, useQuery} from '@apollo/client';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import GroupInfoScreen from '../screens/GroupInfoScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import UsersScreen from '../screens/UsersScreen';
import ChatRoomHeader from './ChatRoomHeader';
import HomeHeader from './HomeHeader';

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

  // check if user authenticated (have valid token)
  useEffect(() => {
    if (loading) console.log('Submitting ... ');
    if (error) console.log(`rootnavigator query error! ${error}`);
    if (data) {
      if (data.getAuthUser) {
        console.log('RootNav getAuthUser data : ', data);
      } else {
        console.log('RootNav NO TOKEN');
      }
    }
  }, [loading, error, data]);

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={data && data.getAuthUser ? HomeScreen : SignInScreen}
        options={() =>
          data && data.getAuthUser
            ? {
                headerTitle: () => <HomeHeader />,
              }
            : {headerShown: false}
        }
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <HomeHeader />,
        }}
      />
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
