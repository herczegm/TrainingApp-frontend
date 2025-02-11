import React from 'react';
import Navigation from './app/navigation/Navigation';
import { UserProvider } from './app/context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}
