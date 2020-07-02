import { action } from 'mobx'
import { Statuses } from '@enums'
import { IInitialState } from '../../../interfaces/IInitialState'
import { StoreHelper } from '../../StoreHelper'
import { MockRepository } from './Mock.repository'

const repository = new MockRepository()

type MockObj = {
  name: string,
}

export class MockStoreObj extends StoreHelper<MockObj> {
  constructor(initialState?: IInitialState<MockObj>) {
    super(initialState)
  }

  @action public async fetch () {
    this.status = Statuses.PENDING
    const { response, error } = await repository.list()

    if (response) this.setData(response.data)
    if (error) this.setError(error)
  }
}
