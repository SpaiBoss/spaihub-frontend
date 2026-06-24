import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [currentOwner, setCurrentOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = decodeToken(token);
      if (payload && payload.exp * 1000 > Date.now()) {
        setCurrentOwner({ id: payload.id, email: payload.email, name: payload.name });
      } else {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((token, owner) => {
    localStorage.setItem('token', token);
    const payload = decodeToken(token);
    setCurrentOwner(owner || { id: payload?.id, email: payload?.email, name: owner?.name });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setCurrentOwner(null);
  }, []);

  const isAuthenticated = !!currentOwner;

  return (
    <AuthContext.Provider value={{ currentOwner, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
