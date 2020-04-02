import { computed, observable } from 'mobx'
import { Statuses } from '@enums'

export class StatusHelper {
  @observable public status: Statuses = Statuses.IDLE

  @computed public get IsIdle(): boolean {
    return this.status === Statuses.IDLE
  }

  @computed public get IsPending(): boolean {
    return this.status === Statuses.PENDING
  }

  @computed public get IsCanceled(): boolean {
    return this.status === Statuses.CANCELED
  }

  @computed public get IsFulfilled(): boolean {
    return this.status === Statuses.FULFILLED
  }

  @computed public get IsRejected(): boolean {
    return this.status === Statuses.REJECTED
  }
}
