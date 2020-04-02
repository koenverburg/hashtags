import { observable } from 'mobx'

export class DomainModel {
  @observable public id: number
  @observable public host: string
  @observable public www: string
  @observable public displayName: string
}
