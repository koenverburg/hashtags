import { CollectorStore } from '../Collector.store'

describe('CollectorStore', () => {
  it('fetches collectors', () => {
    const store = new CollectorStore()
    expect(store.fetch).toBeDefined()
  })
})
