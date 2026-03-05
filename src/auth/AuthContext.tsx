import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  clearTokens,
  getMe,
  getStoredAccessToken,
  setAuthToken,
  storeTokens,
} from "../services/api";

type AuthUser = {
  id: number;
  username: string;
  email: string;
  role: string;
};

type AuthCtx = {
  user: AuthUser | null;
  loading: boolean;
  loginWithTokens: (
    access: string,
    refresh?: string,
    remember?: boolean
  ) => Promise<void>;
  logout: () => void;
  refreshMe: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshMe() {
    try {
      const token = getStoredAccessToken();

      if (!token) {
        setUser(null);
        return;
      }

      setAuthToken(token);

      const me = await getMe();
      setUser(me.user);
    } catch (err) {
      clearTokens();
      setUser(null);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const token = getStoredAccessToken();

        if (!token) {
          setLoading(false);
          return;
        }

        setAuthToken(token);

        const me = await getMe();
        setUser(me.user);
      } catch {
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function loginWithTokens(
    access: string,
    refresh?: string,
    remember = true
  ) {
    storeTokens({ access, refresh, remember });
    await refreshMe();
  }

  function logout() {
    clearTokens();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      loginWithTokens,
      logout,
      refreshMe,
    }),
    [user, loading]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
}