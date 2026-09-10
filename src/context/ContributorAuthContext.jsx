import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const ContributorAuthContext = createContext(null);

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export function ContributorAuthProvider({ children }) {
  const [contributor, setContributor] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const token = localStorage.getItem('contributorToken');
    if (!token) {
      setContributor(null);
      return null;
    }
    const payload = decodeToken(token);
    if (!payload || payload.exp * 1000 <= Date.now()) {
      localStorage.removeItem('contributorToken');
      setContributor(null);
      return null;
    }
    const { data } = await api.get('/api/contributor/me');
    setContributor(data);
    return data;
  }, []);

  useEffect(() => {
    refreshProfile()
      .catch(() => {
        localStorage.removeItem('contributorToken');
        setContributor(null);
      })
      .finally(() => setLoading(false));
  }, [refreshProfile]);

  const login = useCallback((token, user) => {
    localStorage.setItem('contributorToken', token);
    setContributor(user || null);
    refreshProfile().catch(() => {});
  }, [refreshProfile]);

  const logout = useCallback(() => {
    localStorage.removeItem('contributorToken');
    setContributor(null);
  }, []);

  return (
    <ContributorAuthContext.Provider
      value={{
        contributor,
        login,
        logout,
        isAuthenticated: !!contributor,
        loading,
        refreshProfile,
      }}
    >
      {children}
    </ContributorAuthContext.Provider>
  );
}

export function useContributorAuth() {
  const ctx = useContext(ContributorAuthContext);
  if (!ctx) throw new Error('useContributorAuth must be used within ContributorAuthProvider');
  return ctx;
}
