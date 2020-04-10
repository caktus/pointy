import React from 'react';
import StartPage from './StartPage';
import { HomeSocketProvider } from '../../../providers/HomeSocketProvider';

const AsyncStartPage = () => {
  return <HomeSocketProvider path='/' ><StartPage /></HomeSocketProvider>
}

export default AsyncStartPage;
