import { action } from 'mobx'
import { Statuses } from '@enums'
import { IInitialState } from '../../../interfaces/IInitialState'
import { StoreHelper } from '../../StoreHelper'
import { MockRepository } from './Mock.repository'

const repository = new MockRepository()

export class MockStoreArr extends StoreHelper<string[]> {
  constructor(initialState?: IInitialState<string[]>) {
    super(initialState)
  }

  @action public async fetch () {
    this.status = Statuses.PENDING
    const { response, error } = await repository.list()

    if (response) this.setData(response.data)
    if (error) this.setError(error)
  }
}
