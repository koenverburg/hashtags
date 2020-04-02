import { action } from 'mobx'
import { Statuses } from '@enums'
import { IInitialState } from '../../../interfaces/IInitialState'
import { StoreHelper } from '../../StoreHelper'
import * as NextMobx from '../../NextMobxUtils'
import { MockModel } from './Mock.model'
import { MockRepository } from './Mock.repository'

const repository = new MockRepository()

export class MockStoreObj extends StoreHelper<MockModel> {
  constructor(initialState?: IInitialState<MockModel>) {
    super(initialState)
  }

  @action public async fetch () {
    this.status = Statuses.PENDING
    const { response, error } = await repository.list()

    if (response) this.setData(response.data)
    if (error) this.setError(error)
  }
}

export const getDomainStore = NextMobx.getOrCreateStore('mock', MockStoreObj)
