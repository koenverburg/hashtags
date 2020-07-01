import { action, computed } from 'mobx'
import { CollectorRepository } from './Collector.repository'
import { Statuses } from '@enums'
import { StoreHelper } from '@helpers'
import { IInitialState } from '../../base/interfaces/IInitialState'

const repository = new CollectorRepository()

export const localInitialState: IInitialState<string> = {
  status: Statuses.IDLE,
  entities: '',
}

export class CollectorStore extends StoreHelper<string> {

  constructor(initialState?: IInitialState<string>) {
    super(initialState)
  }

  @computed get tags() {
    if (!this.entities) return []

    const list = this.entities.trim().split(' ')
    const deduplicatedList = this.deduplicate(list)

    return deduplicatedList
  }

  // private checkForHashtagPrefix() { }

  private deduplicate(list: string[]): string[] {
    const cleanList = list
      .map(item => item.trim())
      .filter(item => item.length > 0)

    const sortedList = cleanList.reduce(
      (accumulator: string[], current: string) =>
        accumulator.includes(current) ? accumulator : [...accumulator, current],
      [],
    )

    return sortedList
  }

  public saveData(entity: string) {
    // repository.add(entity)
    this.setData(entity)
  }

  @action public async fetch () {
    this.status = Statuses.PENDING
    const response = await repository.list()

    if (response) this.setData(response.data)
  }
}
