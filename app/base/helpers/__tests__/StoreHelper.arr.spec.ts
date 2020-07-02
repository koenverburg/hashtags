import { Statuses } from '../../enums/Statuses'
import { MockStoreArr } from './__mocks__/Mock.store.arr'

// jest.mock('repository.list', () => [{ id: 1, name: 'koen' }])

describe('StoreHelper', () => {
  let store: MockStoreArr

  beforeEach(() => {
    store = new MockStoreArr()
  })
  it('should have an fetch method', () => {
    expect(store.fetch).toBeDefined()
  })

  describe('fetch method', () => {
    it('should change the status', () => {
      store.fetch()

      expect(store.status).toBe(Statuses.PENDING)
      expect(store.IsPending).toBeTruthy()
    })
  })

  it('setData method - should handle an array as entity', () => {
    const mockEntityArr = [
      'Monitor',
      'desk',
      'mouse',
    ]
    store.setData(mockEntityArr)

    expect(store.entities).toStrictEqual(mockEntityArr)
    expect(store.status).toBe(Statuses.FULFILLED)
    expect(store.IsFulfilled).toBeTruthy()
  })

  it('should say return true on .any()', () => {
    const mockEntityArr = [
      'Monitor',
      'desk',
      'mouse',
    ]
    store.setData(mockEntityArr)

    expect(store.any()).toBeTruthy()
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
