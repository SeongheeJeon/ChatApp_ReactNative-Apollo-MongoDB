import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types';

import ChatRoomScreen from '../screens/ChatRoomScreen';
import GroupInfoScreen from '../screens/GroupInfoScreen';
import HomeScreen from '../screens/HomeScreen';
import UsersScreen from '../screens/UsersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HomeHeader from './HomeHeader';
import ChatRoomHeader from './ChatRoomHeader';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SignInNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <HomeHeader />,
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

export default SignInNav;
