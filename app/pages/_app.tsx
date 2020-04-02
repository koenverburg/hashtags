import React from 'react'
import ErrorPage from 'next/error'
// import { withMobx } from '@hoc'
import App, { AppProps, AppInitialProps, AppContext } from 'next/app'
import { Provider, useStaticRendering } from 'mobx-react'
// import * as getStores from '../Stores'

// @ts-ignore
const isServer = !process.browser
useStaticRendering(isServer)

interface IRootElement {
  store: object[] | undefined
}

type RootElementProps = AppInitialProps & AppProps & IRootElement

class RootElement extends App<RootElementProps> {

  // public static async getInitialProps({ Component, ctx }: AppContext) {
  //   let pageProps = {}

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx)
  //   }

  //   return { pageProps }
  // }

  public render() {
    const { Component, pageProps, store } = this.props
    const { statusCode } = pageProps

    if (statusCode && statusCode >= 400) {
      return <ErrorPage statusCode={statusCode} />
    }

    return (
      <Provider {...store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

// export default withMobx(getStores)(RootElement)
export default RootElement
