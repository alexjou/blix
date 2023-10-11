import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../Contexts/AuthContext';
import Home from '../Screens/Home';
import SignUp from '../Screens/SignUp';
import SignIn from '../Screens/SignIn';

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name='Home' component={Home} />

  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name='SignIn' component={SignIn} />
    <Stack.Screen name='SignUp' component={SignUp} />
  </Stack.Navigator>
);

const Routes = () => {
  const { user } = useContext(AuthContext);

  // Verifique se o usuário está autenticado
  const isLoggedIn = !!user;

  return <NavigationContainer>{isLoggedIn ? <MainStack /> : <AuthStack />}</NavigationContainer>;
};

export default Routes;
