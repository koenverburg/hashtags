import Axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { IRepository } from '../../base/interfaces/IRepository'
import { DomainModel } from './models/Domain.model'

export class DomainRepository implements IRepository<DomainModel> {
  constructor() {
    const config = {
      baseURL: process.env.DOMAIN_API,
    }
    this.http = Axios.create(config)
  }

  private http: AxiosInstance

  public list(): any {
    return this.http
      .get('domains')
      .then((response: AxiosResponse<DomainModel>) => ({ response }))
      .catch((error: AxiosError) => ({ error }))
  }

  public add(entity: any) {
    throw new Error('Method not implemented.')
  }
  public delete(entity: any) {
    throw new Error('Method not implemented.')
  }
  public update(entity: any) {
    throw new Error('Method not implemented.')
  }
  public find(id: number) {
    return new DomainModel()
  }
}
