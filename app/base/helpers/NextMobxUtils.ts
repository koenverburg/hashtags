import { isServer } from '../constants/index'

const __NEXT_MOBX_STORE__ = new Map()

// getCounterStore => counterStore => counter
export const getKeyNameStore = name => name.replace(/^get(.)/, (match, p1) => p1.toLowerCase()).replace('Store', '')

export const mapToJson = (map: any) => {
  try {
    return JSON.stringify([...map])
  } catch (e) {
    return map
  }
}

export const jsonToMap = (jsonStr: any) => {
  if (!jsonStr) return jsonStr

  try {
    return new Map(JSON.parse(jsonStr))
  } catch (_) {
    return jsonStr
  }
}

export const getOrCreateStore = (storeKeyName: any, Store: any) => (initialState: object) => {
  // Convert Map to JSON
  if (initialState) {
    // tslint:disable-next-line:forin
    for (const itemState in initialState) {
      try {
        const dataMap = initialState[itemState]
        if (dataMap instanceof Array) {
          initialState[itemState] = mapToJson(dataMap)
        }
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.info(`catch at "getOrCreateStore" ${e} `)
      }
    }
  }

  // Always make a new store if server
  if (isServer) {
    return new Store(initialState)
  }

  // Create store if unavailable on the client
  if (!__NEXT_MOBX_STORE__.has(storeKeyName)) {
    __NEXT_MOBX_STORE__.set(storeKeyName, new Store(initialState))
  }

  return __NEXT_MOBX_STORE__.get(storeKeyName)
}
