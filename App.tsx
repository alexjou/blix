import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/Contexts/AuthContext';
import Routes from './src/Routes';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar />
      <Routes />
    </AuthProvider>
  );
}
