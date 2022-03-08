import {makeVar} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';

import {RootStackParamList} from '../types';
import RootNav from './RootNav';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const isSignInVar = makeVar(false);

export default function Navigation() {
  console.log('HELLO NAVIGATION INDEX');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={RootNav}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
