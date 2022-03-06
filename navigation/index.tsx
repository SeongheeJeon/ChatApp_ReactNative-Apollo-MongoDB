import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';

import RootNavigator from './RootNavigator';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
