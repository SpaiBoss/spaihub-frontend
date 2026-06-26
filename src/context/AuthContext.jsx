import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

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

  const refreshProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCurrentOwner(null);
      return null;
    }

    const payload = decodeToken(token);
    if (!payload || payload.exp * 1000 <= Date.now()) {
      localStorage.removeItem('token');
      setCurrentOwner(null);
      return null;
    }

    const { data } = await api.get('/api/owner/me');
    setCurrentOwner(data);
    return data;
  }, []);

  useEffect(() => {
    refreshProfile()
      .catch(() => {
        localStorage.removeItem('token');
        setCurrentOwner(null);
      })
      .finally(() => setLoading(false));
  }, [refreshProfile]);

  const login = useCallback((token, owner) => {
    localStorage.setItem('token', token);
    if (owner?.status) {
      setCurrentOwner(owner);
    } else {
      const payload = decodeToken(token);
      setCurrentOwner(owner || { id: payload?.id, email: payload?.email, name: owner?.name });
      refreshProfile().catch(() => {});
    }
  }, [refreshProfile]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setCurrentOwner(null);
  }, []);

  const updateOwner = useCallback((patch) => {
    setCurrentOwner((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const isAuthenticated = !!currentOwner;

  return (
    <AuthContext.Provider
      value={{ currentOwner, login, logout, isAuthenticated, loading, refreshProfile, updateOwner }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
