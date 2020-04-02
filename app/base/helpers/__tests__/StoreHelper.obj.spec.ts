import { Statuses } from '../../enums/Statuses'
import { MockStoreObj } from './__mocks__/Mock.store.obj'

describe('StoreHelper', () => {
  let store: MockStoreObj

  beforeEach(() => {
    store = new MockStoreObj()
  })

  it('should have an update method for nextmobx', () => {
    expect(store.update).toBeDefined()
  })

  it('should have an fetch method', () => {
    expect(store.fetch).toBeDefined()
  })

  it('setData method - should handle an object as entity', () => {
    const mockEntityObj = { id: 1, name: 'Koen', length: 0 }
    store.setData(mockEntityObj)

    expect(store.entities).toStrictEqual(mockEntityObj)
    expect(store.status).toBe(Statuses.FULFILLED)
    expect(store.IsFulfilled).toBeTruthy()
  })

  it('should say return false on .any()', () => {
    const mockEntityObj = { id: 1, name: 'Koen', length: 0 }
    store.setData(mockEntityObj)

    expect(store.any()).toBeFalsy()
  })

  test("setError method - should have an error and have the status of 'rejected'", () => {
    const AxiosMockError = {
      name: 'Error',
      message: 'error message',
      config: {},
      isAxiosError: true,
      toJSON: () => ({}),
    }
    store.setError(AxiosMockError)

    expect(store.error).toStrictEqual(AxiosMockError)
    expect(store.IsRejected).toBeTruthy()
    expect(store.status).toBe(Statuses.REJECTED)
  })
})
