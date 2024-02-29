import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from './navigation/screens/SignUp';
import Login from './navigation/screens/Login';
import UserHome from './navigation/screens/UserHome';
import Level1 from './navigation/screens/Level1';
import Precautions from './navigation/screens/Precautions';
import Map from './navigation/screens/Map';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="SignUp" component={SignUp}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="UserHome" component={UserHome}/>
          <Stack.Screen name="Level1" component={Level1}/>
          <Stack.Screen name="Precautions" component={Precautions}/>
          <Stack.Screen name="Map" component={Map}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}