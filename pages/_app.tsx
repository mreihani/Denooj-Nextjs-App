// 'use client';

import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store'; 
import { Metadata, NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import "@/public/assets/css/fontawesome-all-pro.css"; 
import "@/public/assets/css/fonts.css"; 
import "@/public/assets/css/root.css";
import "@/public/assets/css/style.css";
import "@/public/assets/css/animation.css";
import "bootstrap/dist/css/bootstrap.min.css";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
};

export default MyApp;