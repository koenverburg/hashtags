import Axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { IRepository } from '../../base/interfaces/IRepository'
import { Storage } from '@helpers'

interface ICollectorRepository<T> extends IRepository<T> {
  listByCategory(v: string): T[]
}

export class CollectorRepository implements ICollectorRepository<string> {
  constructor() {
    this.storage = new Storage('collector')
    const config = {
      baseURL: process.env.COLLECTOR_API,
    }
    this.http = Axios.create(config)
  }
  private storage: Storage
  private http: AxiosInstance

  public listByCategory(name: string): any {
    // console.log(this.storage.get('tags'))
    return ['', '']
  }

  public list(): any {
    // console.log(this.storage.get('tags'))
    return ['', '']
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
    return ''
  }
}
