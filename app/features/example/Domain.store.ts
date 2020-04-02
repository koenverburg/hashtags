import { action } from 'mobx'
import { DomainRepository } from './Domain.repository'
import { DomainModel } from './models/Domain.model'
import { Statuses } from '@enums'
import { StoreHelper, NextMobx  } from '@helpers'
import { IInitialState } from '../../base/interfaces/IInitialState'

const repository = new DomainRepository()

export class DomainStore extends StoreHelper<DomainModel[]> {
  constructor(initialState?: IInitialState<DomainModel[]>) {
    super(initialState)
  }

  @action public async fetch () {
    this.status = Statuses.PENDING
    const { response, error } = await repository.list()

    if (response) this.setData(response.data)
    if (error) this.setError(error)
  }
}

export const getDomainStore = NextMobx.getOrCreateStore('domain', DomainStore)
