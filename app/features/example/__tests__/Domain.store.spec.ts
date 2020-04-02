import { DomainStore } from '../Domain.store'

describe('DomainStore', () => {
  it('fetches domains', () => {
    const store = new DomainStore()
    expect(store.fetch).toBeDefined()
  })
})
