import React, { useState } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { setAuthToken } from './pages/api';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState("");

  const handleLogin = (newToken, user) => {
    setAuthToken(newToken);
    setToken(newToken);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setAuthToken("");
    setToken("");
    setCurrentUser(null);
  };

  return (
    <AppNavigator
      onLogin={handleLogin}
      onLogout={handleLogout}
      currentUser={currentUser}
      token={token}
    />
  );
}

