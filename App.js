import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Calculator from './screens/Calculator';
import WelcomeScreen from './screens/WelcomeScreen';
import GraphicalCalculator from './screens/GraphicalCalculator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/*A back arrow for navigation */}
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="GraphicalCalculator" component={GraphicalCalculator} options={{ title: 'Graphical Calculator'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
