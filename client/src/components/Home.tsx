import AppLogo from '@/assets/AppLogo.png';
import AuthContext from '@/contexts/AuthContext';
import Feed from '@/pages/Feed/Feed';
import React, { useContext } from 'react';

export const Home: React.FC = () => {
  const { accessToken } = useContext(AuthContext);
  return accessToken ? <Feed /> : <img src={AppLogo} width={'600vw'} height={'250vh'} />;
};
