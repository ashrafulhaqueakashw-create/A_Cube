import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, LoginData, RegisterData, User } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  login: (dataOrEmail: LoginData | string, password?: string) => Promise<any>;
  adminLogin: (dataOrEmail: LoginData | string, password?: string) => Promise<any>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getMe();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (dataOrEmail: LoginData | string, maybePassword?: string) => {
    const email = typeof dataOrEmail === 'string' ? dataOrEmail : dataOrEmail.email;
    const password = typeof dataOrEmail === 'string' ? (maybePassword || '') : dataOrEmail.password;
    const user = await authService.login(email, password);
    setUser(user);
    return user;
  };

  const adminLogin = async (dataOrEmail: LoginData | string, maybePassword?: string) => {
    const email = typeof dataOrEmail === 'string' ? dataOrEmail : dataOrEmail.email;
    const password = typeof dataOrEmail === 'string' ? (maybePassword || '') : dataOrEmail.password;
    const user = await authService.adminLogin(email, password);
    setUser(user);
    return user;
  };

  const register = async (data: RegisterData) => {
    await authService.register(data);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin' || user?.role === 'superadmin',
        isStudent: user?.role === 'student',
        login,
        adminLogin,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
