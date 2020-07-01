import React, { createContext } from 'react'

import { CollectorStore, localInitialState } from './Collector.store'

const createdContext = createContext(new CollectorStore(localInitialState))

export function useCollectorStore() {
  return React.useContext(createdContext)
}
