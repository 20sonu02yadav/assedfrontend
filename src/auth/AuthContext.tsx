import React, { createContext, useContext, useEffect, useState } from "react";
import {
  clearTokens,
  fetchMe,
  getStoredAccessToken,
  setAuthToken,
  storeTokens,
} from "../services/api";
import { mergeGuestCartToServer } from "../services/cartApi";

type AuthUser = {
  id: number;
  username: string;
  email: string;
  role: string;
  mobile_no?: string;
  is_mobile_verified?: boolean;
};

type AuthContextType = {
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshMe() {
    try {
      const me = await fetchMe();
      setUser(me);
    } catch {
      setUser(null);
      clearTokens();
    }
  }

  async function loginWithTokens(
    access: string,
    refresh?: string,
    remember = true
  ) {
    storeTokens({ access, refresh, remember });
    setAuthToken(access);

    try {
      await mergeGuestCartToServer();
    } catch {
      // merge fail ho to bhi login continue rahe
    }

    const me = await fetchMe();
    setUser(me);

    window.dispatchEvent(new Event("cart:changed"));
  }

  function logout() {
    clearTokens();
    setUser(null);
    window.dispatchEvent(new Event("cart:changed"));
  }

  useEffect(() => {
    let mounted = true;

    async function init() {
      const token = getStoredAccessToken();

      if (!token) {
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        setAuthToken(token);
        const me = await fetchMe();

        if (!mounted) return;
        setUser(me);
      } catch {
        if (!mounted) return;
        clearTokens();
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithTokens,
        logout,
        refreshMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
}