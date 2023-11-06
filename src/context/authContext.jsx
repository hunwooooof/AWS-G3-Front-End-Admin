import { createContext, useCallback, useEffect, useState } from 'react';
import ec2Api from '../utils/ec2Api';
export const AuthContext = createContext({
  isLogin: false,
  user: {},
  loading: false,
  jwtToken: '',
  login: () => {},
  logout: () => {},
  nativeLogin: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [jwtToken, setJwtToken] = useState();

  const nativeLogin = async (body) => {
    setLoading(true);
    const { data } = await ec2Api.signin(body);
    if (data) {
      const { user } = data;
      const accessToken = data.access_token;
      setUser(user);
      setJwtToken(accessToken);
      window.localStorage.setItem('jwtToken', accessToken);
      setLoading(false);
      setIsLogin(true);
      return accessToken;
    } else {
      window.localStorage.removeItem('jwtToken');
      setLoading(false);
      return null;
    }
  };

  const logout = async () => {
    setLoading(true);
    setIsLogin(false);
    setUser({});
    setJwtToken();
    window.localStorage.removeItem('jwtToken');
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        user,
        loading,
        jwtToken,
        nativeLogin,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
