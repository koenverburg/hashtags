import { observable, action } from 'mobx'
import { Statuses } from '@enums'
import { AxiosError } from 'axios'
import { IBaseStore } from '../interfaces/IBaseStore'
import { IInitialState } from '../interfaces/IInitialState'
import { StatusHelper } from './StatusHelper'
import { NextMobx } from '@helpers'

// tslint:disable-next-line: ban-types
export abstract class StoreHelper<EntityType> extends StatusHelper implements IBaseStore {
  constructor(props?: IInitialState<EntityType>) {
    super()
  }

  @observable public error: AxiosError
  @observable public entities: EntityType

  public abstract fetch(): void

  // public any(): boolean {
  // //   if (!this.entities) {
  // //     return false
  // //   }

  // //   if (this.entities.length) {
  // //     return this.entities.length > 0
  // //   }

  //   return false
  // }

  @action.bound public setData(entities: EntityType) {
    this.entities = entities
    this.status = Statuses.FULFILLED
  }

  @action.bound public setError(error: AxiosError) {
    this.error = error
    this.status = Statuses.REJECTED
  }
}
