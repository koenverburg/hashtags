import React, { Component, ComponentType } from 'react'
import { NextMobx } from '@helpers'

export const withMobx = (getStores: object = {}) => (App: ComponentType<{ store: object }>) => {
  class WithMobxInternalComponent extends Component<React.Props<any>> {
    public static async getInitialProps(context: { ctx: any }) {
      let appProps = {}

      // Provide the store to getInitialProps of pages
      context.ctx.stores = {}
      // tslint:disable-next-line:forin
      for (const fnName in getStores) {
        const storeKeyName = NextMobx.getKeyNameStore(fnName)
        context.ctx.stores[storeKeyName] = getStores[fnName]()
      }

      // @ts-ignore
      if (typeof App.getInitialProps === 'function') {
        // @ts-ignore
        appProps = await App.getInitialProps(context)
      }

      return {
        ...appProps,
        initialState: context.ctx.stores,
      }
    }

    constructor(props) {
      super(props)
      this.store = {}

      // tslint:disable-next-line:forin
      for (const fnName in getStores) {
        const storeKeyName = NextMobx.getKeyNameStore(fnName)
        this.store[storeKeyName] = getStores[fnName](props.initialState[storeKeyName])
      }
    }

    public store: {}

    public render() {
      return <App {...this.props} store={{ ...this.store }}/>
    }
  }

  return WithMobxInternalComponent
}
