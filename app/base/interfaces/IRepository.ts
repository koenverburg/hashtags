export interface IRepository<T> {
  list(): T[]
  add(entity: T): void
  delete(entity: T): void
  update(entity: T): void
  find(id: number): T
}

// export interface IRepository<T> {
//     List(): T[]
//     Add(entity: T)
//     Delete(entity: T)
//     Update(entity: T)
//     Find(id: number)
// }
