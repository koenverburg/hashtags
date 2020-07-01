import { CollectorRepository } from '../Collector.repository'

describe('Collector - repository', () => {
  let repository: CollectorRepository

  beforeAll(() => {
    repository = new CollectorRepository()
  })

  it('should find an entity', () => {
    expect(repository.find(1)).toEqual('')
  })

  it('should look up a list by name', () => {
    expect(repository.listByCategory('scratchpad')).toEqual(['', ''])
  })

  it('should give back the top list', () => {
    expect(repository.list()).toEqual(['', ''])
  })

  describe('follows the Repository pattern', () => {
    it("has an 'List' method", () => expect(repository.list).toBeDefined())
    it("has an 'Add' method", () => expect(repository.add).toBeDefined())
    it("has an 'Delete' method", () => expect(repository.delete).toBeDefined())
    it("has an 'Update' method", () => expect(repository.update).toBeDefined())
    it("has an 'Find' method", () => expect(repository.find).toBeDefined())
  })

  // describe("throws 'Method not implemented.'", () => {
  //   it("should throw a 'Method not implemented.'", () => {
  //     expect(repository.add(new CollectorModel())).toBeFalsy()
  //   })
  // })
})
