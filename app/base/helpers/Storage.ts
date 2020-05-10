export class Storage {
  constructor(store: string) {
    this.store = store
  }
  private store: string

  public set(name: string, value: {} | [] | string) {
    const stringifiedData = JSON.stringify(value)
    localStorage.setItem(`${this.store}-${name}`, stringifiedData)
  }

  public get(name: string) {
    const stringifiedData = localStorage.getItem(`${this.store}-${name}`)

    if (stringifiedData) {
      return JSON.parse(stringifiedData)
    }

    return {}
  }
}
