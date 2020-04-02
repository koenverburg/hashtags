import { Statuses } from '../../enums/Statuses'
import { StatusHelper } from '../StatusHelper'

describe('StatusHelper', () => {
  let mockStatusInstance: StatusHelper

  beforeEach(() => {
    mockStatusInstance = new StatusHelper()
  })

  it("should have a 'idle' status on initialization", () => {
    expect(mockStatusInstance.status).toBe(Statuses.IDLE)
    expect(mockStatusInstance.IsIdle).toBe(true)
  })

  test("When status is 'pending' IsPending should be true", () => {
    mockStatusInstance.status = Statuses.PENDING

    expect(mockStatusInstance.status).toBe(Statuses.PENDING)
    expect(mockStatusInstance.IsPending).toBe(true)
  })

  test("When status is 'canceled' IsCanceled should be true", () => {
    mockStatusInstance.status = Statuses.CANCELED

    expect(mockStatusInstance.status).toBe(Statuses.CANCELED)
    expect(mockStatusInstance.IsCanceled).toBe(true)
  })

  test("When status is 'fulfilled' IsFulfilled should be true", () => {
    mockStatusInstance.status = Statuses.FULFILLED

    expect(mockStatusInstance.status).toBe(Statuses.FULFILLED)
    expect(mockStatusInstance.IsFulfilled).toBe(true)
  })

  test("When status is 'rejected' IsRejected should be true", () => {
    mockStatusInstance.status = Statuses.REJECTED

    expect(mockStatusInstance.status).toBe(Statuses.REJECTED)
    expect(mockStatusInstance.IsRejected).toBe(true)
  })
})
