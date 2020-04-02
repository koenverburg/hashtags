import { observable } from 'mobx'

export class MockModel {
  @observable public id: number
  @observable public name: string
  public length: number
}
