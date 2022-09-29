import '../styles/globals.css'
import { ReactNode } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'

type Page<P = {}> = (NextPage<P>) & { 
  getLayout?: (page: ReactNode) => ReactNode
}

type Props = AppProps & {
  Component: Page;
}

export default function MyApp({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return getLayout(<Component {...pageProps} />)
}