import { getKeyNameStore, getOrCreateStore, jsonToMap, mapToJson } from '../NextMobxUtils'
import { Statuses } from '../../enums/Statuses'
import { MockStoreArr } from './__mocks__/Mock.store.arr'

describe('StoreHelper', () => {
  test('getKeyNameStore - should return a name without store', () => {
    const mockStoreName = getKeyNameStore('getMockStore')
    expect(mockStoreName).toEqual('mock')
  })

  test("getOrCreatStore - create a new store when it doesn't exist", () => {
    const getMockStore = getOrCreateStore('mock', MockStoreArr)({})
    const testMap = new Map()
    testMap.set('mock', new MockStoreArr())
    expect(getMockStore).toEqual(testMap.get('mock'))
  })

  test('mapToJson- Map to json', () => {
    const testMap = new Map()
    testMap.set('entities', null)
    testMap.set('error', null)
    testMap.set('status', Statuses.IDLE)

    const result = '[["entities",null],["error",null],["status","idle"]]'

    expect(mapToJson(testMap)).toEqual(result)
  })

  test('jsonToMap - mapping a json object/array to a map', () => {
    const data = { entities: null, error: null, status: Statuses.IDLE }
    const stringifiedData = JSON.stringify(data)

    expect(jsonToMap(stringifiedData)).toEqual(stringifiedData)
  })
})
