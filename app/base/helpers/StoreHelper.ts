import { observable, action } from 'mobx'
import { Statuses } from '@enums'
import { AxiosError } from 'axios'
import { IBaseStore } from '../interfaces/IBaseStore'
import { IInitialState } from '../interfaces/IInitialState'
import { StatusHelper } from './StatusHelper'
import { NextMobx } from '@helpers'

interface IHelperLength {
  length?: number
}

// tslint:disable-next-line: ban-types
export abstract class StoreHelper<EntityType extends IHelperLength> extends StatusHelper implements IBaseStore {
  constructor(props?: IInitialState<EntityType>) {
    super()
    // tslint:disable-next-line:forin
    for (const prop in props) {
      // @ts-ignore
      this[prop] = NextMobx.jsonToMap(props[prop])
    }
  }

  @observable public error: AxiosError
  @observable public entities: EntityType

  public abstract fetch(): void

  @action public update(data: object = {}): void {
    // tslint:disable-next-line:forin
    for (const prop in data) {
      this[prop] = data[prop]
    }
  }

  public any(): boolean {
    if (!this.entities) {
      return false
    }

    if (this.entities.length) {
      return this.entities.length > 0
    }

    return false
  }

  @action.bound public setData(entities: EntityType) {
    this.entities = entities
    this.status = Statuses.FULFILLED
  }

  @action.bound public setError(error: AxiosError) {
    this.error = error
    this.status = Statuses.REJECTED
  }
}
