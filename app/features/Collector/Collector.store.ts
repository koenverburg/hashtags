import { action } from 'mobx'
import { CollectorRepository } from './Collector.repository'
import { CollectorModel } from './models/Collector.model'
import { Statuses } from '@enums'
import { StoreHelper, NextMobx  } from '@helpers'
import { IInitialState } from '../../base/interfaces/IInitialState'

const repository = new CollectorRepository()

export class CollectorStore extends StoreHelper<CollectorModel[]> {
  constructor(initialState?: IInitialState<CollectorModel[]>) {
    super(initialState)
  }

  public deduplicate(list: string[]): CollectorModel[] {
    const cleanList = list
      .map(item => item.trim())
      .filter(item => item.length > 0)

    const sortedList = cleanList.reduce(
      (accumulator: string[], current: string) =>
        accumulator.includes(current) ? accumulator : [...accumulator, current],
      [],
    )

    const collectorsList = sortedList.map(item => ({ tag: item }))

    return collectorsList
  }

  public saveData(entity: CollectorModel[]) {
    repository.add(entity)
    this.setData(entity)
  }

  @action public async fetch () {
    this.status = Statuses.PENDING
    const response = await repository.list()

    if (response) this.setData(response.data)
  }
}

export const getCollectorStore = NextMobx.getOrCreateStore('collector', CollectorStore)
