import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Router from './router';
import UserContextProvider from './context/userContextProvider';

const App = () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default App;