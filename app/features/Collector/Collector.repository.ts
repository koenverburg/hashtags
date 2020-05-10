import Axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { IRepository } from '../../base/interfaces/IRepository'
import { CollectorModel } from './models/Collector.model'
import { Storage } from '@helpers'

export class CollectorRepository implements IRepository<CollectorModel> {
  constructor() {
    this.storage = new Storage('collector')
    const config = {
      baseURL: process.env.COLLECTOR_API,
    }
    this.http = Axios.create(config)
  }
  private storage: Storage
  private http: AxiosInstance

  public list(): any {
    console.log(this.storage.get('tags'))

    return { data: this.storage.get('tags') }
  }

  public add(entity: {} | [] | string) {
    this.storage.set('tags', entity)
  }
  public delete(entity: any) {
    throw new Error('Method not implemented.')
  }
  public update(entity: any) {
    throw new Error('Method not implemented.')
  }
  public find(id: number) {
    return new CollectorModel()
  }
}
