import React from 'react'
import ErrorPage from 'next/error'
import App, { AppProps, AppInitialProps, AppContext } from 'next/app'
// import { withMobx } from '@hoc'
import { Provider, useStaticRendering } from 'mobx-react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

// @ts-ignore
const isServer = !process.browser
useStaticRendering(isServer)

interface IRootElement {
  store: object[] | undefined
}

type RootElementProps = AppInitialProps & AppProps & IRootElement & { store: object }

class RootElement extends App<RootElementProps> {

  public static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  public render() {
    const { Component, pageProps, store } = this.props
    const { statusCode } = pageProps

    if (statusCode && statusCode >= 400) {
      return <ErrorPage statusCode={statusCode} />
    }

    return (
      <ThemeProvider>
        <CSSReset />
        <Provider {...store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    )
  }
}

// export default withMobx(getStores)(RootElement)
export default RootElement
