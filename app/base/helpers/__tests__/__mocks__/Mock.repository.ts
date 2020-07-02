import Axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { IRepository } from '../../../interfaces/IRepository'

export class MockRepository implements IRepository<string[]> {

  constructor() {
    const config = {
      baseURL: 'api.example.com',
    }

    this.http = Axios.create(config)
  }

  private http: AxiosInstance

  public list(): any {
    return this.http
      .get('mocks')
      .then((response: AxiosResponse<string[]>) => ({ response }))
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
    return ['']
  }
}
