import Axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { IRepository } from '../../../interfaces/IRepository'
import { MockModel } from '../__mocks__/Mock.model'

export class MockRepository implements IRepository<MockModel> {

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
      .then((response: AxiosResponse<MockModel>) => ({ response }))
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
    return new MockModel()
  }
}
